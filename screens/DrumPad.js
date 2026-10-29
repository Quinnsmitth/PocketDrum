import { View, StyleSheet, Text } from 'react-native';
import { NavBar } from './NavBar';

export function DrumPad({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This is the DrumPad Screen</Text>
     <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 82,
  },
  text: {
    marginTop: 100,
    textAlign: 'center'
  }
});
