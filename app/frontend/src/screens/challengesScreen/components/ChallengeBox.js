import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChallengeBox = ({ image, title, description, status, past }) => {
  return (
    // data passed in should contain:
    //image uri, challenge title, description, status
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      ></Image>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {past ? (
          <Text style={styles.status_text}>Completed</Text>
        ) : (
          <Text style={styles.status_text}>
            {status ? 'In Progress' : 'Not Participating'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  status_text: {
    opacity: 0.5,
    marginLeft: 17,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  image: {
    borderRadius: 8,
    width: width / 1.1,
    height: height / 4,
    margin: 17,
  },
  title: {
    fontWeight: '300',
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
    opacity: 0.8,
  },
  titleDescriptionContainer: {
    bottom: height / 100,
  },
});

export default ChallengeBox;
