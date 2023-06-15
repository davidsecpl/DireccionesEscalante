import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MapsScreen, MainScreen, PlaceListScreen } from '../screens/index';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Nueva Dirección' }} />
      <Stack.Screen name="Maps" component={MapsScreen} options={{ title: 'Mapa' }} />
      <Stack.Screen name="PlaceList" component={PlaceListScreen} options={{ title: 'Direcciones' }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
