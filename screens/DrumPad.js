
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { NavBar } from './NavBar';

const DRUM_PADS = [
  {
    id: 'kick',
    name: 'KICK',
    sound: require('../assets/sounds/kick-punch-beater.wav'),
  },
  {
    id: 'snare',
    name: 'SNARE',
    sound: require('../assets/sounds/snare-crisp.wav'),
  },
  {
    id: 'closedHat',
    name: 'CLOSED HAT',
    sound: require('../assets/sounds/hat-closed.wav'),
  },
  {
    id: 'openHat',
    name: 'OPEN HAT',
    sound: require('../assets/sounds/hat-tight.wav'),
  },
  {
    id: 'clap',
    name: 'CLAP',
    sound: require('../assets/sounds/clap-wide.wav'),
  },
  {
    id: 'tom',
    name: 'TOM',
    sound: require('../assets/sounds/kick-boom-click.wav'),
  },
  {
    id: 'crash',
    name: 'CRASH',
    sound: require('../assets/sounds/cymbal-modal.wav'),
  },
  {
    id: 'ride',
    name: 'RIDE',
    sound: require('../assets/sounds/cymbal-short-fm.wav'),
  },
  {
    id: 'rim',
    name: 'RIM',
    sound: require('../assets/sounds/kick-click-click.wav'),
  },
];

function DrumPadButton({ pad }) {
  const player = useAudioPlayer(pad.sound);

  async function handlePress() {
    try {
      await player.seekTo(0);
      player.play();
    } catch (error) {
      console.log(`Error playing ${pad.name}:`, error);
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pad,
        pressed && styles.padPressed,
      ]}
      onPress={handlePress}
    >
      <Text style={styles.padText}>{pad.name}</Text>
    </Pressable>
  );
}

export default function DrumPad({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>DRUM PAD</Text>

        <Text style={styles.subtitle}>
          Tap a pad to play a sound
        </Text>

        <View style={styles.padContainer}>
          {DRUM_PADS.map((pad) => (
            <DrumPadButton key={pad.id} pad={pad} />
          ))}
        </View>
      </View>

      <NavBar active="DrumPad" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  content: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,

    // Reserve space for the absolute-positioned NavBar
    paddingBottom: 160,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  padContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },

  pad: {
    width: '31%',
    height: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  padPressed: {
    backgroundColor: '#999999',
    transform: [{ scale: 0.96 }],
  },

  padText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
