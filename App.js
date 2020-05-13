/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as DataProvider} from './src/context/DataContext';
import Ionicons from 'react-native-vector-icons/AntDesign';
Ionicons.loadFont();
// import { Provider as AuthProvider } from "./src/context/AuthContext";

import {
  HomeScreen,
  PlansScreen,
  ProfileScreen,
  SettingsScreen,
} from './src/screens';

const Tab = createBottomTabNavigator();

export default function App() {
  // Ionicons.loadFont();
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName =
                route.name === 'Home'
                  ? 'home'
                  : route.name === 'Profile'
                  ? 'user'
                  : route.name === 'Plans'
                  ? 'carryout'
                  : 'setting';

              return <Ionicons name={iconName} size={25} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Plans" component={PlansScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
