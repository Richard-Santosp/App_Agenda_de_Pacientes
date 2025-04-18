import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { PatientProvider } from './context/PatientContext';
import { SessionProvider } from './context/SessionContext'; // IMPORTANTE

export default function App() {
  return (
    <PatientProvider>
      <SessionProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SessionProvider>
    </PatientProvider>
  );
}
