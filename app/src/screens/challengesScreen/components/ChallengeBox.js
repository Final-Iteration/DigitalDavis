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
      <Image
        style={styles.image}
        // replace this hard coded image with the image uri's when we get them
        source={require("cd ../../../../assets/yoga.png")}
      ></Image>
      <View style={styles.title_container}>
        <Text style={styles.title}>Challenge Title</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Particpate</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Sample Description</Text>
      <Text style={styles.status_text}>In Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title_container: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
  },
  image: {
    borderRadius: 8,
    width: windowWidth / 1.05,
    height: windowHeight / 4.5,
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 2,
    marginLeft: 6,
  },
  button: {
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 8,
    margin: 2,
    width: 100,
    left: windowHeight / 5.2,
  },
  description: {
    fontSize: 14,
  },
  status_text: {
    color: "grey",
    fontSize: 13,
  },
});

export default ChallengeBox;
