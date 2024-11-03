import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';

import { styles } from './styles';

export default function TextTriagem({ route }) {
  const { paciente } = route.params;

  const [pressaoArterial, setPressaoArterial] = useState('');
  const [temperaturaCorporal, setTemperaturaCorporal] = useState('');
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState('');  
  const [saturacaoOxigenio, setSaturacaoOxigenio] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [relatoPaciente, setRelatoPaciente] = useState('');
  const [imc, setImc] = useState('');

  useEffect(() => {
    if (peso && altura) {
      const alturaEmMetros = altura / 100;
      const calculatedImc = (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2);
      setImc(calculatedImc);
    }
  }, [peso, altura]);

  const handleRelatoChange = (text) => {
    setRelatoPaciente(text);
  };

  const summarizePreConsultation = async (relatoPaciente) => {
    try {      
      const response = await axios.post('http://192.168.0.109:5000/summarize', { patient_text: relatoPaciente });
      return response.data;
    } catch (error) {
      console.error("Erro ao chamar o backend Flask:", error);
      throw new Error('Erro ao se comunicar com o backend.');
    }
  };

  const handleGravar = async () => {
    if (relatoPaciente.trim() === '') {
      Alert.alert('Erro', 'O campo Relato do Paciente não pode estar vazio.');
      return;
    }
  
    try {
      const resumo = await summarizePreConsultation(relatoPaciente);
        
      const now = new Date();
      const data = now.toLocaleDateString('pt-BR'); 
      const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 
  
      const triagemData = {
        pacienteId: paciente.id, 
        pressaoArterial,
        temperaturaCorporal: temperaturaCorporal ? `${temperaturaCorporal} °C` : '',
        frequenciaCardiaca: frequenciaCardiaca ? `${frequenciaCardiaca} bpm` : '',
        saturacaoOxigenio: saturacaoOxigenio ? `${saturacaoOxigenio} %` : '',
        peso: peso ? `${peso} kg` : '',
        altura: altura ? `${altura} cm` : '',
        imc,
        relatoPaciente,
        resumo,
        data,
        hora,
        dataHora: now.toISOString(), 
      };
  
      await addDoc(collection(db, 'triagens'), triagemData);
  
      Alert.alert('Sucesso', 'Dados da triagem salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a triagem:', error);
      Alert.alert('Erro', `Ocorreu um erro ao salvar a triagem: ${error.message}`);
    }
  };
  
  

  return (
    <View style={styles.container}>      
      <TouchableOpacity style={styles.button} onPress={handleGravar}>
        <Text style={styles.buttonText}>Enviar Dados para Consulta</Text>
      </TouchableOpacity>
      <ScrollView style={styles.groupView}>
        <Text style={styles.label}>Relato do Paciente</Text>
        <TextInput
          style={styles.input}
          value={relatoPaciente}
          onChangeText={handleRelatoChange}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.sectionView}>
          <View style={styles.view50}>
            <Text style={styles.label}>Pressão Arterial</Text>
            <TextInput
              style={styles.input}
              value={pressaoArterial}
              onChangeText={setPressaoArterial}
            />
          </View>

          <View style={styles.view50}>
            <Text style={styles.label}>Temperatura Corporal</Text>
            <TextInput
              style={styles.input}
              value={temperaturaCorporal}
              onChangeText={setTemperaturaCorporal}
              keyboardType="numeric"
            />
          </View>
        </View>                

        <View style={styles.sectionView}>
          <View style={styles.view50}>
            <Text style={styles.label}>Frequência Cardíaca</Text>
            <TextInput
              style={styles.input}
              value={frequenciaCardiaca}
              onChangeText={setFrequenciaCardiaca}
            />  
          </View>

          <View style={styles.view50}>
            <Text style={styles.label}>Saturação de Oxigênio</Text>
            <TextInput
              style={styles.input}
              value={saturacaoOxigenio}
              onChangeText={setSaturacaoOxigenio}
              keyboardType="numeric"
            />
          </View>
        </View>                    

        <View style={styles.sectionView}>
          <View style={styles.view50}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.view50}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
              keyboardType="numeric"
            />
          </View>
        </View>
               
        <Text style={styles.label}>IMC</Text>
        <TextInput
          style={styles.input}
          value={imc}
          editable={false}
        />
        
      </ScrollView>
    </View>
  );
}