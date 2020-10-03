import React from 'react';
import {StyleSheet} from 'react-native';

import {theme} from '../constants/index'
import Block from "./Block";

const Badge = props => {

    const badgeStyles = StyleSheet.flatten([
        styles.badge,
        props.size && {
            height: props.size,
            width: props.size,
            borderRadius: props.size
        },
        props.style
    ])

    return (
        <Block
            flex={false}
            middle
            center
            color={props.color}
            style={badgeStyles}
            {...props}
        >
            {props.children}
        </Block>
    );
};

export default Badge;

const styles = StyleSheet.create({
    badge: {
        height: theme.sizes.base,
        width: theme.sizes.base,
        borderRadius: theme.sizes.border,
    }
});
