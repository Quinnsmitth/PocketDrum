import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';

const STEPS = 16;


const SOUNDS = {
  kick: require('../assets/sounds/kick-punch-beater.wav'),
  snare: require('../assets/sounds/snare-crisp.wav'),
  hihat: require('../assets/sounds/hat-closed.wav'),
  cymbal: require('../assets/sounds/cymbal-modal.wav'),
  tom1: require('../assets/sounds/kick-boom-click.wav'),
  tom2: require('../assets/sounds/kick-soft-click.wav'),
  bass: require('../assets/sounds/kick-hard-beater.wav'),
};

function restart(player) {
  if (!player) return;
  try {
    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log('Playback error:', error);
  }
}

export function Sequencer({ navigation }) {
  const { width } = useWindowDimensions();

  // One audio player per row. Called individually so the hook order never changes.
  const kickPlayer = useAudioPlayer(SOUNDS.kick);
  const snarePlayer = useAudioPlayer(SOUNDS.snare);
  const hihatPlayer = useAudioPlayer(SOUNDS.hihat);
  const cymbalPlayer = useAudioPlayer(SOUNDS.cymbal);
  const tom1Player = useAudioPlayer(SOUNDS.tom1);
  const tom2Player = useAudioPlayer(SOUNDS.tom2);
  const bassPlayer = useAudioPlayer(SOUNDS.bass);
  const players = [
    kickPlayer,
    snarePlayer,
    hihatPlayer,
    cymbalPlayer,
    tom1Player,
    tom2Player,
    bassPlayer,
  ];
  const playersRef = useRef(players);
  playersRef.current = players;

  

  // Dynamically size the 16 steps to fit the screen.
  const stepWidth = Math.max(22, Math.min(44, (width - 240) / 16));
  const gridWidth = (stepWidth + 2) * STEPS;

  // Handle orientation when entering and leaving the Sequencer.
  useFocusEffect(
    useCallback(() => {
      let orientationChanged = false;

      const setLandscape = async () => {
        if (orientationChanged) return;

        orientationChanged = true;

        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );

          console.log('Landscape orientation enabled');
        } catch (error) {
          console.error('Landscape orientation error:', error);
        }
      };

      const unsubscribe = navigation.addListener(
        'transitionEnd',
        (event) => {
          if (!event.data?.closing) {
            setLandscape();
          }
        }
      );

      const fallback = setTimeout(setLandscape, 500);

      return () => {
        clearTimeout(fallback);
        unsubscribe();

        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        ).catch((error) => {
          console.error('Portrait orientation error:', error);
        });
      };
    }, [navigation])
  );

  const instruments = [
    'Kick',
    'Snare',
    'Hi-hat',
    'Cymbal',
    'Tom1',
    'Tom2',
    'Bass',
  ];

  // Initialize 7 rows of 16 steps.
  const [pattern, setPattern] = useState(
    Array.from({ length: 7 }, () => Array(STEPS).fill(false))
  );

  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  // Refs let the running loop see the latest pattern/BPM without restarting.
  const patternRef = useRef(pattern);
  const bpmRef = useRef(bpm);
  patternRef.current = pattern;
  bpmRef.current = bpm;

  
  // Toggle an individual step. Turning a step on previews its sound.
  const toggleStep = (rowIndex, stepIndex) => {
    const turningOn = !pattern[rowIndex][stepIndex];

    setPattern((prev) => {
      const newPattern = prev.map((row) => [...row]);
      newPattern[rowIndex][stepIndex] = !newPattern[rowIndex][stepIndex];
      return newPattern;
    });

    if (turningOn && !isPlaying) restart(players[rowIndex]);
  };

  // Adjust BPM between 40 and 200.
  const adjustBpm = (delta) => {
    setBpm((prev) => Math.min(200, Math.max(40, prev + delta)));
  };

  // Return to Home.
  const goHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.mainTitle}>Beat editor</Text>
          <Text style={styles.subTitle}>
            Basic groove · Classic kit
          </Text>
        </View>

        <View style={styles.headerButtons}>

          {/* Play / Stop Controls */}
          <Pressable
            style={[
              styles.controlBtn,
              isPlaying && styles.activeControlBtn,
            ]}
            onPress={() => setIsPlaying(true)}
          >
            <Text style={styles.controlBtnText}>▶ Play</Text>
          </Pressable>

          <Pressable
            style={[
              styles.controlBtn,
              !isPlaying && styles.activeControlBtn,
            ]}
            onPress={() => setIsPlaying(false)}
          >
            <Text style={styles.controlBtnText}>⏹ Stop</Text>
          </Pressable>

          <Pressable
            style={styles.homeButton}
            onPress={goHome}
          >
            <Text style={styles.homeButtonText}>Home</Text>
          </Pressable>

          <Pressable style={styles.saveButton}>
            {/* TODO: Add save functionality */}
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>

      {/* Playback Status */}
      <Text style={styles.statusText}>
        {isPlaying ? 'Playing...' : 'Stopped'}
      </Text>

      {/* Main Landscape Layout */}
      <View style={styles.mainLayout}>

        {/* Left Column: Sequencer Grid */}
        <View style={styles.gridSection}>
          <View style={styles.gridHeaderRow}>
            <Text style={styles.sectionTitle}>Your pattern</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollContainer}
            >
              <View style={{ width: gridWidth }}>

                {/* Step Numbers */}
                <View style={styles.stepNumbersRow}>
                  {Array.from({ length: STEPS }).map((_, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.stepNumber,
                        {
                          width: stepWidth,
                          marginRight: 2,
                        },
                        i % 4 === 0 && styles.boldStepNumber,
                        i === currentStep && styles.currentStepNumber,
                      ]}
                    >
                      {i + 1}
                    </Text>
                  ))}
                </View>

                {/* Instrument Rows */}
                {instruments.map((instrument, rowIndex) => (
                  <View
                    key={rowIndex}
                    style={styles.instrumentBlock}
                  >
                    <Text style={styles.instrumentLabel}>
                      {instrument}
                    </Text>

                    <View style={styles.stepsRow}>
                      {pattern[rowIndex].map((step, stepIndex) => (
                        <Pressable
                          key={stepIndex}
                          onPress={() =>
                            toggleStep(rowIndex, stepIndex)
                          }
                          style={[
                            styles.step,
                            {
                              width: stepWidth,
                            },
                            step
                              ? styles.stepActive
                              : styles.stepInactive,
                            stepIndex === currentStep &&
                              (step
                                ? styles.stepPlayingActive
                                : styles.stepPlayingInactive),
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendBox} />
              <Text style={styles.legendText}>
                Filled = sound on. Tap any step to change it.
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* Right Column: Tempo Controls */}
        <View style={styles.controlsSection}>

          {/* Tempo Controls - Bottom */}
          <View style={styles.tempoSection}>
            <View style={styles.tempoHeaderRow}>
              <Text style={styles.tempoTitle}>Tempo</Text>
              <Text style={styles.tempoRange}>40–200 BPM</Text>
            </View>

            <View style={styles.bpmControls}>
              <Pressable
                style={styles.bpmBtn}
                onPress={() => adjustBpm(-1)}
              >
                <Text style={styles.bpmBtnText}>-</Text>
              </Pressable>

              <View style={styles.bpmValueBox}>
                <Text style={styles.bpmValue}>{bpm}</Text>
                <Text style={styles.bpmUnit}>BPM</Text>
              </View>

              <Pressable
                style={styles.bpmBtn}
                onPress={() => adjustBpm(1)}
              >
                <Text style={styles.bpmBtnText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 10,
    minHeight: 55,
  },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  mainTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#111111',
  },

  subTitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
  },

  homeButton: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },

  homeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  saveButton: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  mainLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  gridSection: {
    flex: 1,
  },

  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
    paddingHorizontal: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },

  horizontalScrollContainer: {
    flexGrow: 0,
  },

  stepNumbersRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },

  stepNumber: {
    textAlign: 'center',
    fontSize: 9,
    color: '#888888',
  },

  boldStepNumber: {
    fontWeight: 'bold',
    color: '#111111',
  },

  instrumentBlock: {
    marginBottom: 3,
  },

  instrumentLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 1,
  },

  stepsRow: {
    flexDirection: 'row',
    gap: 2,
  },

  step: {
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
  },

  stepInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
  },

  stepActive: {
    backgroundColor: '#1c1c1e',
    borderColor: '#1c1c1e',
  },

  currentStepNumber: {
    color: '#ff6b00',
    fontWeight: 'bold',
  },

  // Playhead column: highlighted as it sweeps across the grid.
  stepPlayingInactive: {
    backgroundColor: '#ffe8d6',
    borderColor: '#ff6b00',
  },

  stepPlayingActive: {
    backgroundColor: '#ff6b00',
    borderColor: '#ff6b00',
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  legendBox: {
    width: 8,
    height: 8,
    backgroundColor: '#1c1c1e',
    borderRadius: 2,
    marginRight: 6,
  },

  legendText: {
    fontSize: 9,
    color: '#666666',
  },

  controlsSection: {
    width: 190,
    paddingRight: 20,
    justifyContent: 'flex-end',
  },

  controlBtn: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  activeControlBtn: {
    backgroundColor: '#f0f0f0',
  },

  controlBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },

  statusText: {
    fontSize: 10,
    color: '#777777',
    marginLeft: 55,
    marginBottom: 2,
  },

  tempoSection: {
    marginTop: 'auto',
    marginBottom: 45,
    marginLeft: 8,
  },

  tempoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },

  tempoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  tempoRange: {
    fontSize: 10,
    color: '#777777',
  },

  bpmControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  bpmBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  bpmBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111111',
  },

  bpmValueBox: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },

  bpmValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },

  bpmUnit: {
    fontSize: 10,
    color: '#666666',
  },
});