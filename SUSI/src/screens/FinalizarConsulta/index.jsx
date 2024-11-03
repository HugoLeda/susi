import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

import { styles } from './styles';

export default function FinalizarConsulta({ route }) {
  const { paciente } = route.params;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [pressaoArterial, setPressaoArterial] = useState('');
  const [temperaturaCorporal, setTemperaturaCorporal] = useState('');
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState('');  
  const [saturacaoOxigenio, setSaturacaoOxigenio] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [relatoPaciente, setRelatoPaciente] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [duracao, setDuracao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [informacoes, setInformacoes] = useState('');
  const [imc, setImc] = useState('');  
  const [cid, setCid] = useState('');
  const [receita, setRecita] = useState('');
  const [observacoes, setObservacoes] = useState('');

  return (
    <ScrollView style={styles.container}>            
      <ScrollView style={styles.groupView}>
        <Text style={styles.groupTitle}>Informações pessoais</Text>

        <View style={styles.view100}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={sintomas}
            onChangeText={setSintomas}
          />
        </View>

        <View style={styles.view100}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
          />
        </View>
      </ScrollView>
      <ScrollView style={styles.groupView}>
      <Text style={styles.groupTitle}>Informações médicas</Text>
        {/*
        <Text style={styles.label}>Relato do Paciente</Text>
        <TextInput
          style={styles.input}
          value={relatoPaciente}          
          multiline={true}
          numberOfLines={4}
        />
        */}

        
        <View style={styles.view100}>
          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            style={styles.input}
            value={sintomas}
            onChangeText={setSintomas}
          />
        </View>

        <View style={styles.view100}>
          <Text style={styles.label}>Duração dos sintomas</Text>
          <TextInput
            style={styles.input}
            value={duracao}
            onChangeText={setDuracao}
          />
        </View>        
        
        <View style={styles.view100}>
          <Text style={styles.label}>Localização da dor</Text>
          <TextInput
            style={styles.input}
            value={localizacao}
            onChangeText={setLocalizacao}
          />
        </View>

        <View style={styles.view100}>
          <Text style={styles.label}>Informações adicionais</Text>
          <TextInput
            style={styles.input}
            value={informacoes}
            onChangeText={setInformacoes}
          />
        </View>        

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
        
      </ScrollView>

      <ScrollView style={styles.groupView}>
        <Text style={styles.groupTitle}>Dados da consulta</Text>
        <View style={styles.view100}>
          <Text style={styles.label}>CID</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
          />
        </View>

        <Text style={styles.label}>Medicamentos prescritos</Text>
        <TextInput
          style={styles.input}
          value={receita}          
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={styles.input}
          value={observacoes}          
          multiline={true}
          numberOfLines={4}
        />
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Relato Completo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Finalizar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}