
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DEFAULT_ITEMS = ['Home', 'Saved'];

export function NavBar({
  items = DEFAULT_ITEMS,
  active,
  navigation,
}) {
  return (
    <View style={styles.nav}>
      {items.map((name) => {
        const focused = name === active;

        return (
          <Pressable
            key={name}
            onPress={() => navigation.navigate(name)}
            style={[
              styles.nav_icons,
              focused && styles.nav_icons_active,
            ]}
          >
            <Text
              style={focused ? styles.nav_text_active : null}
            >
              {name}
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
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderColor: 'grey',
    borderWidth: 2,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  nav_icons: {
    marginTop: 5,
    width: '22%',
    height: 65,
    borderWidth: 2,
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
