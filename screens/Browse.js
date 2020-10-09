import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {productApi, apiImage} from '../api'
import {theme} from '../constants/index';



import {Block, Text, Button, Card, Badge} from '../components'

const {width} = Dimensions.get('window')

const Browse = props => {

    const [active, setActive] = useState("All")
    const [result, setResult] = useState({
        loading: true,
        products: [],
        productsError: null
    });

    const {profile, navigation} = props;
    const tabs = ['All', 'Phone', 'Tablet', 'Laptop']

    const handleTab = tab => {

        if (active === "All") {
            console.log("All")
        }

        // const filtered = nowPlaying.filter(movie =>
        //     movie.original_language.includes(tab.toLowerCase()))
        // setMovies({nowPlaying: filtered})
        // setActive(tab)
    }
    const renderTab = (tab) => {
        const isActive = active === tab;

        return (
            <TouchableOpacity
                onPress={() => handleTab(tab)}
                style={[styles.tab, isActive ? styles.active : null]}
            >
                <Text size={16} medium gray={!isActive} secendary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    const getData = async () => {
        const [products, productsError] = await productApi.all();
        setResult({
            loading: false,
            productsError,
            products
        })
        console.log(products)

    }

    useEffect(() =>{
        getData();
    }, [])


    return (
        <Block>
            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab => renderTab(tab))}
            </Block>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{paddingVertical: theme.sizes.base * 2}}
            >
                <Block flex={false} row space="between" style={styles.categories}>

                    {result.products.map(product => (


                        <TouchableOpacity
                            key={product.id}
                            onPress={() => props.navigation.navigate("Detail", product._id)}
                        >
                            {console.log(apiImage(product.image.url))}
                            <Card center middle shadow style={styles.category}>
                                <Badge
                                    margin={[0, 0, 15]}
                                    size={50}
                                    color="rgba(41, 216, 143, 0.20)"
                                >
                                    <Image style={{width: 80, height: 80,}} source={{uri : `http://localhost:1337${product.image.url}`}}/>

                                </Badge>
                                <Text medium height="20">
                                    {product.name}
                                </Text>
                                <Text gray caption>
                                    $ {product.price}
                                </Text>
                            </Card>

                        </TouchableOpacity>
                    ))}















                </Block>
            </ScrollView>
        </Block>
    );
};

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
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        marginBottom: 15
    }
});
