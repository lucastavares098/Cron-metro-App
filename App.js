/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

/**
 * Componente Stopwatch que rastreia o tempo e exibe um cronômetro.
 *
 * @returns {JSX.Element} O componente Stopwatch renderizado.
 */
const Stopwatch = () => {
  const [cronometro, setCronometro] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [voltas, setVoltas] = useState([]);

  useEffect(() => {
    let intervalo = null;
    if (cronometro) {
      intervalo = setInterval(() => {
        setTempo((prevTempo) => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [cronometro]);

    /**
   * Alterna o valor de `cronometro` para iniciar ou parar o cronômetro.
   *
   */
  const StartStop = () => {
    setCronometro(!cronometro);
  };

    /**
   * Reseta o estado do componente.
   *
   */
  const Reset = () => {
    if (cronometro) {
      setVoltas([...voltas, tempo]);
    } else {
      setTempo(0);
      setVoltas([]);
    }
  };

    /**
   * Converte uma quantidade de segundos para um formato de tempo.
   *
   * @param {number} segundos - A quantidade de segundos a ser convertida.
   * @return {string} - A string de tempo formatada no formato "mm:ss".
   */
  const formatoTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loja de Esportes</Text>
      <Text style={styles.timer}>{formatoTempo(tempo)}</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={StartStop}>
          <Text>{cronometro ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Reset}>
          <Text>{cronometro ? 'Volta' : 'Resetar'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.voltaWrapper}>
        {voltas.map((volta, index) => (
          <Text key={index} style={styles.voltaText}>
            Volta {index + 1}: {formatoTempo(volta)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * Renderiza o componente principal da aplicação.
 *
 * @return {JSX.Element} O componente da aplicação renderizado.
 */
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Stopwatch />
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  paddingTop: 50,
  paddingHorizontal: 20,
},
header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 30,
},
timer: {
  fontSize: 48,
  fontWeight: 'bold',
  marginBottom: 30,
},
buttonWrapper: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 30,
},
button: {
  width: 100,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DDD',
  borderRadius: 25,
},
voltaWrapper: {
  alignSelf: 'stretch',
},
voltaText: {
  fontSize: 18,
  marginBottom: 10,
},
});

export default App;
