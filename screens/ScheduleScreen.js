import React, { useState } from 'react';
import {
  View, Text, Button, FlatList,
  TextInput, StyleSheet, Modal, TouchableOpacity, Alert
} from 'react-native';
import { usePatients } from '../context/PatientContext';
import { useSessions } from '../context/SessionContext'; // AQUI!

export default function ScheduleScreen() {
  const { patients } = usePatients();
  const { sessions, setSessions } = useSessions(); // USANDO CONTEXTO

  const [selectedPatient, setSelectedPatient] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSelectPatient = (name) => {
    setSelectedPatient(name);
    setShowModal(false);
  };

  const handleScheduleSession = () => {
    if (!selectedPatient || !date || !time) {
      return alert("Por favor, preencha todos os campos.");
    }

    const newSession = { patient: selectedPatient, date, time };
    setSessions([...sessions, newSession]);

    setSelectedPatient('');
    setDate('');
    setTime('');
  };

  const handleRemoveSession = (index) => {
    Alert.alert(
      "Remover Sessão",
      "Deseja realmente remover esta sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            const updated = sessions.filter((_, i) => i !== index);
            setSessions(updated);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Sessão</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowModal(true)}
      >
        <Text>{selectedPatient || 'Selecione um paciente'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário (HH:MM)"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Agendar" onPress={handleScheduleSession} color="#4B6F44" /> {/* Verde Musgo */}

      {/* Modal */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.subtitle}>Escolha um paciente:</Text>
          <FlatList
            data={patients}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.patientItem}
                onPress={() => handleSelectPatient(item)}
              >
                <Text style={styles.patientName}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Cancelar" onPress={() => setShowModal(false)} color="#B0B0B0" /> {/* Cinza Claro */}
        </View>
      </Modal>

      {/* Sessões agendadas */}
      <View style={styles.sessionsContainer}>
        <Text style={styles.subtitle}>Sessões Agendadas:</Text>
        <FlatList
          data={sessions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.sessionItem}>
              <Text>{`Paciente: ${item.patient}`}</Text>
              <Text>{`Data: ${item.date}`}</Text>
              <Text>{`Horário: ${item.time}`}</Text>
              <Button
                title="Remover"
                onPress={() => handleRemoveSession(index)}
                color="#8B0000" // Vermelho Escuro
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#D1C6B1' }, // Bege Claro
  title: { fontSize: 22, marginBottom: 10, color: '#003366' }, // Azul Marinho
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#4F4F4F', // Cinza Escuro
    color: '#003366', // Azul Marinho
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#FFFFFF', // Branco
  },
  subtitle: { fontSize: 18, marginBottom: 10, color: '#003366' }, // Azul Marinho
  patientItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0', // Cinza Claro
  },
  patientName: { fontSize: 16, color: '#003366' }, // Azul Marinho
  sessionsContainer: {
    marginTop: 20,
  },
  sessionItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0', // Cinza Claro
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // Branco
  },
});
