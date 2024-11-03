import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

import { db } from '../../config/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function NovaTriagem() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [paciente, setPaciente] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pacientes'));
        const patientsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(patientsData);
        setFilteredData(patientsData);
      } catch (error) {
        console.error("Erro ao buscar dados dos pacientes:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (text) => {
    setPaciente(text);
    if (text) {
      const filtered = data.filter(item => 
        (item.nomeSocial && item.nomeSocial.toLowerCase().includes(text.toLowerCase())) ||
        item.nome.toLowerCase().includes(text.toLowerCase()) ||
        item.cpf.includes(text) ||
        item.cartaoSus.includes(text)
      );
      setFilteredData(filtered);
      setShowOptions(true);
    } else {
      setFilteredData(data);
      setShowOptions(false);
    }
  };

  const handleOptionSelect = (item) => {
    setPaciente(item.nomeSocial || item.nome);
    setSelectedPaciente(item);
    setShowOptions(false);
  };

  const handleAvancar = () => {
    if (!selectedPaciente) {
      Alert.alert('Seleção de Paciente', 'Por favor, selecione um paciente.');
      return;
    }

    navigation.navigate('TextTriagem', { paciente: selectedPaciente });
  };

  return (
    <View style={styles.container}>
      <Header height={100} /> 
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Nome, Nome Social, CPF ou cadastro SUS"
          value={paciente}
          onChangeText={handleInputChange}
          onFocus={() => setShowOptions(true)}
        />
        {showOptions && (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOptionSelect(item)}
              >
                <Text>{item.nomeSocial || item.nome}</Text>
              </TouchableOpacity>
            )}
            style={styles.optionsContainer}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleAvancar}>
          <Text style={styles.buttonText}>Avançar</Text>
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
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',    
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#066699',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,    
  },
});
