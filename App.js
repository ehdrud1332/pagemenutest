
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './navigation/Stack';

import Block from './components/Block';


export default function App() {
  return (
    <NavigationContainer>
        <Stack />
    </NavigationContainer>
  );
}
