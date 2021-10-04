import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChallengeBox = ({current}) => {
  return (
    // data passed in should contain:
    //image uri, challenge title, description, status
    <View style={styles.container}>
      <Image
        style={styles.image}
        // replace this hard coded image with the image uri's when we get them
        source={current ? require('cd ../../../../assets/yoga.png') : require('cd ../../../../assets/blurredDavis.jpg')}
      ></Image>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.title}>30 Days of Yoga!</Text>
        {/* <TouchableOpacity style={styles.button}>
          <Text>Participate</Text>
        </TouchableOpacity> */}
        <Text style={styles.description}>
          The best place to start your yoga journey.
        </Text>
        {/* <Text style={styles.status_text}>In Progress</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  image: {
    borderRadius: 8,
    width: width / 1.1,
    height: height / 3,
    margin: 17,
    top: height / 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 17,
  },
  // button: {
  //   borderRadius: 4,
  //   alignItems: "center",
  //   backgroundColor: "#DDDDDD",
  //   padding: 8,
  //   margin: 2,
  //   width: 100,
  //   left: height / 5.2,
  //   color: "red",
  // },
  description: {
    fontSize: 16,
    marginLeft: 17,
  },
  // status_text: {
  //   color: "grey",
  //   fontSize: 13,
  //   marginLeft: 17,
  // },
  titleDescriptionContainer: {
    bottom: height / 100,
  },
});

export default ChallengeBox;
