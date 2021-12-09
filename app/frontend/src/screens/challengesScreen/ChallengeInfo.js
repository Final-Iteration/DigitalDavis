import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import JoinBanner from './components/banners/JoinBanner';
import UnjoinedBanner from './components/banners/UnjoinedBanner';
import Modal from 'react-native-modal';
import Participant from './components/Participant';
import axios from '../../axios';
import DeleteChallengeBanner from './components/banners/DeleteChallengeBanner';
const asyncStorage = require('../../asyncStorage');

const { width, height } = Dimensions.get('window');

const ChallengeInfo = (props) => {
  /**
   * @todo: this needs to be changed when we are importing data, should not be set to false
   */
  const [participationStatus, setStatus] = useState(false);
  const [participantModal, setParticipantModal] = useState(false);
  const [antButton, setAntButton] = useState(false);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipants] = useState([]);
  const [deleteFunc, setDeleteFunc] = useState(false);
  const [token, setToken] = useState('');
  const [uID, setUID] = useState('');
  const [c, setC] = useState();
  const [cName, setCName] = useState('');
  const [cDescription, setCDescription] = useState('');
  const [cNumOfParticipants, setCNumOfParticipants] = useState(0);
  const [cImage, setCImage] = useState('');

  const challengeID = props.route.params.challenge;

  const getChallengeInfo = async () => {
    try {
      const id = await asyncStorage.getData('ID');
      const t = await asyncStorage.getData('Authorization');
      setUID(id);
      setToken(t);
      const res = await axios.get(`/challenges/${challengeID}`, {
        headers: { Authorization: t, id: id },
      });
      const challenge = res.data.challengeInfo;
      setC(challenge);
      setCImage(challenge.unsplashurl);
      setCName(challenge.name);
      setCDescription(challenge.description);
      setCNumOfParticipants(challenge.participants.length);
      setStatus(challenge.participants.includes(id));
      setLocation(challenge.location);
      setParticipants(challenge.participants);
      let date = challenge.start_date.substring(0, 10).split('-');
      setStartDate(`Start: ${date[1]}-${date[2]}-${date[0].substring(2)}`);
      date = challenge.end_date.substring(0, 10).split('-');
      setEndDate(`End: ${date[1]}-${date[2]}-${date[0].substring(2)}`);

      if (id === challenge.creator) {
        setDeleteFunc(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getChallengeInfo();
      return () => {};
    }, [c])
  );

  const antButtonPressed = () => {
    setTimeout(() => {
      setAntButton(false);
      setParticipantModal(!participantModal);
    }, 250);
  };
  const addUserToChallenge = async () => {
    try {
      await axios.put(
        `/challenges/participate/${challengeID}`,
        {},
        {
          headers: {
            id: uID,
            Authorization: token,
          },
        }
      );
      setStatus(!participationStatus);
      showMsg();
    } catch (error) {
      console.log(error);
    }
  };
  const removeUserFromChallenge = async () => {
    try {
      await axios.put(
        `/challenges/unparticipate/${challengeID}`,
        {},
        {
          headers: {
            id: uID,
            Authorization: token,
          },
        }
      );
      setStatus(!participationStatus);
      showMsg();
    } catch (error) {
      console.log(error);
    }
  };
  const showMsg = () => {
    showMessage({
      icon: 'success',
      position: 'top',
      message: null,
      type: participationStatus ? 'warning' : 'success',
      renderFlashMessageIcon: participationStatus ? UnjoinedBanner : JoinBanner,
      style: { borderRadius: 15, top: 35, height: 50 },
      statusBarHeight: 0,
      floating: true,
    });
  };
  const deleteChallenge = async () => {
    try {
      const id = await asyncStorage.getData('ID');
      const authToken = await asyncStorage.getData('Authorization');
      await axios.delete(`/challenges/${challengeID}`, {
        headers: {
          id: id,
          Authorization: authToken,
        },
      });
      showMessage({
        icon: 'success',
        position: 'top',
        message: null,
        type: 'success',
        renderFlashMessageIcon: DeleteChallengeBanner,
        style: { borderRadius: 15, top: 35, height: 50 },
        statusBarHeight: 0,
        floating: true,
      });
      props.navigation.navigate('Challenge');
    } catch (err) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: cImage,
            }}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.titleAndAttendeesButton}>
            <Text style={[styles.title, { width: '65%' }]}>{cName}</Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                antButton
                  ? { backgroundColor: '#142A4F' }
                  : { backgroundColor: 'white' },
              ]}
              onPress={() => {
                setAntButton(true);
                antButtonPressed();
              }}
            >
              <View style={[styles.iconText, { margin: 5 }]}>
                <Icon
                  name="people-outline"
                  size={width * 0.05}
                  style={antButton ? { color: 'white' } : { color: 'blue' }}
                />
                <Text
                  style={[
                    {
                      fontSize: width * 0.032,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    },
                    antButton ? { color: 'white' } : { color: 'black' },
                  ]}
                >
                  {`${cNumOfParticipants} Attendees`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.locationTime}>
            <View style={styles.iconText}>
              <Icon
                name="ios-location-outline"
                size={width * 0.04}
                style={{ color: 'blue' }}
              />
              <View style={{ width: width / 2.5 }}>
                <Text style={styles.dateText}>{location}</Text>
              </View>
            </View>
            <View style={styles.iconText}>
              <Icon
                name="calendar-outline"
                size={width * 0.04}
                style={{ color: 'blue' }}
              />
              <View>
                <Text style={[styles.dateText, { alignSelf: 'flex-end' }]}>
                  {startDate}
                </Text>
                <Text style={[styles.dateText, { alignSelf: 'flex-end' }]}>
                  {endDate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.aboutDelete}>
            <Text style={styles.about}>About</Text>
            {deleteFunc ? (
              <TouchableOpacity
                style={styles.del}
                onPress={() => deleteChallenge()}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.mainDescription}>{cDescription}</Text>
          <TouchableOpacity
            disabled={props.route.params.disableButton}
            style={[
              styles.participatingButton,
              {
                backgroundColor: props.route.params.disableButton
                  ? '#EBEBE4'
                  : participationStatus
                  ? '#90ee90'
                  : '#DDDDDD',
              },
            ]}
            onPress={() => {
              if (participationStatus == false) {
                addUserToChallenge();
              } else {
                removeUserFromChallenge();
              }
            }}
          >
            <Text style={styles.participate}>
              {participationStatus ? 'Participating' : 'Participate'}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={participantModal}
          onBackdropPress={() => setParticipantModal(!participantModal)}
        >
          <ScrollView
            style={styles.modalView}
            showsVerticalScrollIndicator={false}
          >
            <Participant challengeID={challengeID} />
          </ScrollView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteText: {
    fontSize: width * 0.032,
    fontWeight: '600',
    alignSelf: 'center',
    margin: 5,
    color: 'red',
    opacity: 0.8,
  },
  del: {
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: 'red',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  aboutDelete: {
    marginTop: height / 50,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginHorizontal: width / 27,
  },
  titleAndAttendeesButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height / 50,
  },
  dateText: {
    fontSize: width * 0.035,
    fontWeight: '400',
    alignSelf: 'flex-start',
    left: 3,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: width * 0.075,
  },
  modalView: {
    marginVertical: height / 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconText: {
    flexDirection: 'row',
  },
  locationTime: {
    marginTop: height / 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: width - 7,
    height: width - 7,
    alignSelf: 'center',
    borderRadius: 20,
  },
  mainDescription: {
    fontSize: width * 0.04,
    fontWeight: '300',
    marginTop: height / 50,
  },
  participatingButton: {
    bottom: height / 100,
    marginTop: height / 50,
    borderRadius: 8,
    width: width - 30,
    alignSelf: 'center',
  },
  about: {
    fontWeight: '300',
    fontSize: width * 0.06,
  },
  participate: {
    fontWeight: '500',
    margin: 15,
    alignSelf: 'center',
  },
});

export default ChallengeInfo;
