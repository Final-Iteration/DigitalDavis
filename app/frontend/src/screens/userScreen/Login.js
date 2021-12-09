import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from '../../axios';
import Loading from '../../sharedComponent/Loading';
import { Asset } from 'expo-asset';
const asyncStorage = require('../../asyncStorage');

const { width, height } = Dimensions.get('window');
const imageSource = require('../../../assets/blurredDavis.jpg');

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    componentWillMount();
  }, []);

  const componentWillMount = async () => {
    console.log('mounting');
    await Asset.loadAsync([require('../../../assets/blurredDavis.jpg')]);
    setLoading(false);
  };

  const blankInputCheck = () => {
    if (email.length === 0 || password.length === 0) {
      return;
    } else if (validateEmail(email)) {
      setUserLogin();
    }
  };
  // a function that validates an email to the format of name@domain.com
  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }
  // const apiCall = function --- function will call our database to validate user email and password
  const setUserLogin = async () => {
    try {
      const res = await axios.post('/auth/login', {
        email: email,
        password: password,
      });

      await asyncStorage.storeData('ID', res.data.user.id);
      await asyncStorage.storeData(
        'Authorization',
        'Bearer ' + res.data.tokens.access.token
      );
      props.navigation.navigate('Main');
      //props.navigation.navigate("Main");
    } catch (error) {
      if (error.response.status === 500) {
        setOtherError('Something went wrong, try again later');
      } else {
        setOtherError(error.response.data.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ImageBackground style={styles.imageStyle} source={imageSource}>
          <View style={styles.viewMargins}>
            <Text style={styles.login}>Welcome</Text>
            <TextInput
              style={styles.emailPassStyle}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.emailPassStyle}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.signInView}>
              <TouchableOpacity onPress={() => setUserLogin()}>
                <Text
                  style={
                    email != 0 && password != 0
                      ? styles.signUpButtonGood
                      : styles.signUpButtonBad
                  }
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            {error.length != 0 ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <View style={styles.bottomHeader}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ResetPassword')}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Register')}
              >
                <Text style={styles.forgotText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: width * 0.03,
    marginVertical: 5,
  },
  viewMargins: {
    marginTop: height / 5,
  },
  emailPassStyle: {
    height: height / 17,
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    marginHorizontal: width / 10,
    marginBottom: height / 40,
    fontSize: 18,
    padding: height / 70,
  },
  imageStyle: {
    height: height,
    width: width,
  },
  login: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    paddingBottom: height / 50,
  },
  signUpButtonGood: {
    color: 'white',
    alignSelf: 'center',
    fontSize: width * 0.05,
    margin: height / 75,
  },
  signUpButtonBad: {
    color: 'grey',
    alignSelf: 'center',
    fontSize: width * 0.05,
    margin: height / 75,
  },
  signInView: {
    alignSelf: 'center',
    height: height / 17,
    width: width / 1.24,
    backgroundColor: '#142A4F',
    borderRadius: 10,
  },
  bottomHeader: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forgotText: {
    color: 'white',
    fontSize: 20,
    marginTop: height / 70,
    marginHorizontal: width / 40,
  },
});

export default Login;
