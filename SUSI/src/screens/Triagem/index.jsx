import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import GridTriagem from '../../components/GridTriagem';

export default function Paciente() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View>
      <Header/>
      <SearchInput 
        placeholder={'Consultar triagem'} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        registerScreen={'NovaTriagem'}
      />     
      <GridTriagem 
        TitleOne={'Nome'} 
        TitleTwo={'Data'} 
        searchTerm={searchTerm}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
