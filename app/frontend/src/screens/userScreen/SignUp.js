import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
const baseURL =
  'http://2bf0-2601-204-e780-d390-b00f-3872-a6cf-3210.ngrok.io/api/users';

const { height, width } = Dimensions.get('window');
const imageSource = require('../../../assets/blurredDavis.jpg');
const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [fillError, setFillError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);

  const signup = () => {
    // const [signupInformation, setUserSignupInformation] = useState([]);

    if (
      name.length === 0 ||
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
        date.toString();
        try {
          
          const res = await axios.post(baseURL, {
            first_name: name,
            last_name: name,
            email: email,
            dob: date.toString(),
            department: department,
            job_title: title,
          });
          
          /** 
           * @todo get token for user 
           */
          console.log(res.data);
          props.navigation.navigate('Main');
        } catch (error) {          
          console.log(error.message);
        }
      }

      setUserSignup();
      // Check token 
      
    }
  };
  const onChange = (event, value) => {
    if (value) {
      setDate(value);
    }
    setOpen(false);
  };
  const getDate = () => {
    let d = date.toString().split(' ');
    return `${d[1]} ${d[2]} ${d[3]}`;
  };
  return (
    <ImageBackground style={styles.imageStyle} source={imageSource}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={100}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
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
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Department"
          value={department}
          onChangeText={(text) => setDepartment(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={() => {
            setOpen(!open);
          }}
          style={styles.dateInput}
        >
          <Text style={styles.DOBText}>
            {`Date of Birth: ${Platform.OS === 'ios' ? '' : getDate()}`}
          </Text>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              style={styles.datePickerStyle}
              display="default"
              mode="date" //The enum of date, datetime and time
              value={date} //initial date from state
              format="MM-DD-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          ) : (
            open && (
              <DateTimePicker
                style={styles.datePickerStyle}
                mode={'date'} //The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                value={date} //initial date from state
                format="MM-DD-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onChange={onChange}
              />
            )
          )}
        </TouchableOpacity>
        {fillError ? (
          <Text style={styles.errorText}>Fill out all info</Text>
        ) : null}
        {passwordError ? (
          <Text style={styles.errorText}>Password does not match</Text>
        ) : null}
        <View style={styles.signUpView}>
          <TouchableOpacity onPress={() => signup()}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    height: 55,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    marginHorizontal: width / 15,
    marginBottom: height / 40,
    padding: height / 70,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  DOBText: {
    fontSize: 18,
    top: 2,
    color: '#A9A9A9',
  },
  datePickerStyle: {
    height: 45,
    width: 120,
    right: 5,
    top: 5,
    position: 'absolute',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 15,
    bottom: 5,
  },
  titleButton: {
    alignSelf: 'center',
    width: 343,
    flexDirection: 'row',
    bottom: 20,
  },

  signUpButton: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  login: {
    right: 0,
  },
  signUpView: {
    alignSelf: 'center',
    height: 51,
    width: 343,
    backgroundColor: '#142A4F',
    borderRadius: 10,
  },
  textInput: {
    height: 55,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    marginHorizontal: width / 15,
    marginBottom: height / 40,
    padding: height / 70,
    fontSize: 18,
  },
  imageStyle: {
    height: height,
    width: width,
  },
});

export default Signup;
