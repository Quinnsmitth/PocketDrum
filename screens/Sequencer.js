import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { styles } from './SequencerStyles';

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

  // Let the sequencer play even when the iPhone's silent switch is on.
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch((error) =>
      console.log('Audio mode error:', error)
    );
  }, []);

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

        // Stop the beat when leaving the screen.
        setIsPlaying(false);

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

  // Playback loop: 16th notes, with drift correction so tempo stays steady.
  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      return undefined;
    }

    let step = 0;
    let nextTime = Date.now();
    let timer = null;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      patternRef.current.forEach((row, rowIndex) => {
        if (row[step]) restart(playersRef.current[rowIndex]);
      });
      setCurrentStep(step);

      step = (step + 1) % STEPS;
      const stepMs = 60000 / bpmRef.current / 4;
      nextTime += stepMs;

      // If we fell far behind (app paused, etc.), resync instead of bursting.
      const now = Date.now();
      if (nextTime < now - stepMs) nextTime = now;

      timer = setTimeout(tick, Math.max(0, nextTime - now));
    };

    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isPlaying]);

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