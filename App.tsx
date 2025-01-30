import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './src/navigation/TabNavigator';
import Onboarding from './src/screens/Onboarding';
import {useColorScheme} from 'react-native';

const Stack = createStackNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const MyTheme = {
    ...DefaultTheme,
    ...(isDarkMode ? DarkTheme : {}),
    colors: {
      ...DefaultTheme.colors,
      ...(isDarkMode
        ? {
            background: '#000000',
            card: '#1e1e1e',
            text: '#ffffff',
          }
        : {
            background: '#ffffff',
            card: '#f8f8f8',
            text: '#000000',
          }),
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
