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
const barHeight = 37;
const platform = Platform.OS === "ios" ? true : "50%";
const CustomHeader = ({
  navigation,
  title,
  profile,
  setting,
  signup,
  challenge,
  challengeInfo,
  createChallenge,
}) => {
  if (challengeInfo) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#fff",
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: 5, flexDirection: "row", alignSelf: "center" }}
          onPress={() => {
            navigation.navigate("Challenge");
          }}
        >
          <Ionicon
            name="ios-chevron-back-outline"
            size={30}
            style={{ color: "#2F80ED" }}
          />
          <Text style={styles.challengeInfoBack}>Back</Text>
        </TouchableOpacity>
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
      </Appbar.Header>
    );
  } else if (signup) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#1d3679",
          elevation: -1,
        }}
      >
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <TouchableOpacity
          style={{ right: 22 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else if (profile) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#142A4F",
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: 22 }}
          onPress={() => navigation.navigate("Setting")}
        >
          <Icon name="setting" size={30} style={{ color: "white" }} />
        </TouchableOpacity>

        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <TouchableOpacity
          style={{ right: 22 }}
          onPress={() => navigation.goBack(null)}
        >
          <Feather name="chevron-down" size={30} color="white" />
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else if (setting) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#142A4F",
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: width / 20 }}
          onPress={() => navigation.navigate("User")}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
            }}
          />
        </TouchableOpacity>
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <TouchableOpacity
          style={{ right: 22 }}
          onPress={() => navigation.goBack(null)}
        >
          <Feather name="chevron-down" size={30} color="white" />
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#fff",
          elevation: 0,
        }}
      >
        {createChallenge ? (
          <TouchableOpacity
            style={{ left: 5, flexDirection: "row", alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Challenge");
            }}
          >
            <Ionicon
              name="ios-chevron-back-outline"
              size={30}
              style={{ color: "#2F80ED" }}
            />
            <Text style={styles.challengeInfoBack}>Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ left: width / 20 }}
            onPress={() => navigation.navigate("User")}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
              }}
            />
          </TouchableOpacity>
        )}
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        {challenge ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateChallenge")}
            style={styles.plusButton}
          >
            <AntDesign name="plus" size={28} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.plusButton}>
            <AntDesign
              name="plus"
              size={28}
              color="black"
              style={{ opacity: 0 }}
            />
          </TouchableOpacity>
        )}
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
    alignItems: "center",
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
  plusButton: {
    right: width / 20,
  },
});

export default CustomHeader;
