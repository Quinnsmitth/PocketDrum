
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { NavBar } from './NavBar';

const DRUM_PADS = [
  {
    id: 'kick',
    name: 'KICK',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'snare',
    name: 'SNARE',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'closedHat',
    name: 'CLOSED HAT',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'openHat',
    name: 'OPEN HAT',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'clap',
    name: 'CLAP',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'tom',
    name: 'TOM',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'crash',
    name: 'CRASH',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'ride',
    name: 'RIDE',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
  {
    id: 'rim',
    name: 'RIM',
    color: '#000000',
    sound: require('../assets/sounds/'),
  },
];

// Individual pad component
function DrumPadButton({ pad }) {
  const player = useAudioPlayer(pad.sound);

  function handlePress() {
    player.seekTo(0);
    player.play();
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.pad,
        { backgroundColor: pad.color },
        pressed && styles.padPressed,
      ]}
    >
      <Text style={styles.padText}>
        {pad.name}
      </Text>
    </Pressable>
  );
}

export function DrumPad({ navigation }) {
  return (
    <View style={styles.screen}>

      <Text style={styles.header}>Drum Pad</Text>

      <Text style={styles.subtitle}>
        Tap a pad to play a sound
      </Text>

      <View style={styles.padContainer}>
        {DRUM_PADS.map((pad) => (
          <DrumPadButton key={pad.id} pad={pad} />
        ))}
      </View>

      <NavBar active="DrumPad" navigation={navigation} />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 65,
    paddingBottom: 85,
    alignItems: 'center',
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  subtitle: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  padContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    gap: 8,
  },

  pad: {
    width: '31.8%',
    height: '31%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    elevation: 4,
  },

  padPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.94 }],
  },

  padText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  footer: {
    color: 'grey',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 2,
  },
});
