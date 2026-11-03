
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { NavBar } from './NavBar';
import { getPatterns, deletePattern } from '../storage/patterns';

export function Saved({ navigation }) {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load saved patterns whenever this screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadPatterns();
    }, [])
  );

  async function loadPatterns() {
    try {
      setLoading(true);
      const savedPatterns = await getPatterns();
      setPatterns(savedPatterns);
    } catch (error) {
      console.error('Could not load patterns:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    Alert.alert(
      'Delete Pattern',
      'Are you sure you want to delete this beat?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePattern(id);
              await loadPatterns();
            } catch (error) {
              Alert.alert('Error', 'Could not delete pattern.');
            }
          },
        },
      ]
    );
  }

  function renderPattern({ item }) {
    return (
      <View style={styles.patternCard}>
        <View style={styles.patternInfo}>
          <Text style={styles.patternName}>{item.name}</Text>
          <Text style={styles.patternBpm}>
            {item.bpm} BPM
          </Text>
        </View>

        <Pressable
          style={styles.playButton}
          onPress={() =>
            navigation.replace('Sequencer', {
              mode: 'load',
              pattern: item,
            })
          }
        >
          <Text style={styles.buttonText}>OPEN</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>DELETE</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Saved Beats</Text>
      <Text style={styles.subtitle}>
        Your collection of drum patterns
      </Text>

      {loading ? (
        <Text style={styles.message}>Loading beats...</Text>
      ) : (
        <FlatList
          data={patterns}
          keyExtractor={(item) => item.id}
          renderItem={renderPattern}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.message}>
              No saved beats yet. Create a beat in the Sequencer!
            </Text>
          }
        />
      )}

      <NavBar active="Saved" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 65,
    paddingBottom: 82,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  patternCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    gap: 10,
  },
  patternInfo: {
    flex: 1,
  },
  patternName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  patternBpm: {
    fontSize: 13,
    color: 'grey',
    marginTop: 5,
  },
  playButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  },
  message: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
