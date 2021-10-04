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
  const [active, setActive] = useState(true)
  const [recent, setRecent] = useState(true)
  const [past, setPast] = useState(false)

  return (
    <View style={styles.viewContainer}>

      <View style = {styles.backgroundPillContainer}>
        <TouchableOpacity style = {recent ? styles.activePill : null} onPress = {() => {setRecent(true); setActive(true)}}>
          <Text style = {active ? styles.inUseText : styles.notInUseText}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {recent ? null : styles.pastPill} onPress = {() => {setRecent(false); setActive(false);}}>
          <Text style = {active ? styles.notInUseText : styles.inUseText} >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      {recent ? 
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChallengeInformation')}>
          <ChallengeBox current = {true}/>
        </TouchableOpacity>
        <ChallengeBox current = {true}/>
        <ChallengeBox current = {true}/>
      </ScrollView>
      :
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChallengeInformation')}>
          <ChallengeBox current = {false}/>
        </TouchableOpacity>
        <ChallengeBox current = {false}/>
        <ChallengeBox current = {false}/>
      </ScrollView>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingBottom: height / 5,
  },
  backgroundPillContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: height / 70,
    height: height / 16,
    borderRadius: 30,
    backgroundColor: '#f2f2f2', 
    marginHorizontal: width / 5.5,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 1,
    marginBottom: 10
  },
  notInUseText:{
    fontSize: 24,
    fontWeight: '200',
    marginVertical: 11,
  },
  inUseText:{
    fontSize: 24,
    color: '#142A4F',
    marginVertical: 11,
  },
  activePill: {
    height: height / 16,
    width: width / 3.1,
    borderRadius: 30,
    backgroundColor: 'white',
    right: width / 16,
    alignItems: 'center'
  },
  pastPill: {
    height: height / 16,
    width: width / 3.1566,
    borderRadius: 30,
    backgroundColor: 'white',
    left: width / 20,
    alignItems: 'center'
  },
});

export default CurrentChallenges;
