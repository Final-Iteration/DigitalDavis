import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
// import ParticpateButton from "./participateButton";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChallengeBox = () => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [participateText, setparticipateText] = useState('Participate');
  let Image_Http_URL = {
    uri: 'data:image/jpeg;base64,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',
  };

  //setButtonState()
  //To implment: Will return JSON containing the challenge info if the user clicks participate & sets participate to true
  //Changes text and color of the participate button
  const setButtonState = () => {
    if (buttonPressed) {
      setButtonPressed(false);
      setparticipateText('Participate');
    } else {
      setButtonPressed(true);
      setparticipateText('Particpating');
    }
  };

  return (
    // data passed in should contain:
    //image uri, challenge title, description, status
    <View style={styles.container}>
      <Image
        style={styles.image}
        // replace this hard coded image with the image uri's when we get them
        source={Image_Http_URL}
      ></Image>
      <View style={styles.title_container}>
        <Text style={styles.title}>Challenge Title</Text>
        <TouchableOpacity
          onPress={() => setButtonState()}
          style={styles.touchable}
        >
          <View
            style={
              buttonPressed
                ? styles.buttonParticipating
                : styles.buttonParticipate
            }
          >
            <Text style={styles.ParticipateText}>{participateText}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Sample Description</Text>
      <Text style={styles.status_text}>In Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
  },
  image: {
    borderRadius: 8,
    width: windowWidth / 1.05,
    height: windowHeight / 4.5,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 2,
    marginLeft: 6,
  },
  touchable: {
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    margin: 2,
    width: 120,
    left: windowHeight / 6,
  },
  buttonParticipate: {
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: 120,
    padding: 8,
    margin: 2,
  },
  buttonParticipating: {
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#66ff99',
    padding: 8,
    margin: 2,
    width: 120,
  },
  ParticipateText: {
    fontSize: 16,
    color: 'grey',
  },
  description: {
    fontSize: 14,
  },
  status_text: {
    color: 'grey',
    fontSize: 13,
  },
});

export default ChallengeBox;
