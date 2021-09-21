import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { Appbar, Avatar } from "react-native-paper";
const { height, width } = Dimensions.get("window");
const CustomHeader = ({ navigation, title }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: "#fff",

        elevation: 0,
      }}
    >
      <TouchableOpacity
        style={{ left: 22 }}
        onPress={() => navigation.navigate("User")}
      >
        <Avatar.Image
          size={40}
          source={{
            uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
          }}
        />
      </TouchableOpacity>
      <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: "30%",
    fontFamily: "Helvetica",
  },
});

export default CustomHeader;
