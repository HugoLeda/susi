import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { db } from '../../config/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function Grid({ TitleOne, TitleTwo, searchTerm, onRowPress }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pacientes'));
        const patientsData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setData(patientsData);
      } catch (error) {
        console.error("Erro ao buscar dados dos pacientes:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.cpf.includes(searchTerm) ||
    item.cartaoSus.includes(searchTerm)
  );

  return (
    <ScrollView style={styles.grid}>
      <View style={styles.header}>
        <Text style={styles.textHeaderOne}>{TitleOne}</Text>
        <Text style={styles.textHeaderTwo}>{TitleTwo}</Text>
      </View>
      {filteredData.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.row} 
          onPress={() => onRowPress(item)}
        >
          <Text style={styles.textColumnOne}>{item.nome}</Text>
          <Text style={styles.textColumnTwo}>{item.cartaoSus}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}