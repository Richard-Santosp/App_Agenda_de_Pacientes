import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { usePatients } from '../context/PatientContext'; // Usando o hook do contexto

export default function AddPatientScreen() {
  const { patients, setPatients } = usePatients();  // Acessando pacientes do contexto
  const [name, setName] = useState('');

  const handleAddPatient = () => {
    if (name.trim() !== '') {
      setPatients([...patients, name.trim()]);
      setName('');
    }
  };

  const handleRemovePatient = (nameToRemove) => {
    Alert.alert(
      "Remover paciente",
      `Deseja realmente remover ${nameToRemove}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setPatients(patients.filter((p) => p !== nameToRemove));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Paciente</Text>
      
      {/* Campo de entrada para o nome do paciente */}
      <TextInput
        style={styles.input}
        placeholder="Nome do paciente"
        value={name}
        onChangeText={setName}
      />

      {/* Botão de Cadastro com bordas arredondadas */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#003366' }]} // Azul Marinho
        onPress={handleAddPatient}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Pacientes cadastrados:</Text>

      {/* Lista de pacientes com opção de remoção */}
      <FlatList
        data={patients}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientName}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemovePatient(item)}>
              <Text style={styles.removeBtn}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C6B1', // Bege Claro
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366', // Azul Marinho
    marginBottom: 40,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF', // Branco
    borderColor: '#4F4F4F', // Cinza Escuro
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Branco
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#4B6F44', // Verde Musgo
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0', // Cinza Claro
  },
  patientName: {
    color: '#4F4F4F', // Cinza Escuro
    fontSize: 16,
  },
  removeBtn: {
    color: '#8B0000', // Vermelho Escuro
    fontWeight: 'bold',
  }
});
