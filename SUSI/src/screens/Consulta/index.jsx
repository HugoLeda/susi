import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import GridConsulta from '../../components/GridConsulta';

export default function Consulta() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View>
      <Header/>
      <SearchInput 
        placeholder={'Buscar por consultas'} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        registerScreen={'NovaConsulta'}
      />     
      <GridConsulta
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