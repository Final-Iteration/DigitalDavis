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

  return (
    <View style={styles.viewContainer}>

      <View style = {styles.headerButtonsContainer}>
        <TouchableOpacity>
          <Text style = {styles.headerText}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style = {styles.headerText}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.longLine} />
      <View style={styles.activeLine} />
      {/* <View style={styles.pastLine} /> */}
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChallengeInformation')}>
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
    paddingBottom: height / 5.5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
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
  headerButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height / 70
  },
  headerText:{
    fontSize: 26,
    fontWeight: '300'
  },
  longLine:{
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    opacity: 0.05,
    marginTop: height / 80
  },
  activeLine: {
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: width / 2.5,
    marginHorizontal: width / 15,
    bottom: height / 400
  },
  pastLine:{
    alignSelf: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    marginRight: width / 25,
    width: width / 2.5,
    bottom: height / 200
  }
});

export default CurrentChallenges;
