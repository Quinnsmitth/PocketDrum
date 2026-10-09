import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import {turnColor} from './press'
export default function App() {

  // Sets default instruments
  const instruments = [
    'Kick',
    'Snare',
    'Hi-Hat',
    'Cymbal'
  ];

  // Initializes arrays for each instrument
  const [pattern, setPattern] = useState([
    Array(16).fill(false),
    Array(16).fill(false),
    Array(16).fill(false),
    Array(16).fill(false)
  ]);
  const toggleStep = (rowIndex, stepIndex) =>{
    const newPattern = pattern.map(row => [...row]);
    newPattern[rowIndex][stepIndex] =!newPattern[rowIndex][stepIndex];
    setPattern(newPattern);
  }
  // Sets default tempo to 120 BPM
  const [bpm, setBpm] = useState(120);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pocket Drum Machine
      </Text>

      <Text style={styles.bpm}>
        BPM: {bpm}
      </Text>

    {instruments.map((instrument, rowIndex) => (

    <View key={rowIndex} style={styles.drumRow}>

      <Text style={styles.instrument}>
        {instrument}
      </Text>

      {pattern[rowIndex].map((step, stepIndex) => (
        <Pressable
          onPress={() => toggleStep(rowIndex, stepIndex)}
          key={stepIndex}
          style={[
          styles.step,
          {
            backgroundColor: step ? '#00ff88' : '#555555'
          }
        ]}
        />
      ))}

    </View>

    ))}
    </View>

);}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
    paddingTop: 60,
  
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
  },

  bpm: {
    color: '#aaaaaa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 0,
  },

  instrument: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    marginRight:10
  },

  drumRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50
  },

  step: {
    width: 40,
    height: 40,
    backgroundColor: '#555555',
    margin: 2,
    borderRadius: 4,
  },

});