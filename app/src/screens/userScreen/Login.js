import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button, TextInput, Dimensions, Image } from "react-native";

const {width, height} = Dimensions.get('window');

const Login = (props) => {

  return (
    <View>
      <StatusBar style="dark"/>
      {/* this will be removed! when we have our login API set up*/}
      <Text style={{ alignSelf: "center" }}>Log in screen</Text>

      <Button
        title="Enter main flow"
        onPress={() => props.navigation.navigate("Main")}
      />
      <Button
        title="Sign up"
        onPress={() => props.navigation.navigate("Register")}
      />
      <TextInput style = {styles.emailPassStyle}
        autoCapitalize = "none"
        autoCorrect = {false}
        placeholder = "Email"
      />
      <TextInput style = {styles.emailPassStyle}
        autoCapitalize = "none"
        autoCorrect = {false}
        placeholder = "Password"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  emailPassStyle: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: width / 10,
    marginBottom: height / 40
  }
});

export default Login;
