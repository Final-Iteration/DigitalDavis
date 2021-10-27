import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
const participants = [
  { id: 1, name: "John" },
  { id: 2, name: "Mary" },
  { id: 3, name: "Joshua" },
  { id: 4, name: "Keisuka" },
  { id: 5, name: "Manh" },
  { id: 6, name: "Daniel" },
  { id: 7, name: "Gustav" },
  { id: 8, name: "Sahira" },
  { id: 9, name: "Akasha" },
  { id: 10, name: "Sharon" },
  { id: 11, name: "Dennis" },
  { id: 12, name: "Mathew" },
];

const Participant = (name, picture, title) => {
  const renderData = (data) => {
    return (
      <View style={styles.container}>
        <Avatar.Image
          size={40}
          source={{
            uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
          }}
        />
        <View style={{ left: 20 }}>
          <Text style={styles.name}>{data.item.name}</Text>
          <Text style={styles.title}>swe</Text>
        </View>
        <View
          style={{
            right: 0,
            alignSelf: "flex-end",
            position: "absolute",
            alignSelf: "center",
          }}
        >
          <Entypo
            style={{ opacity: 0.7 }}
            size={23}
            name="chevron-small-right"
          />
        </View>
      </View>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "mailto:support@example.com?subject=SendMail&body=Description"
          )
        }
      >
        <Icon style={{ opacity: 0.7 }} size={25} name="email-send-outline" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <SwipeListView
        data={participants}
        renderItem={renderData}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={40}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      ></SwipeListView>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    left: 28,
    top: 9,
  },
  name: { fontSize: 18 },
  title: { opacity: 0.6, fontSize: 13 },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    width: 320,
    alignSelf: "center",
    height: 70,
    top: 10,
    alignItems: "center",
  },
});

export default Participant;
