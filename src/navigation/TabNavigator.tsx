import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import Home from '../screens/Home';
import Wardrobe from '../screens/Wardrobe';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: MyTheme.colors.card,
          },
          tabBarActiveTintColor: isDarkMode ? '#ffffff' : '#000000',
          tabBarInactiveTintColor: isDarkMode ? '#aaaaaa' : '#555555',
          headerStyle: {
            backgroundColor: MyTheme.colors.card,
          },
          headerTintColor: MyTheme.colors.text,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wardrobe" component={Wardrobe} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
