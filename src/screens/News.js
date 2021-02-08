import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback, } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { map } from 'lodash';
import { getNewsMoviesApi } from '../api/movies';
import FastImage from 'react-native-fast-image'
import noImage from '../assets/default-img.png';
import { THEMOVIEDB_BASE_PATH_IMG, CAROUSEL_IMG_SIZE } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const { width } = Dimensions.get('window');

export default function News(props) {
    const { navigation } = props;
    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const { theme } = usePreferences();

    useEffect(() => {
        getNewsMoviesApi(page).then((response) => {
            const totalPages = response.total_pages;
            if (page < totalPages) {
                if (!movies) {
                    setMovies(response.results);
                } else {
                    setMovies([...movies, ...response.results]);
                }
            } else {
                setShowBtnMore(false);
            }
        });
    }, [page]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {map(movies, (movie, index) => (
                    <Movie key={index} movie={movie} navigation={navigation} />
                ))}
            </View>
            {showBtnMore && (
                <Button
                    mode="contained"
                    contentStyle={styles.buttonContainer}
                    style={styles.loadMore}
                    labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                    onPress={() => setPage(page + 1)}>
                    show more...
                </Button>
            )}
        </ScrollView>
    );
}

function Movie(props) {
    const { movie, navigation } = props;
    const { id, poster_path } = movie;

    const goMovie = () => {
        navigation.navigate('movie', { id });
    };

    return (
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style={styles.movie}>
                <FastImage
                    style={styles.image}
                    source={
                        poster_path
                            ? { uri: `${THEMOVIEDB_BASE_PATH_IMG}${CAROUSEL_IMG_SIZE}${poster_path}` }
                            : noImage
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    movie: {
        width: width / 3,
        height: 302,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        backgroundColor: "#C30A0D",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12

    },
    loadMore: {
        backgroundColor: 'transparent',
    },
});