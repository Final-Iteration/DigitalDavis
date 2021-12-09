import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const asyncStorage = require('../../../asyncStorage');

const { width, height } = Dimensions.get('window');

const ChallengeBox = ({ challenge }) => {
  const [id, setId] = useState('');

  useFocusEffect(
    useCallback(() => {
      const getId = async () => {
        const id = await asyncStorage.getData('ID');
        setId(id);
      };
      getId();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: challenge.unsplashurl,
        }}
      ></Image>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.title}>{challenge.name}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        <Text style={styles.status_text}>
          {challenge.participants.includes(id)
            ? new Date(challenge.end_date) < new Date(Date.now())
              ? 'Completed'
              : 'In Progress'
            : 'Not Participating'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  status_text: {
    opacity: 0.5,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: height / 50,
  },
  image: {
    borderRadius: 8,
    width: width / 1.1,
    height: height / 4,
    marginVertical: height / 65,
  },
  title: {
    fontWeight: '300',
    fontSize: width * 0.06,
  },

  description: {
    fontSize: width * 0.035,
    opacity: 0.8,
  },
  titleDescriptionContainer: {
    bottom: height / 100,
  },
});

export default ChallengeBox;
