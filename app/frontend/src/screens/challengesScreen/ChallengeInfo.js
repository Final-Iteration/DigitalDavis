import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TagPill from "./components/TagPill";
import { showMessage } from "react-native-flash-message";
import JoinBanner from "./components/JoinBanner";
import UnjoinedBanner from "./components/UnjoinedBanner";

const { width, height } = Dimensions.get("window");
const ChallengeInfo = (props) => {
  // this needs to be changed when we are importing data, should not be set to false
  const [status, setStatus] = useState(false);
  const challenge = props.navigation.state.params.challenge;
  useEffect(() => {
    setStatus(challenge.status);
  }, []);
  const day = challenge.date.toString().split(" ");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={{ uri: challenge.image }} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            data={challenge.tags}
            renderItem={({ item }) => <TagPill tag={item} />}
            keyExtractor={(item) => item}
          />
        </ScrollView>
        <View style={styles.locationTime}>
          <Icon
            name="ios-location-outline"
            size={30}
            style={{ color: "blue" }}
          />
          <Text style={styles.locationText}>{challenge.location}</Text>
          <View style={styles.dateBox}>
            <Icon
              name="calendar-outline"
              size={30}
              style={{ color: "red", right: 7 }}
            />
            <Text
              style={styles.date}
            >{`${day[0]} ${day[1]} ${day[2]} ${day[3]}`}</Text>
          </View>
        </View>
        {/* API CALL TO UPDATE PARTICIPATION */}
        <TouchableOpacity
          style={[
            styles.participatingButton,
            { backgroundColor: status ? "#90ee90" : "#DDDDDD" },
          ]}
          onPress={() => {
            setStatus(!status);
            showMessage({
              icon: "success",
              position: "top",
              message: null,
              type: status ? "warning" : "success",
              renderFlashMessageIcon: status ? UnjoinedBanner : JoinBanner,
              style: { borderRadius: 15, top: 35, height: 50 },
              statusBarHeight: 0,
              floating: true,
            });
          }}
        >
          <Text style={styles.participate}>
            {status ? "Participating" : "Participate"}
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 12, bottom: 10 }}>
          <Text style={styles.about}>About</Text>
          <Text style={styles.mainDescription}>{challenge.longDescr}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    position: "absolute",
    right: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  date: {
    fontSize: 16,
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  locationText: {
    left: 7,
    fontSize: 16,
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  locationTime: {
    top: 10,
    flexDirection: "row",
    marginHorizontal: 17,
    marginVertical: 11,
  },

  image: {
    width: width,
    height: height / 2,
  },
  mainDescription: {
    top: 10,
    fontSize: 18,
    fontWeight: "300",
    marginHorizontal: 17,
  },
  participatingButton: {
    borderRadius: 8,
    width: width - 30,
    marginVertical: 11,
    borderRadius: 3,
    alignSelf: "center",
  },
  about: {
    fontWeight: "600",
    fontSize: 25,
    left: 17,
    marginVertical: 7,
  },
  participate: {
    fontWeight: "500",
    margin: 15,
    alignSelf: "center",
  },
});

export default ChallengeInfo;
