import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigatorTheme } from 'src/shared/theme';
import { BookDetail } from 'src/containers/BookDetail';
import { HomeScreen } from 'src/containers/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const Router: React.FC = () => (
  <NavigationContainer theme={navigatorTheme}>
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);
