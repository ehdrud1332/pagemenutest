import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Detail from '../screens/Detail';
import StackNavigation from "../screens/StackNavigation";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="StackNavigation" component={StackNavigation} />
        <Stack.Screen name="Detail" component={Detail}/>
    </Stack.Navigator>
)
