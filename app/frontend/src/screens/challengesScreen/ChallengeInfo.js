import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const imageSource = require('cd ../../../../assets/yoga.png');

const ChallengeInfo = (props) => {
  // this needs to be changed when we are importing data, should not be set to false
  const [isPress, setIsPress] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        style={styles.image}
        //replace this hard coded image with the image uri's when we get them
        source={imageSource}
      />
      <View style={styles.durationContainer}>
        <Text style={styles.duration}>Duration: 4 Weeks</Text>
        <TouchableOpacity
          style={
            isPress ? styles.participatingButton : styles.notParticipatingButton
          }
          onPress={() => {
            setIsPress(!isPress);
          }}
        >
          <Text style={styles.participate}>Participate</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.mainDescription}>
          Are you new to yoga? You've found the best place to start your yoga
          journey. The benefits of yoga are there for you: You can develop a
          strong, healthy body. You can enjoy a clear, calm mind. You can live
          with a sense of purpose, love, and connection.
        </Text>
        <View style={styles.lineContainer}>
          <View style={styles.drawnLine} />
        </View>
        <Text style={styles.middleHeader}>The Five Key Aspects of Yoga</Text>
        <Text style={styles.middleText}>
          Concentration: You will learn to focus and concentrate on the
          teacher's words and practice mindful breathing. Consistency: Plan to
          take a class 2 to 3 times per week so you will see and feel the
          benefits of your work. Determination: No problem if you fall out of a
          posture. Keep getting back in to build up your will power and stamina.
          You will get better each day. Patience: Notice not only the changes in
          your postures. Confidence and faith in yourself will serve you a
          lifetime! Intensity: Every day is a new chance to try your best. It's
          never to late to begin again.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height / 8,
    flex: 1,
    paddingBottom: height / 9,
  },
  image: {
    borderRadius: 8,
    width: width / 1.05,
    height: height / 3,
    margin: width / 40,
  },
  mainDescription: {
    fontSize: 18,
    fontWeight: '300',
    marginHorizontal: width / 30,
  },
  drawnLine: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: height / 80,
    marginBottom: height / 80,
  },
  lineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width / 20,
  },
  middleHeader: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center',
  },
  middleText: {
    fontSize: 18,
    fontWeight: '300',
    marginHorizontal: width / 30,
  },
  durationContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: width / 30,
  },
  duration: {
    fontSize: 18,
    fontStyle: 'italic',
    top: height / 150,
  },
  notParticipatingButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    width: width / 4,
  },
  participatingButton: {
    backgroundColor: '#90ee90',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    width: width / 4,
  },
  participate: {
    fontWeight: '600',
  },
});

export default ChallengeInfo;
