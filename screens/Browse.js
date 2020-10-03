import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {movieApi, apiImage} from '../api'
import {theme} from '../constants/index';


import {Block, Text, Button, Card, Badge} from '../components'

const {width} = Dimensions.get('window')

const Browse = props => {

    const [active, setActive] = useState("en")

    const [movies, setMovies] = useState({
        loading: true,
        nowPlaying: [],
        popular: [],
        upcoming: [],
        nowPlayingError: null,
        popularError: null,
        upcomingError: null,
    });

    const {profile, navigation} = props;
    const tabs = ['en', 'fr', 'ko']

    const handleTab = tab => {

        if (active === "en") {
            console.log("en 찍")
        }

        const filtered = nowPlaying.filter(movie =>
            movie.original_language.includes(tab.toLowerCase()))
        setMovies({nowPlaying: filtered})
        setActive(tab)
    }
    const renderTab = (tab) => {
        const isActive = active === tab;

        return (
            <TouchableOpacity
                key={`tab._id`}
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
        const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        const [upcoming, upcomingError] = await movieApi.upcoming();
        setMovies({
            loading: false,
            nowPlaying,
            popular,
            upcoming,
            nowPlayingError,
            popularError,
            upcomingError
        })

    }

    useEffect(() =>{
        getData();
    }, [])


    return (
        <Block>
            <Block flex={false} row center space="between" style={styles.header}>
                <Text h1 bold>
                    Browse
                </Text>
                {/*<Button onPress={() => props.navigation.navigate("Movie")}>*/}
                {/*    <Image source={props.profile.avatar} style={styles.avatar} />*/}
                {/*</Button>*/}
            </Block>

            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab => renderTab(tab))}
            </Block>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{paddingVertical: theme.sizes.base * 2}}
            >
                <Block flex={false} row space="between" style={styles.categories}>
                    {movies.nowPlaying.map(movie => (
                        <TouchableOpacity
                            key={movie.id}
                            onPress={() => props.navigation.navigate("Detail")}
                        >

                            <Card center middle shadow style={styles.category}>
                <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41, 216, 143, 0.20)"
                >
                    <Image source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                </Badge>
                <Text medium height="20">
                    {movie.title}
                </Text>
                <Text gray caption>
                    {movie.vote_average} votes
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
