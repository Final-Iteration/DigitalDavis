import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ChallengeBox = () => {
  return (
    // data passed in should contain:
    //image uri, challenge title, description, status
    <View style={styles.container}>
      <Text style={styles.name}>Challenge Title</Text>
      <Image style={styles.image} source= {require('./img/check.png')}></Image>
      <View style={styles.button_containter}>
        <TouchableOpacity style={styles.button}>
          <Text>Particpate</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Sample Description</Text>
      <Text status={styles.status}>In Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  button_containter: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 8,
    width: 100,
    left: windowWidth / 3,
  },
  description: {},
  status: {
    color: "grey",
  },
});

export default ChallengeBox;
