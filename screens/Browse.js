import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {theme, mocks} from '../constants/index';


import {Block, Text, Button} from '../components'

const {width} = Dimensions.get('window')




const Browse = props => {

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState("Products")


    const handleTab = tab => {
        const {categories} = props;
        const filtered = categories.filter(category =>
            category.tags.includes(tab.toLowerCase()))
        setCategories(filtered)
        console.log(filtered)
        setActive(tab)
    }


    const renderTab = (tab) => {
        const isActive = active === tab;

        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => handleTab(tab)}
                style={[styles.tab, isActive ? styles.active : null]}
            >
                <Text size={16} medium gray={!isActive} secendary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    const tabs = ["products", "Inspirations", "shop"]

    return (
        <Block>
            <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold>
                    Browse
                </Text>
                <Button onPress={() => props.navigation.navigate("Settings")}>
                    <Image source={props.profile.avatar} style={styles.avatar} />
                </Button>
            </Block>

            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab => renderTab(tab))}
            </Block>


        </Block>
    );
};

Browse.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories
}

export default Browse;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3
    },
    categories: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5
    },
    category: {
        // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    }
});
