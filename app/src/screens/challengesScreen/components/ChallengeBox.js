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
        <Text style={styles.name}>Challenge Title</Text>
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
    alignItems: "center",
  },
  title_container: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: windowWidth,
    borderWidth: 2,
  },
  image: {
    width: windowWidth,
    height: windowHeight / 4.5,
    borderRadius: 4,
    marginBottom: 5,
    margin: 10,
    padding: 10,
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
