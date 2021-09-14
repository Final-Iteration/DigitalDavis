import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button, TextInput, Dimensions, Image, ImageBackground } from "react-native";

const {width, height} = Dimensions.get('window');
const imageSource = require('../../../assets/blurredDavis.jpg');

const Login = (props) => {

  return (
      <ImageBackground style = {styles.imageStyle}
        source = {imageSource}> 
        {/* this will be removed! when we have our login API set up*/}
        <View style = {styles.viewMargins}>
          <Text 
            style={styles.login}>Log in screen
          </Text>
          <Button
            title="Enter main flow"
            color = "white"
            onPress={() => props.navigation.navigate("Main")}
          />
          <Button 
            title="Sign up"
            color = "white"
            onPress={() => props.navigation.navigate("Register")}
          />
          <TextInput 
            style = {styles.emailPassStyle}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholder = "Email"
          />
          <TextInput 
            style = {styles.emailPassStyle}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholder = "Password"
          />
        </View>
      </ImageBackground>
  );
};
const styles = StyleSheet.create({
  viewMargins: {
    marginTop: height / 5
  },
  emailPassStyle: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    marginHorizontal: width / 10,
    marginBottom: height / 40,
    fontSize:18,
    padding: height / 70
  },
  imageStyle:{
    height: height,
    width: width
  },
  login:{
    alignSelf: 'center',
    color: 'white'
  }
});

export default Login;
