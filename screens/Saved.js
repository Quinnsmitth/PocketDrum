import { View, StyleSheet, Text } from 'react-native';
import { NavBar } from './NavBar';

export function Saved({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This is the Saved Screen</Text>
      <NavBar active="Saved" navigation={navigation} />
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
