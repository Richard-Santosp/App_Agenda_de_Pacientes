import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Início">
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Cadastrar Paciente" component={AddPatientScreen} />
      <Stack.Screen name="Agendar Sessão" component={ScheduleScreen} />
    </Stack.Navigator>
  );
}
