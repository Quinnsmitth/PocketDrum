
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DEFAULT_ITEMS = ['Home', 'Sequencer', 'Saved', 'DrumPad'];

export function NavBar({ active, navigation }) {
  return (
    <View style={styles.nav}>
      {DEFAULT_ITEMS.map((name) => {
        const focused = name === active;

        return (
          <Pressable
            key={name}
            onPress={() => navigation.replace(name)}
            style={[
              styles.nav_icons,
              focused && styles.nav_icons_active,
            ]}
          >
            <Text style={focused ? styles.nav_text_active : null}>
              {name === 'DrumPad' ? 'Drum Pad' : name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    height: 85,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderColor: 'grey',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  nav_icons: {
    width: '23%',
    height: 55,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nav_icons_active: {
    backgroundColor: '#eee',
    borderColor: 'black',
  },

  nav_text_active: {
    fontWeight: 'bold',
  },
});
