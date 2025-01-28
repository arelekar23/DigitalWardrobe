import React from 'react';
import {View, useColorScheme, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';
import icons from '../../constants/icons';
import Home from '../screens/Home';
import Wardrobe from '../screens/Wardrobe';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
};

const TabIcon = ({icon, color, focused}: TabIconProps) => {
  return (
    <View style={styles.icons}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          height: 25,
          width: 25,
        }}
      />
    </View>
  );
};

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
        <Tab.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="wardrobe"
          options={{
            title: 'Wardrobe',
            headerShown: true,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.closet} color={color} focused={focused} />
            ),
          }}
          component={Wardrobe}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});
export default TabNavigator;
