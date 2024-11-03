import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios'; 
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

import { db } from '../../config/firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 

import { v4 as uuidv4 } from 'uuid';

export default function CadastroPaciente() {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');  
  const [telefone, setTelefone] = useState('');  
  const [cpf, setCPF] = useState('');
  const [cartaoSus, setCartaoSus] = useState('');
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [alergia, setAlergia] = useState('');
  const [alergiasList, setAlergiasList] = useState([]);
  const [medicamento, setMedicamento] = useState('');
  const [medicamentosList, setMedicamentosList] = useState([]);
    
  const [validacaoAtivada, setValidacaoAtivada] = useState(false);

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  };
  
  const formatCPF = (text) => {
    return text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };
  
  const handleCPFChange = (text) => {
    const formattedCPF = formatCPF(text);
    setCPF(formattedCPF); 
    setIsCpfValid(validarCPF(text));
  };

  const handleDataNascimentoChange = (text) => {    
    let formattedData = text.replace(/\D/g, '');
      
    if (formattedData.length >= 2) {
      formattedData = formattedData.substring(0, 2) + '/' + formattedData.substring(2);
    }
    if (formattedData.length >= 5) {
      formattedData = formattedData.substring(0, 5) + '/' + formattedData.substring(5, 9);
    }
      
    formattedData = formattedData.substring(0, 10);
      
    if (formattedData.length === 10) {
      const [dia, mes, ano] = formattedData.split('/').map(Number);
            
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();
      const mesAtual = dataAtual.getMonth() + 1; 
        
      if (ano < 1900 || ano > anoAtual) {
        Alert.alert('Erro', 'Ano inválido.');
      } else if (mes < 1 || mes > 12) {
        Alert.alert('Erro', 'Mês inválido.');
      } else if (dia < 1 || dia > new Date(ano, mes, 0).getDate()) {
        Alert.alert('Erro', 'Dia inválido.');
      } else if (ano === anoAtual && mes > mesAtual) {
        Alert.alert('Erro', 'A data não pode estar no futuro.');
      } else {        
        setDataNascimento(formattedData);
      }
    } else {      
      setDataNascimento(formattedData);
    }
  };
  
  const handleTelefoneChange = (text) => {
    const formattedTelefone = text
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
    setTelefone(formattedTelefone);
  };

  const handleCepChange = (text) => {
    const formattedCep = text
      .replace(/\D/g, '')   
      .replace(/(\d{5})(\d{1,3})/, '$1-$2') 
      .slice(0, 9);                     
    setCep(formattedCep);
  };

  const handleBuscarCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      
      setLogradouro(logradouro);
      setBairro(bairro);
      setCidade(localidade);
      setEstado(uf);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço. Verifique o CEP e tente novamente.');
    }
  };

  const handleAddAlergia = () => {
    if (alergia.trim()) {
      setAlergiasList([...alergiasList, alergia]);  
      setAlergia('');  
    }
  };
    
  const handleAddMedicamento = () => {
    if (medicamento.trim()) {
      setMedicamentosList([...medicamentosList, medicamento]);  
      setMedicamento('');  
    }
  };

  const handleRemoveAlergia = (index) => {
    const updatedList = alergiasList.filter((_, i) => i !== index);
    setAlergiasList(updatedList);
  };
  
  const handleRemoveMedicamento = (index) => {
    const updatedList = medicamentosList.filter((_, i) => i !== index);
    setMedicamentosList(updatedList);
  };
  
  const handleGravar = async () => {
    setValidacaoAtivada(true);

    const camposObrigatorios = [
      { value: nome, setState: setNome },
      { value: cpf, setState: setCPF },
      { value: dataNascimento, setState: setDataNascimento },
      { value: sexo, setState: setSexo },      
      { value: cartaoSus, setState: setCartaoSus },
      
      { value: cep, setState: setCep },
      { value: logradouro, setState: setLogradouro },      
      { value: bairro, setState: setBairro },      
      { value: cidade, setState: setCidade },
      { value: estado, setState: setEstado },
    ];

    const camposInvalidos = camposObrigatorios.filter(campo => !campo.value);

    if (camposInvalidos.length > 0) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!isCpfValid) {
      Alert.alert('Erro', 'O CPF inserido é inválido.');
      return;
    }

    const dadosPaciente = {      
      nome: nome,
      nomeSocial: nomeSocial,
      sexo: sexo,
      cpf: cpf,
      telefone: telefone,
      cartaoSus: cartaoSus,
      endereco: {
        cep: cep.replace(/\D/g, ''),  
        logradouro: logradouro,
        numero: parseInt(numero),
        bairro: bairro,
        cidade: cidade,
        estado: estado
      },
      dadosMedicos: {
        alergias: alergiasList,  
        medicamentosContinuos: medicamentosList
      }
    };

    try {      
      await addDoc(collection(db, 'pacientes'), dadosPaciente);
      Alert.alert('Sucesso', 'Paciente gravado com sucesso!');
            
      setNome('');
      setNomeSocial('');
      setSexo('');
      setCPF('');
      setTelefone('');
      setCartaoSus('');
      setCep('');
      setLogradouro('');
      setNumero('');
      setBairro('');
      setCidade('');
      setEstado('');
      setAlergiasList([]);
      setMedicamentosList([]);
    } catch (error) {
      console.error('Erro ao gravar paciente: ', error);
      Alert.alert('Erro', 'Não foi possível gravar o paciente.');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>   
        <View style={styles.groupView}>
          <Text style={styles.groupTitle}>Informações pessoais</Text>

          <View style={styles.view100}>
            <Text style={styles.label}>Nome Completo</Text>     
            <TextInput
              style={[styles.input, validacaoAtivada && !nome && { borderColor: 'red', borderWidth: 1 }]}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.view100}>
            <Text style={styles.label}>Nome Social</Text>
            <TextInput style={styles.input} value={nomeSocial} onChangeText={setNomeSocial} />
          </View>        

          <View style={styles.sectionView}>
            <View style={styles.view50}>
              <Text style={[styles.label, !isCpfValid && cpf && !isFocused && { color: 'red' }]}>
                {isCpfValid || isFocused || !cpf ? 'CPF' : 'CPF inválido'}
              </Text>

              <TextInput
                style={[styles.input, validacaoAtivada && !cpf && { borderColor: 'red', borderWidth: 1 }]}
                value={cpf}
                onChangeText={handleCPFChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setCPF(formatCPF(cpf)); 
                }}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={[styles.input, validacaoAtivada && !dataNascimento && { borderColor: 'red', borderWidth: 1 }]}
                value={dataNascimento}
                onChangeText={handleDataNascimentoChange}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.view50}>
              <Text 
                style={[styles.label, validacaoAtivada && !nome && { color: 'red'}]}
              >
                Sexo
              </Text>
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setSexo} value={sexo}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="masculino" color="#99b9ff"/>
                    <Text style={styles.radioLabel}>Masculino</Text>
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="feminino" color="#99b9ff"/>
                    <Text style={styles.radioLabel}>Feminino</Text>
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="outro" color="#99b9ff"/>
                    <Text style={styles.radioLabel}>Outro</Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>

          <View style={styles.sectionView}>
            <View style={styles.view50}>
              <Text style={styles.label}>Cartão SUS</Text>
              <TextInput 
                style={[styles.input, validacaoAtivada && !nome && { borderColor: 'red', borderWidth: 1 }]} 
                value={cartaoSus} 
                onChangeText={setCartaoSus} 
                keyboardType="numeric"/>
            </View>

            <View style={styles.view50}>
              <Text style={styles.label}>Número de Contato</Text>
              <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={handleTelefoneChange}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.groupView}>
          <Text style={styles.groupTitle}>Endereço</Text>
          
          <View style={styles.sectionView}>            
            <View style={styles.view70}>
              <Text style={styles.label}>CEP</Text>     
              <TextInput 
                style={styles.input} 
                value={cep} 
                onChangeText={handleCepChange} 
                keyboardType="numeric"
              />
            </View> 

            <View style={[styles.view25, { backgroundColor: '#99b9ff', height: 50, marginTop: 5, borderRadius: 50 }]}>
                <TouchableOpacity 
                  style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}
                  onPress={handleBuscarCep}
                >
                  <Text>
                    <Feather name="search" size={24} color='#fff'/>
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
          

          <View style={styles.sectionView}>
            <View style={styles.view70}>
              <Text style={styles.label}>Logradouro</Text>     
              <TextInput style={styles.input} value={logradouro} onChangeText={setLogradouro} />
            </View>

            <View style={styles.view25}>
              <Text style={styles.label}>Número</Text>     
              <TextInput style={styles.input} value={numero} onChangeText={setNumero} keyboardType="numeric"/>
            </View>
          </View>
          
          <View style={styles.view100}>
            <Text style={styles.label}>Bairro</Text>     
            <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
          </View>             

          <View style={styles.sectionView}>
            <View style={styles.view70}>
              <Text style={styles.label}>Cidade</Text>     
              <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
            </View>

            <View style={styles.view25}>
              <Text style={styles.label}>UF</Text>     
              <TextInput style={styles.input} value={estado} onChangeText={setEstado} />
            </View>
          </View>
        </View>


        <View style={styles.groupView}>
          <Text style={styles.groupTitle}>Informações Médicas</Text>    

          <View style={styles.sectionView}>
            <View style={styles.view80}>
              <Text style={styles.label}>Alergias</Text>     
              <TextInput style={styles.input} value={alergia} onChangeText={setAlergia} />
            </View>

            <View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddAlergia}>
                <Text style={styles.buttonContent}>+</Text>
              </TouchableOpacity>
            </View>            
          </View> 

          <View style={styles.informationsList}>
            {alergiasList.map((item, index) => (
              <View key={index} style={styles.information}>
                <Text style={{color:'#fff'}}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveAlergia(index)}>
                  <Text style={styles.removeInformation}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>          

          <View style={styles.sectionView}>
            <View style={styles.view80}>
              <Text style={styles.label}>Medicamentos Contínuos</Text>     
              <TextInput style={styles.input} value={medicamento} onChangeText={setMedicamento} />
            </View>            

            <View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddMedicamento}>
                <Text style={styles.buttonContent}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.informationsList}>
            {medicamentosList.map((item, index) => (
              <View key={index} style={styles.information}>
                <Text style={{color:'#fff'}}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveMedicamento(index)}>
                  <Text style={styles.removeInformation}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>             

        </View>       

        <TouchableOpacity style={styles.button} onPress={handleGravar}>
          <Text style={styles.buttonText}>Gravar paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}