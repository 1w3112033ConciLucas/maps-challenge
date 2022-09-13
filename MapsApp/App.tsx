

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
//import Map from './src/screens/Map';
import { StackNavigator } from './src/navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
}

export default App
