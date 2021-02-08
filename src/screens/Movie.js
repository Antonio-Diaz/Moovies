import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Title, Text } from 'react-native-paper';
import { map } from 'lodash';
import { Rating } from 'react-native-ratings';
import { getMovieByIdApi } from '../api/movies';
import { THEMOVIEDB_BASE_PATH_IMG, CAROUSEL_IMG_SIZE } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import noImage from '../assets/default-img.png';
import StarDark from '../assets/starDark.png';
import StarLight from '../assets/starLight.png';

export default function Movie(props) {
    const { route } = props;
    const { id } = route.params;
    const [detailMovie, setDetailMovie] = useState(null);

    useEffect(() => {
        getMovieByIdApi(id).then((response) => {
            setDetailMovie(response);
        });
    }, []);
    if (!detailMovie) return null;
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieImage posterPath={detailMovie.poster_path}> </MovieImage>
                <MovieTitle movie={detailMovie} />
                <MovieRating
                    voteCount={detailMovie.vote_count}
                    voteAverage={detailMovie.vote_average}
                />
                <MovieOverview movie={detailMovie} />
            </ScrollView>
        </>
    );
}

function MovieImage(props) {
    const { posterPath } = props;
    return (
        <View style={styles.viewPoster}>
            <FastImage
                style={styles.poster}
                source={
                    posterPath
                        ? { uri: `${THEMOVIEDB_BASE_PATH_IMG}${CAROUSEL_IMG_SIZE}${posterPath}` }
                        : noImage
                }
            />
        </View>
    );
}

function MovieTitle(props) {
    const { movie } = props;

    return (
        <View style={styles.viewInfo}>
            <Title>{movie.title}</Title>
            <View style={styles.viewGenres}>
                {map(movie.genres, (genre) => (
                    <Text key={genre.id} style={styles.genre}>
                        {genre.name}
                    </Text>
                ))}
            </View>
        </View>
    );
}

function MovieOverview(props) {
    const { movie } = props;

    return (
        <View>
            <Text style={styles.overview}>{movie.overview}</Text>
            <Text style={[styles.overview, { marginBottom: 30 }]}>
                Release: {movie.release_date}
            </Text>
        </View>
    );
}

function MovieRating(props) {
    const { voteCount, voteAverage } = props;
    const mean = voteAverage / 2;
    const { theme } = usePreferences();

    return (
        <View style={styles.viewRating}>
            <Rating
                type="custom"
                ratingImage={theme === 'dark' ? StarDark : StarLight}
                ratingColor="#ffc205"
                ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
                startingValue={mean}
                imageSize={20}
                readonly={true}
                style={{ marginRight: 15 }}
            />
            <Text style={styles.mean}>{mean}</Text>
            <Text style={styles.count}>{voteCount} votes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewPoster: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        textShadowRadius: 10,
    },
    poster: {
        width: '100%',
        height: 600,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    viewInfo: {
        marginTop: 22,
        marginHorizontal: 30,
    },
    viewGenres: {
        flexDirection: 'row',
    },
    genre: {
        marginRight: 20,
        color: '#8697a5',
    },
    overview: {
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: 'justify',
        color: '#8697a5',
    },
    viewRating: {
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    mean: {
        fontSize: 16,
        marginRight: 5
    },
    cout: {
        fontSize: 12,
        color: '#8697a5'
    }
});