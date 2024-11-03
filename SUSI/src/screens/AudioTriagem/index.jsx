import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

export default function AudioTriagem({ paciente }) {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Texto triagem</Text>
    </View>
  );
}