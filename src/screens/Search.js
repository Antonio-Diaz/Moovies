import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { size, map } from 'lodash';
import { searchMoviesApi } from '../api/movies';
import FastImage from 'react-native-fast-image';
import noImage from '../assets/default-img.png';
import { THEMOVIEDB_BASE_PATH_IMG, CAROUSEL_IMG_SIZE } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function Search(props) {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (size(search) > 2) {
      searchMoviesApi(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Search you movie!"
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const { movie, navigation } = props;
  const { id, poster_path, title } = movie;

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
                ? {
                    uri: `${THEMOVIEDB_BASE_PATH_IMG}${CAROUSEL_IMG_SIZE}${poster_path}`,
                    priority: FastImage.priority.normal,
                  }
                : noImage
                
            }
          />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});