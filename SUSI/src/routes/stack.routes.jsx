import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabRoutes from './tab.routes'

import CadastroPaciente from '../screens/CadastroPaciente';
import NovaTriagem from '../screens/NovaTriagem';
import TipoTriagem from '../screens/TipoTriagem';
import TextTriagem from '../screens/TextTriagem';
import NovaConsulta from '../screens/NovaConsulta';
import FinalizarConsulta from '../screens/FinalizarConsulta';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabRoutes} options={{ headerShown: false }} />   
      <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} options={{ headerShown: true, title: 'Cadastro de Paciente' }} />
      <Stack.Screen name="NovaTriagem" component={NovaTriagem} options={{ headerShown: true, title: 'Triagem - Selecionar Paciente' }} />   
      <Stack.Screen name="TipoTriagem" component={TipoTriagem} options={{ headerShown: true, title: 'Triagem - Selecionar Tipo' }} /> 
      <Stack.Screen name="TextTriagem" component={TextTriagem} options={{ headerShown: true, title: 'Triagem - preencher sintomas' }}/>   
      <Stack.Screen name="NovaConsulta" component={NovaConsulta} options={{ headerShown: true, title: 'Consulta - Selecionar Paciente' }} /> 
      <Stack.Screen name="FinalizarConsulta" component={FinalizarConsulta} options={{ headerShown: true, title: 'Consulta' }} /> 
    </Stack.Navigator>
  );
}