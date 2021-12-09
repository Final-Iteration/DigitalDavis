import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Asset } from 'expo-asset';
import axios from '../../axios';
import Loading from '../../sharedComponent/Loading';

const imageSource = require('../../../assets/blurredDavis.jpg');
const asyncStorage = require('../../asyncStorage');
const { height, width } = Dimensions.get('window');

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [fillError, setFillError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);
  const [otherError, setOtherError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    componentWillMount();
  }, []);
  const signup = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      title.length === 0 ||
      department.length === 0
    ) {
      setPasswordError(false);
      setFillError(true);
    } else if (confirmPassword !== password) {
      setFillError(false);
      setPasswordError(true);
    } else {
      //post request to database
      const setUserSignup = async () => {
        try {
          const res = await axios.post('/auth/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            dob: date,
            department: department,
            job_title: title,
            password: password,
          });
          await asyncStorage.storeData('ID', res.data.user.id);
          await asyncStorage.storeData(
            'Authorization',
            'Bearer ' + res.data.tokens.access.token
          );
          props.navigation.navigate('Main');
        } catch (error) {
          if (error.response.status === 500) {
            setOtherError('Something went wrong, try again later');
          } else {
            setOtherError(error.response.data.message);
          }
        }
      };
      setUserSignup();
    }
  };

  const componentWillMount = async () => {
    console.log('mouting');
    await Asset.loadAsync([require('../../../assets/blurredDavis.jpg')]);
    setLoading(false);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setOpen(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ImageBackground style={styles.imageStyle} source={imageSource}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
          >
            <View style={styles.container}>
              <TextInput
                maxLength={30}
                autoCorrect={false}
                style={styles.textInput}
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              <TextInput
                maxLength={30}
                autoCorrect={false}
                style={styles.textInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
              <TextInput
                style={styles.textInput}
                maxLength={50}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Department"
                value={department}
                onChangeText={(text) => setDepartment(text)}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
                }}
                style={styles.dateInput}
              >
                <Text style={styles.DOBText}>{`Date of Birth: `}</Text>
                <DateTimePicker
                  style={styles.datePickerStyle}
                  display="default"
                  mode="date" //The enum of date, datetime and time
                  value={date} //initial date from state
                  format="MM-DD-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onChange={onChange}
                />
              </TouchableOpacity>
              {fillError ? (
                <Text style={styles.errorText}>Fill out all info</Text>
              ) : null}
              {passwordError ? (
                <Text style={styles.errorText}>Password does not match</Text>
              ) : null}
              {otherError.length != 0 ? (
                <Text style={styles.errorText}>{otherError}</Text>
              ) : null}
              <View style={styles.signUpView}>
                <TouchableOpacity onPress={() => signup()}>
                  <Text style={styles.signUpButton}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: width / 15,
    marginVertical: height / 25,
  },
  dateInput: {
    height: height / 16,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    marginBottom: height / 40,
    padding: height / 70,
    fontSize: width * 0.04,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  DOBText: {
    fontSize: width * 0.04,
    top: 2,
    color: '#A9A9A9',
  },
  datePickerStyle: {
    height: height / 18,
    width: 120,
    right: 3,
    top: 3,
    position: 'absolute',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: width * 0.03,
    bottom: 5,
  },
  signUpButton: {
    color: 'white',
    alignSelf: 'center',
    fontSize: width * 0.05,
    margin: 10,
  },
  login: {
    right: 0,
  },
  signUpView: {
    alignSelf: 'center',
    height: height / 19,
    width: '85%',
    backgroundColor: '#142A4F',
    borderRadius: 10,
  },
  textInput: {
    height: height / 16,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    marginBottom: height / 40,
    padding: height / 70,
    fontSize: width * 0.04,
  },
  imageStyle: {
    height: height,
    width: width,
  },
});

export default Signup;
