import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { db } from '../../config/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function GridTriagem({ TitleOne, TitleTwo, searchTerm, onRowPress }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const triagensSnapshot = await getDocs(collection(db, 'triagens'));
        const triagensData = triagensSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const pacientesSnapshot = await getDocs(collection(db, 'pacientes'));
        const pacientesData = pacientesSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        const combinedData = triagensData.map(triagem => {
          const paciente = pacientesData[triagem.pacienteId] || {};
          const nome = paciente.nome || 'Nome não disponível';
          const nomeSocial = paciente.nomeSocial || '';
          const cpf = paciente.cpf || 'CPF não disponível';

          return {
            ...triagem,
            nomeExibicao: nomeSocial || nome,
            cpf,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Erro ao buscar dados das triagens e pacientes:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    (item.nomeExibicao || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || 
    (item.cpf || '').includes(searchTerm) ||
    (item.data || '').includes(searchTerm)
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
          <Text style={styles.textColumnOne}>{item.nomeExibicao}</Text>
          <Text style={styles.textColumnTwo}>{item.data}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
