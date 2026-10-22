import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Sequencer() {
  // Automatically lock the screen to landscape mode on mount
  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    lockOrientation();

    // Optional: unlock when leaving the screen.
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const instruments = ['Kick', 'Snare', 'Hi-hat', 'Cymbal', 'Tom1', 'Tom2', 'Base'];

  // Initialize 4 rows of 16 steps
  const [pattern, setPattern] = useState([
    Array(24).fill(false),
    Array(24).fill(false),
    Array(24).fill(false),
    Array(24).fill(false),
    Array(24).fill(false),
    Array(24).fill(false),
    Array(24).fill(false)
  ]);

  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleStep = (rowIndex, stepIndex) => {
    const newPattern = pattern.map((row) => [...row]);
    newPattern[rowIndex][stepIndex] = !newPattern[rowIndex][stepIndex];
    setPattern(newPattern);
  };

  const adjustBpm = (delta) => {
    setBpm((prev) => Math.min(200, Math.max(40, prev + delta)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.mainTitle}>Beat editor</Text>
          <Text style={styles.subTitle}>Basic groove · Classic kit</Text>
        </View>
        <Pressable style={styles.saveButton}> {/*ADD THE SAVE FUNCTION!!!!!*/}
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      {/* Main Landscape Layout: Grid Left / Controls Right */}
      <View style={styles.mainLayout}>
        {/* Left Column: Sequencer Grid */}
        <View style={styles.gridSection}>
          <View style={styles.gridHeaderRow}>
            <Text style={styles.sectionTitle}>Your pattern</Text>
            <Text style={styles.barInfo}>1 bar · 4 beats</Text>
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
              <View>
                {/* Step Numbers (1-16) */}
                <View style={styles.stepNumbersRow}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.stepNumber,
                        i % 4 === 0 && styles.boldStepNumber,
                      ]}
                    >
                      {i + 1}
                    </Text>
                  ))}
                </View>

                {/* Instrument Rows (Label + Pressable steps scroll together) */}
                {instruments.map((instrument, rowIndex) => (
                  <View key={rowIndex} style={styles.instrumentBlock}>
                    <Text style={styles.instrumentLabel}>{instrument}</Text>
                    <View style={styles.stepsRow}>
                      {pattern[rowIndex].map((step, stepIndex) => (
                        <Pressable
                          key={stepIndex}
                          onPress={() => toggleStep(rowIndex, stepIndex)}
                          style={[
                            styles.step,
                            step ? styles.stepActive : styles.stepInactive,
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


        {/* Right Column: Playback & Tempo Controls */}
        <View style={styles.controlsSection}>
          {/* Play/Stop Controls */}
          <View style={styles.playStopGroup}>
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
          </View>

          <Text style={styles.statusText}>
            {isPlaying ? 'Playing...' : 'Stopped'}
          </Text>

          {/* Tempo Controls */}
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

              <Pressable style={styles.bpmBtn} onPress={() => adjustBpm(1)}>
                <Text style={styles.bpmBtnText}>+</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  subTitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
  },
  saveButton: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },
  mainLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridSection: {
    flex: 1,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  barInfo: {
    fontSize: 11,
    color: '#777777',
  },
  stepNumbersRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  stepNumber: {
    width: 24,
    textAlign: 'center',
    marginRight: 3,
    fontSize: 10,
    color: '#888888',
  },
  boldStepNumber: {
    fontWeight: 'bold',
    color: '#111111',
  },
  instrumentBlock: {
    marginBottom: 8,
  },
  instrumentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 2,
  },
  stepsRow: {
    flexDirection: 'row',
  },
  step: {
    width: 24,
    height: 30,
    marginRight: 3,
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
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  legendBox: {
    width: 8,
    height: 8,
    backgroundColor: '#1c1c1e',
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#666666',
  },
  controlsSection: {
    width: 170,
  },
  playStopGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  controlBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 6,
    paddingVertical: 6,
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
    marginTop: 4,
    marginBottom: 10,
  },
  tempoSection: {
    marginTop: 4,
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
  tempoHelpText: {
    fontSize: 10,
    color: '#888888',
    marginTop: 4,
  },
});