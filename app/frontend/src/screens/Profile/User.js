import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Field from './components/Field';
import axios from '../../axios';

const asyncStorage = require('../../asyncStorage');

const { height, width } = Dimensions.get('window');

const UserProfile = (props) => {
  //userEffect to fetch current user
  const [profilePicture, setProfilePicture] = useState(
    'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'
  );
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  function getAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }

  const getUserInfo = async () => {
    try {
      const id = await asyncStorage.getData('ID');
      const authToken = await asyncStorage.getData('Authorization');
      const res = await axios.get(`/users/${id}`, {
        headers: {
          id: id,
          Authorization: authToken,
        },
      });
      const user = res.data;
      const dob = new Date(user.dob);
      setFullName(user.first_name + ' ' + user.last_name);
      setTitle(user.job_title[0]);
      setDepartment(user.department);
      setEmail(user.email);
      setBirthday(
        `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`
      );

      setAge(getAge(user.dob));
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
      return () => {
        setFullName('');
        setTitle('');
        setDepartment('');
        setEmail('');
      };
    }, [])
  );

  const logout = () => {
    //remove token from async storage
    asyncStorage.removeData('ID');
    asyncStorage.removeData('Authorization');
    props.navigation.navigate('Auth');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.imageView, { top: height / 15 }]}>
        <View style={{}}>
          <Avatar.Image
            style={{
              top: -(height / 15),
              alignSelf: 'center',
              backgroundColor: 'white',
            }}
            size={width / 4}
            source={{
              uri: profilePicture,
            }}
          />
        </View>
        <View style={{ top: -(height / 15) }}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ top: -(height / 15) }}>
          <Field title="Name" text={fullName} />
          <Field title="Age" text={age.toString()} />
          <Field title="Date of Birth" text={birthday} />
          <Field title="Department" text={department} />
          <Field title="Title" text={title} />
          <Field title="Email" text={email} />
        </View>
      </View>

      <TouchableOpacity style={styles.logOutButton} onPress={() => logout()}>
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  fullName: {
    fontSize: width * 0.07,
    fontWeight: '500',
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '500',
    alignSelf: 'center',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(242,242,242,255)',
  },
  logOutButton: {
    textAlign: 'center',
    height: height / 13,
    width: '100%',
    backgroundColor: '#142A4F',
  },
  logOutText: {
    marginVertical: height / 50,
    color: 'white',
    fontWeight: '500',
    fontSize: width * 0.05,
    alignSelf: 'center',
  },
});
export default UserProfile;
