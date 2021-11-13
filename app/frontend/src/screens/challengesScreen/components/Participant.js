import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "../../../axios";
import asyncStorage from "../../../asyncStorage";
const { height, width } = Dimensions.get("window");
const Participant = ({ participants }) => {
  const [participantss, setParticipantss] = useState(participants);
  const [allParticipants, setAllParticipants] = useState([]);
  //make axios call to get participant
  useEffect(() => {
    const getData = async () => {
      const id = await asyncStorage.getData("ID");
      const auth = await asyncStorage.getData("Authorization");
      participantss.map(async (participant) => {
        const res = await axios.get(`/users/${participant}`, {
          headers: { id: id, Authorization: auth },
        });
        setAllParticipants((oldArray) => [...oldArray, res.data]);
      });
    };
    getData();
    return () => {
      setAllParticipants([]);
    };
  }, []);

  const renderData = (data) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allParticipants}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Avatar.Image
                size={40}
                source={{
                  uri: "https://64.media.tumblr.com/e749655d8485ee7be52043dfc964e6b5/tumblr_p6pjl4g3lV1x9pn5ho1_1280.jpg",
                }}
              />
              <View style={{ left: 20 }}>
                <Text
                  style={styles.name}
                >{`${item.first_name} ${item.last_name}`}</Text>
                <Text style={styles.title}>{item.job_title[0]}</Text>
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
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${data.item.email}`)}
      >
        <Icon style={{ opacity: 0.7 }} size={25} name="email-send-outline" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <SwipeListView
        data={allParticipants}
        renderItem={renderData}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={40}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 28,
    top: 9,
  },
  name: { fontSize: 18 },
  title: { opacity: 0.6, fontSize: 13 },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    width: width - 75,
    alignSelf: "center",
    height: height / 15,
    top: 10,
    alignItems: "center",
  },
});

export default Participant;
