import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {theme} from '../constants/index'
import Browse from "../screens/Browse";

const screens = createStackNavigator(
    {
        Browse
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
                backgroundColor: theme.colors.white,
                borderBottomColor: 'transparent',
                elevation: 0
            },
            headerBackImage: <Image source={require('../assets/icons/back.png')}/>,
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base
            }
        }
    }
)

export default createAppContainer(screens)
