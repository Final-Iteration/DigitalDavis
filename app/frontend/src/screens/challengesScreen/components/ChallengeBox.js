import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ChallengeBox = ({ image, title, description, status, past }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      ></Image>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {past ? (
          <Text style={styles.status_text}>Completed</Text>
        ) : (
          <Text style={styles.status_text}>
            {status ? "In Progress" : "Not Participating"}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  status_text: {
    opacity: 0.5,
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: height / 50,
  },
  image: {
    borderRadius: 8,
    width: width / 1.1,
    height: height / 4,
    marginVertical: height / 65,
  },
  title: {
    fontWeight: "300",
    fontSize: width * 0.06,
  },

  description: {
    fontSize: width * 0.035,
    opacity: 0.8,
  },
  titleDescriptionContainer: {
    bottom: height / 100,
  },
});

export default ChallengeBox;
