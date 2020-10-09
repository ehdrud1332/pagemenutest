import React, {useEffect, useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';;

import Browse from "./Browse";
import Category from './Category'
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const getHeaderName = route =>
    route?.state?.routeNames[route.state.index] || "Browse"

const StackNavigation = ({navigation, route}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: getHeaderName(route)
        })
    })

    return (
    <Tab.Navigator>
        <Tab.Screen name="Browse" component={Browse}/>
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    )
}

export default StackNavigation;
