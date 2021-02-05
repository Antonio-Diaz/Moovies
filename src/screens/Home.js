import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Title } from "react-native-paper";
import { THEMOVIEDB_API_KEY, THEMOVIEDB_LANG } from "../utils/constants";
import CarouselVertical from "../components/CrouselVertical";
import {getTopRatedMoviesApi} from "../api/movies";


export default function Home() {

    const [topRatedMovies, setTopRatedMovies] = useState(null);

    useEffect(() => {
        getTopRatedMoviesApi().then((response) => {
            setTopRatedMovies(response.results);
        });
      }, []);
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            { topRatedMovies && (
                <View style={styles.topRated}>
                    <Title style={styles.topRatedTitle}> Top Rated Movies </Title>
                    <CarouselVertical data={topRatedMovies}/>   
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    topRated: {
        marginVertical: 10,
    },  

    topRatedTitle: {
        marginBottom: 25,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    }
})