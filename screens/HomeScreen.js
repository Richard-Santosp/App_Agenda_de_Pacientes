import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo</Text>

      {/* Botão Cadastrar Paciente */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#003366' }]} // Azul Marinho
        onPress={() => navigation.navigate('Cadastrar Paciente', { patients, setPatients })}
      >
        <Text style={styles.buttonText}>Cadastrar Paciente</Text>
      </TouchableOpacity>

      {/* Botão Agendar Sessão */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4B6F44' }]} // Verde Musgo
        onPress={() => navigation.navigate('Agendar Sessão', { patients })}
      >
        <Text style={styles.buttonText}>Agendar Sessão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1C6B1', // Bege Claro
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366', // Azul Marinho
    marginBottom: 40,
    fontFamily: 'Arial', // Fonte bonita e simples
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30, // Bordas arredondadas
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto branco
    fontSize: 18,
    fontWeight: 'bold',
  },
});
