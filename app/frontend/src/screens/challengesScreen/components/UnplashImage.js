import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
const UnplashImage = ({ url, setPhoto, currentlySelected }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        setPhoto(url);
      }}
    >
      <Image style={styles.image} source={{ uri: url }} />
      {url === currentlySelected ? (
        <Icon style={styles.chosen} name="check-circle" size={25} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chosen: {
    margin: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    alignSelf: 'center',
    margin: 7,
    width: width / 2.5,
    height: height - 700,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
export default UnplashImage;
