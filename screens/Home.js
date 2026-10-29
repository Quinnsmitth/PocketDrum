import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';

export default function Home({ navigation }) {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Pocket Drum</Text>

      <View
        style={[
          styles.topBox,
          {
            height: height * 0.22,
            width: width * 0.92,
          },
        ]}
      >
        <Text style={styles.topBoxHeader}>Start with a simple beat</Text>
        <Text style={styles.topBoxBody}>
          Pick a sound, tap the steps you want to hear, and press play.
        </Text>

        <Pressable
          onPress={() => navigation.replace('Sequencer', { mode: 'new' })}
          style={styles.topBoxButton}
        >
          <Text>Create new beat</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.middleBox,
          {
            height: height * 0.35,
            width: width * 0.92,
          },
        ]}
      >
        <Text style={styles.sectionText}>Load Recent</Text>

        <Pressable
          onPress={() => navigation.replace('Sequencer', { mode: 'recent' })}
          style={styles.middleBoxButton}
        >
          <Text>Continue editing</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.replace('Saved')}
        style={[
          styles.savedButton,
          {
            height: height * 0.08,
            width: width * 0.92,
          },
        ]}
      >
        <Text style={styles.savedButtonText}>View saved patterns</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.replace('DrumPad')}
        style={styles.drumPadButton}
      >
        <Text style={styles.drumPadButtonText}>Drum Pad</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 75,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 12,
  },
  header: {
    fontSize: 35,
    marginBottom: 30,
  },
  topBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    padding: 12,
  },
  topBoxButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
  },
  middleBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleBoxButton: {
    height: 60,
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
  },
  savedButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    textAlign: 'center',
    color: 'black',
  },
  savedButtonText: {
    color: 'black',
    fontSize: 16,
  },
  topBoxHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  topBoxBody: {
    color: 'grey',
    marginTop: 20,
  },
  drumPadButton: {
    width: '92%',
    height: 60,
    marginTop: 'auto',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drumPadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
