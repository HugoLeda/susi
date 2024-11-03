import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { db } from '../../config/firebase'; 
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function NovaConsulta() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [paciente, setPaciente] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [triagemDates, setTriagemDates] = useState([]);
  const [selectedTriagemDate, setSelectedTriagemDate] = useState('');
  const [showDateOptions, setShowDateOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const triagensSnapshot = await getDocs(collection(db, 'triagens'));
        const triagensPacientesIds = triagensSnapshot.docs.map(doc => doc.data().pacienteId);

        const pacientesQuery = query(
          collection(db, 'pacientes'),
          where('__name__', 'in', triagensPacientesIds)
        );
        const querySnapshot = await getDocs(pacientesQuery);

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
        item.cpf.includes(text)
      );
      setFilteredData(filtered);
      setShowOptions(true);
    } else {
      setFilteredData(data);
      setShowOptions(false);
    }
  };

  const handleOptionSelect = async (item) => {
    setPaciente(item.nomeSocial || item.nome);
    setSelectedPaciente(item);
    setShowOptions(false);

    try {
      const triagensQuery = query(
        collection(db, 'triagens'),
        where('pacienteId', '==', item.id)
      );
      const triagensSnapshot = await getDocs(triagensQuery);
      const dates = triagensSnapshot.docs.map(doc => ({
        id: doc.id,
        date: doc.data().data
      }));      
      const sortedDates = dates.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTriagemDates(sortedDates);
    } catch (error) {
      console.error("Erro ao buscar as datas de triagens:", error);
    }
  };

  const handleDateSelect = (item) => {
    setSelectedTriagemDate(item.date);
    setShowDateOptions(false);
  };

  const handleAvancar = () => {
    if (!selectedPaciente || !selectedTriagemDate) {
      Alert.alert('Seleção de Paciente e Data', 'Por favor, selecione um paciente e uma data de triagem.');
      return;
    }
    
    navigation.navigate('FinalizarConsulta', { paciente: selectedPaciente, dataTriagem: selectedTriagemDate });
  };

  return (
    <View style={styles.container}>
      <Header height={100} /> 
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Nome, Nome Social ou CPF"
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
        {selectedPaciente && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Selecione uma data de triagem"
              value={selectedTriagemDate}
              onFocus={() => setShowDateOptions(true)}
            />
            {showDateOptions && (
              <FlatList
                data={triagemDates}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleDateSelect(item)}
                  >
                    <Text>{item.date}</Text>
                  </TouchableOpacity>
                )}
                style={styles.optionsContainer}
              />
            )}
          </>
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
