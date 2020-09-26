import React from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../constants/index';
import Block from './Block'

const Card = (props) => {

    const cardStyles = [styles.card, props.style];

    return (
        <Block color={props.color || theme.colors.white} style={cardStyles} {...props}>
            {props.children}
        </Block>
    );
};

export default Card;

export const styles = StyleSheet.create({
    card: {
        borderRadius: theme.sizes.radius,
        padding: theme.sizes.base + 4,
        marginBottom: theme.sizes.base
    }
});
