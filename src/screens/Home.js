import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title, Text} from 'react-native-paper';
import { map } from 'lodash';
import CarouselVertical from '../components/CrouselVertical';
import CarouselHorizontal from '../components/CarouselHorizontal';

import {
    getTopRatedMoviesApi,
    getAllGenresApi,
    getDiscoverMoviesApi,
} from '../api/movies';

export default function Home(props) {
    const { navigation } = props;
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [allGenres, setAllGenres] = useState([]);
    const [isSelected, setIsSelected] = useState(28);
    const [discoverMovies, setDiscoverMovies] = useState(null);

    useEffect(() => {
        getTopRatedMoviesApi().then((response) => {
            setTopRatedMovies(response.results);
        });
    }, []);

    useEffect(() => {
        getAllGenresApi().then((response) => {
            setAllGenres(response.genres);
        });
    }, []);

    useEffect(() => {
        getDiscoverMoviesApi(isSelected).then((response) => {
            setDiscoverMovies(response.results);
        });
    }, [isSelected]);

    const onChangeGenger = (GenderID) => {
        setIsSelected(GenderID);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {topRatedMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Top Rated Movies</Title>
                    <CarouselVertical data={topRatedMovies} navigation={navigation} />
                </View>
            )}

            <View style={styles.genres}>
                <Title style={styles.genresTitle}>Movies by Genger</Title>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.genreList}>
                    {map(allGenres, (genre) => (
                        <Text key={genre.id} 
                              onPress={() => onChangeGenger(genre.id)}
                              style={[styles.genre, {color: genre.id != isSelected ? "#8697a5" : "#fff"     }]}>
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>
                { discoverMovies && (
                    <CarouselHorizontal data={ discoverMovies } navigation = { navigation }/>
                ) }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10,
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genres: {
        marginTop: 20,
        marginBottom: 50,
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10,
    },
    genre: {
        marginRight: 20,
        fontSize: 16,
    },
});