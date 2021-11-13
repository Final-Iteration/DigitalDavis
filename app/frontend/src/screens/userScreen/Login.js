import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "../../axios";

const asyncStorage = require("../../asyncStorage");

const { width, height } = Dimensions.get("window");
const imageSource = require("../../../assets/blurredDavis.jpg");

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });

      await asyncStorage.storeData("ID", res.data.user.id);
      await asyncStorage.storeData(
        "Authorization",
        "Bearer " + res.data.tokens.access.token
      );
      console.log(props.navigation);
      props.navigation.navigate("Main");
      //props.navigation.navigate("Main");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ImageBackground style={styles.imageStyle} source={imageSource}>
      {/* this will be removed! when we have our login API set up*/}
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
          <TouchableOpacity onPress={() => blankInputCheck()}>
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
        <View style={styles.bottomHeader}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.forgotText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="SKIP BUTTON TO MAIN APP"
          color="white"
          onPress={() => props.navigation.navigate("Main")}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  viewMargins: {
    marginTop: height / 5,
  },
  emailPassStyle: {
    height: height / 17,
    borderRadius: 5,
    backgroundColor: "#F6F6F6",
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
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: height / 50,
  },
  signUpButtonGood: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    marginVertical: height / 70,
  },
  signUpButtonBad: {
    color: "grey",
    alignSelf: "center",
    fontSize: 20,
    marginVertical: height / 70,
  },
  signInView: {
    alignSelf: "center",
    height: height / 17,
    width: width / 1.24,
    backgroundColor: "#142A4F",
    borderRadius: 10,
  },
  bottomHeader: {
    flexDirection: "row",
    alignSelf: "center",
  },
  forgotText: {
    color: "white",
    fontSize: 20,
    marginTop: height / 70,
    marginHorizontal: width / 40,
  },
});

export default Login;
