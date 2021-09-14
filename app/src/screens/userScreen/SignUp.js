import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Button,
} from "react-native";
const { height, width } = Dimensions.get("window");
const Signup = (props) => {
  const { name, setName } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { title, setTitle } = useState("");
  const { department, setDepartment } = useState("");

  const signup = () => {};
  return (
    <View style={styles.parent}>
      <View style={styles.titleButton}>
        <Button
          title="Login"
          onPress={() => props.navigation.navigate("Login")}
        />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onPress={(text) => setName(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onPress={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onPress={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={title}
        onPress={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Department"
        value={department}
        onPress={(text) => setDepartment(text)}
      />
      <View style={styles.signUpView}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Main")}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleButton: {
    width: width - 57,
    flexDirection: "row-reverse",
    bottom: 10,
  },
  parent: {
    top: height / 10,
    marginHorizontal: width / 19,
  },
  signUpButton: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    flex: 2,
    alignSelf: "center",
    right: (width - 57) / 3,
  },
  login: {
    right: 0,
  },
  signUpView: {
    alignSelf: "center",
    height: 51,
    width: 343,
    backgroundColor: "#142A4F",
    borderRadius: 10,
  },
  textInput: {
    width: 343,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    marginHorizontal: width / 25,
    marginBottom: height / 40,
  },
});

export default Signup;
