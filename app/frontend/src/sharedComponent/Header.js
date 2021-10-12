import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Appbar, Avatar } from "react-native-paper";
const { height, width } = Dimensions.get("window");
const CustomHeader = ({ navigation, title, profile }) => {
  const logout = () => {
    //remove token from async storage
    navigation.navigate("Auth");
  };
  if (profile) {
    return (
      <Appbar.Header
        statusBarHeight={50}
        style={{
          backgroundColor: "#142A4F",
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: 22 }}
          onPress={() => navigation.navigate("Setting")}
        >
          <Icon name="setting" size={30} style={{ color: "#2F80ED" }} />
        </TouchableOpacity>
        <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
        <TouchableOpacity style={{ right: 22 }} onPress={() => logout()}>
          <Text style={styles.logOutButton}>Logout</Text>
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header
        statusBarHeight={50}
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
  }
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: "30%",
    fontFamily: "Helvetica",
  },
  logOutButton: {
    fontSize: 17,
    color: "#2F80ED",
    fontWeight: "500",
  },
});

export default CustomHeader;
