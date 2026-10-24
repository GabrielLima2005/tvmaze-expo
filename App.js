import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ShowsScreen from './src/screens/ShowsScreen';
import EpisodesScreen from './src/screens/EpisodesScreen';

const Stack = createNativeStackNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#f4f6fb' } };

export default function App() {
  return <NavigationContainer theme={theme}><StatusBar style="light" /><Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#101827'},headerTintColor:'#fff',headerTitleStyle:{fontWeight:'700'},contentStyle:{backgroundColor:'#f4f6fb'}}}><Stack.Screen name="Shows" component={ShowsScreen} options={{title:'TVmaze Explorer'}} /><Stack.Screen name="Episodes" component={EpisodesScreen} options={({route})=>({title:route.params?.showName || 'Episódios'})} /></Stack.Navigator></NavigationContainer>;
}
