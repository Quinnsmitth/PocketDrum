import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home.js';
import { Saved } from './screens/Saved.js';
import { Sequencer } from './screens/Sequencer.js';
import { DrumPad } from './screens/DrumPad.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sequencer" component={Sequencer} />
        <Stack.Screen name="Saved" component={Saved} />
        <Stack.Screen name="DrumPad" component={DrumPad} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
