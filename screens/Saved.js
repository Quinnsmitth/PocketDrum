
import { Text, View, StyleSheet } from 'react-native';
import { NavBar } from './NavBar';

export function Saved({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Hello</Text>

      <NavBar
        active="Saved"
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
