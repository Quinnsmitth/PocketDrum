
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';

import { NavBar } from './NavBar';

export default function Home({ navigation }) {
  const { height, width } = useWindowDimensions();

  const checkPress = () => {
    console.log('Button pressed');
  };

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
        <Text style={styles.c_text_top_box_header}>
          Start with a simple beat
        </Text>

        <Text style={styles.c_text_top_box_body}>
          Pick a sound, tap the steps you want to hear, and press play.
        </Text>

        <Pressable
          onPress={checkPress}
          style={styles.topBox_button}
        >
          <Text>+ Create new beat</Text>
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
        <Text style={styles.c_text}>Load Recent</Text>

        <Pressable
          onPress={checkPress}
          style={styles.middleBox_button}
        >
          <Text>Continue editing</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={checkPress}
        style={[
          styles.bottomBox,
          {
            height: height * 0.08,
            width: width * 0.92,
          },
        ]}
      >
        <Text style={styles.c_text_bottom}>
          View saved patterns
        </Text>
      </Pressable>

      <NavBar
        active="Home"
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 75,
    paddingBottom: 110,
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

  topBox_button: {
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

  middleBox_button: {
    height: 60,
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
  },

  bottomBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },

  c_text: {
    textAlign: 'center',
    color: 'black',
  },

  c_text_bottom: {
    color: 'black',
    fontSize: 16,
  },

  c_text_top_box_header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },

  c_text_top_box_body: {
    color: 'grey',
    marginTop: 20,
  },
});
