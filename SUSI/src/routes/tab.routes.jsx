import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Paciente from '../screens/Paciente';
import Consulta from '../screens/Consulta';
import Triagem from '../screens/Triagem';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000', 
        tabBarInactiveTintColor: '#fff', 
        tabBarStyle: {
          backgroundColor: '#99b9ff',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen 
        name="Paciente"
        component={Paciente}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user-plus" color={color} size={size} />,
          tabBarLabel: 'Paciente',
        }}
      />
    
      <Tab.Screen 
        name="Consulta"
        component={Consulta}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="clipboard" color={color} size={size} />,
          tabBarLabel: 'Consulta',
        }}
      />
    
      <Tab.Screen 
        name="Triagem"
        component={Triagem}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="folder" color={color} size={size} />,
          tabBarLabel: 'Triagem',
        }}
      />
    </Tab.Navigator>
  );
}
