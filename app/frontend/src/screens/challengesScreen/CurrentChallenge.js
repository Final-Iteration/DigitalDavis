import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ChallengeBox from './components/ChallengeBox';
// import SwipeButton from "./components/SwipeButton";

const { width, height } = Dimensions.get('window');

const CurrentChallenges = (props) => {
  //Toggles the active and recent challenges
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value) => setToggleState(value);

  // useEffect(() => {
  //   if (toggleState) {
  //     // console.log("Toggle is true. Go to on Recent Challenges Screen");
  //     props.navigation.navigate("SearchedChallenge");
  //   } else {
  //     // console.log("Toggle is FALSE.Stay Active Challenges Screen");
  //   }
  // }, [toggleState]);

  return (
    <View style={styles.viewContainer}>
      {/* This Button is no longer needed as its done by the swipe button */}
      {/* <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      /> */}
      {/* <SwipeButton onToggle={handleToggle} /> */}

      <ScrollView>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChallengeInformation')}
        >
          <ChallengeBox />
        </TouchableOpacity>
        <ChallengeBox />
        <ChallengeBox />
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => props.navigation.navigate('CreateChallenge')}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingBottom: height / 9,
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginLeft: width / 3.5,
  },
  createButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    padding: 6,
  },
  createButtonText: {
    fontWeight: '600',
  },
});

export default CurrentChallenges;
