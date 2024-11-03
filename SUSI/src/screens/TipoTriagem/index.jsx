import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons';

export default function TipoTriagem({ paciente }) {
  const navigation = useNavigation();  

  return (
    <View style={styles.container}>
      <Header height={100} />
      <View style={styles.content}>
        <TouchableOpacity style={styles.button}>
          <Feather name="mic" size={40} color="#066699" />
          <Text style={styles.buttonText}>Capturar Áudio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TextTriagem', { paciente })}
        >
          <FontAwesome name="keyboard-o" size={40} color="#066699" />
          <Text style={styles.buttonText}>Inserir Digitalmente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#066699',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  buttonText: {
    color: '#066699',
    fontSize: 16,
    marginBottom: 10,
  },
});
