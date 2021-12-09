import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../../axios';
const asyncStorage = require('../../../asyncStorage');
const { height, width } = Dimensions.get('window');
const Participant = ({ challengeID }) => {
  const [allParticipants, setAllParticipants] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const id = await asyncStorage.getData('ID');
        const auth = await asyncStorage.getData('Authorization');

        const res = await axios.get(`/challenges/participate/${challengeID}`, {
          headers: { Authorization: auth, id: id },
        });
        setAllParticipants(res.data);
      };
      getData();
      return () => {
        setAllParticipants([]);
      };
    }, [])
  );

  return (
    <>
      {allParticipants.length === 0 ? (
        <View style={styles.defaultTextContainer}>
          <Text style={styles.defaultText}>
            There are currently no participants for this challenge, be the first
            to join the challenge.
          </Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          data={allParticipants}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Avatar.Image
                  size={width * 0.1}
                  source={{
                    uri: 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png',
                  }}
                />
                <View style={{ left: width * 0.03 }}>
                  <Text
                    style={styles.name}
                  >{`${item.first_name} ${item.last_name}`}</Text>
                  <Text style={styles.title}>{item.job_title[0]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.arrow}
                  onPress={() => Linking.openURL(`mailto:${item.email}`)}
                >
                  <Icon
                    style={{ opacity: 0.7 }}
                    size={width * 0.07}
                    name="email-send-outline"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultTextContainer: {
    marginVertical: height / 5,
    marginHorizontal: width / 15,
    alignSelf: 'center',
  },
  defaultText: {
    fontSize: width * 0.03,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  arrow: {
    right: 0,
    alignSelf: 'flex-end',
    position: 'absolute',
    alignSelf: 'center',
  },
  name: { fontSize: width * 0.045 },
  title: { opacity: 0.6, fontSize: width * 0.03 },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    width: width - 75,
    alignSelf: 'center',
    height: height / 11,
    top: 10,
    alignItems: 'center',
  },
});

export default Participant;
