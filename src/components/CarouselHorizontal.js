import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import {THEMOVIEDB_BASE_PATH_IMG, CAROUSEL_IMG_SIZE} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDHT = Math.round(width * 0.3);

export default function CarouselHorizontal(props) {
  const {data, navigation} = props;
  return (
    <Carousel
      layout={'default'}
      sliderWidth={width}
      itemWidth={ITEM_WIDHT}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      firstItem={1}
      inactiveSlideScale={0.8}
    />
  );
}

function RenderItem(props) {
  const {data, navigation} = props;
  const {id, title, poster_path} = data.item;
  const posterUrl = `${THEMOVIEDB_BASE_PATH_IMG}${CAROUSEL_IMG_SIZE}${poster_path}`;

  const onNavigation = () => {
    navigation.navigate('movie', {id: id});
  };
  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={
            poster_path
              ? {
                  uri: posterUrl,
                  priority: FastImage.priority.normal,
                }
              : noImage
          }
        />
        <Title numberOfLines={1} style={styles.title}>
          {' '}
          {title}
        </Title>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      width: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  image: {
    width: '85%',
    height: 170,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 14,
  },
});
