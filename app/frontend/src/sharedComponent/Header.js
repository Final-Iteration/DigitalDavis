import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";

import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar, Avatar } from "react-native-paper";
import { NavigationActions } from "react-navigation";
const { height, width } = Dimensions.get("window");
const CustomHeader = ({ title }) => {
  return (
    <Appbar.Header>
      <TouchableOpacity style={{ left: 22 }}>
        <Avatar.Image
          size={40}
          source={{
            uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
          }}
          onPress={() => navigation.navigate("User")}
        />
      </Appbar.Header>
    );
  }
};
const styles = StyleSheet.create({
  challengeInfoBack: {
    fontSize: 17,
    color: "#2F80ED",
    fontWeight: "500",
    marginVertical: 5,
  },
  headerStyle: {
    // alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "300",
  },
  logOutButton: {
    fontSize: 17,
    color: "#2F80ED",
    fontWeight: "500",
  },
  nextButtonGustav: {
    right: width / 20,
    fontSize: 20,
    color: "#0288d1",
  },
  backButton: {
    color: "#0288d1",
    alignSelf: "center",
    fontSize: 18,
  },

  backButtonGustav: {
    left: width / 20,
    fontSize: 20,
    color: "#0288d1",
  },
  tagPageContainerGustav: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  leftAction: {
    left: width / 28,
  },
  rightAction: {
    right: width / 28,
  },
});

export default CustomHeader;
