import React, {useState} from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Block, Text, Button, Card, Badge} from '../components';



const Detail = ({
    navigation,
    route: {
        params: id
    }
}) => {

    return (
        <View>
            <Text>
                {id}
            </Text>
        </View>
    );
};

export default Detail;
