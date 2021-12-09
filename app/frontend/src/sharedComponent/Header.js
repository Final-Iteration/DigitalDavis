import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Appbar, Avatar } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
const barHeight = 37;
const CustomHeader = ({
  navigation,
  title,
  profile,
  setting,
  signup,
  challenge,
  challengeInfo,
}) => {
  //get user profile
  useEffect(() => {});
  if (challengeInfo) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: '#fff',
          elevation: 0,
        }}
      >
        <Appbar.Action
          animated={false}
          icon={() => (
            <Ionicon
              name="ios-chevron-back-outline"
              size={width * 0.05}
              style={{ color: '#2F80ED' }}
            />
          )}
          onPress={() => {
            navigation.navigate('Challenge');
          }}
        />
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
      </Appbar.Header>
    );
  } else if (signup) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: '#1d3679',
          elevation: -1,
        }}
      >
        <Appbar.Action
          animated={false}
          icon={() => (
            <Ionicon
              name="ios-chevron-back-outline"
              size={width * 0.05}
              style={{ color: '#2F80ED' }}
            />
          )}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
      </Appbar.Header>
    );
  } else if (profile || setting) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: '#142A4F',
          elevation: 0,
        }}
      >
        {setting ? (
          <Appbar.Action
            animated={false}
            style={styles.leftAction}
            icon={() => (
              <Avatar.Image
                style={{ alignSelf: 'center' }}
                size={width * 0.07}
                source={{
                  uri: 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png',
                }}
              />
            )}
            onPress={() => navigation.navigate('User')}
          />
        ) : (
          <Appbar.Action
            style={styles.leftAction}
            animated={false}
            icon={() => (
              <Icon
                name="setting"
                size={width * 0.07}
                style={{ color: 'white' }}
              />
            )}
            onPress={() => navigation.navigate('Setting')}
          />
        )}
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />

        <Appbar.Action
          style={styles.rightAction}
          animated={false}
          icon={() => (
            <Feather name="chevron-down" size={width * 0.07} color="white" />
          )}
          onPress={() => navigation.goBack(null)}
        />
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: '#fff',
          elevation: 0,
        }}
      >
        <Appbar.Action
          style={styles.leftAction}
          animated={false}
          icon={() => (
            <Avatar.Image
              size={width * 0.08}
              source={{
                uri: 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png',
              }}
            />
          )}
          onPress={() => navigation.navigate('User')}
        />

        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <Appbar.Action
          style={styles.rightAction}
          animated={false}
          icon={() => {
            if (challenge) {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateChallenge')}
                  style={styles.plusButton}
                >
                  <AntDesign name="plus" size={width * 0.06} color="black" />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          }}
        />
      </Appbar.Header>
    );
  }
};
const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.06,
    fontWeight: '300',
  },
  leftAction: {
    left: width / 28,
  },
  rightAction: {
    right: width / 28,
  },
});

export default CustomHeader;
