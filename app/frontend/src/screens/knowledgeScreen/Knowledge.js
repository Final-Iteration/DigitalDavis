import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
const Knowledge = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.gif}
          source={require('../../../assets/output-onlinegiftools.gif')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: height / 5,
  },
  gif: {
    alignSelf: 'center',
    height: '85%',
    width: '100%',
  },
});

export default Knowledge;
