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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import JoinBanner from "./components/banners/JoinBanner";
import UnjoinedBanner from "./components/banners/UnjoinedBanner";
import Modal from "react-native-modal";
import Participant from "./components/Participant";
import axios from "../../axios";
const asyncStorage = require("../../asyncStorage");

const { width, height } = Dimensions.get("window");

const ChallengeInfo = (props) => {
  /**
   * @todo: this needs to be changed when we are importing data, should not be set to false
   */
  const [participationStatus, setStatus] = useState(false);
  const [participantModal, setParticipantModal] = useState(false);
  const [antButton, setAntButton] = useState(false);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participants, setParticipants] = useState([]);

  const challenge = props.route.params.challenge;
  const id = props.route.params.id;

  useEffect(() => {
    setStatus(challenge.participants.includes(id));
    setLocation(challenge.location);
    setParticipants(challenge.participants);
    let date = challenge.start_date.substring(0, 10).split("-");
    setStartDate(`Start: ${date[1]}-${date[2]}-${date[0].substring(2)}`);
    date = challenge.end_date.substring(0, 10).split("-");
    setEndDate(`End: ${date[1]}-${date[2]}-${date[0].substring(2)}`);
  }, []);

  const antButtonPressed = () => {
    setTimeout(() => {
      setAntButton(false);
      setParticipantModal(!participantModal);
    }, 250);
  };
  const addUserToChallenge = async () => {
    try {
      // console.log(challenge.id);
      // TODO: Route should be /challenges/addParticipant/:id
      const authToken = await asyncStorage.getData("Authorization");
      const res = await axios.patch(
        `/challenges/${challenge.id}`,
        {
          //TODO: Will need to pass in UserID, and make sure Challenge service is appending this into the challenge
          //participants: [`${user.id}`]
          participants: ["Test Participation Axios call"],
        },
        {
          headers: {
            id: id,
            Authorization: authToken,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeUserFromChallenge = async () => {
    try {
      // console.log(challenge.id);
      // TODO: Route should be /challenges/removeParticipant/:id
      const res = await axios.patch(`/challenges/${challenge.id}`, {
        //TODO: Will need to pass in UserID, and make sure Challenge service is removing the user from the challenge
        //participants: [`${user.id}`]
        participants: ["Test Participation Axios call"],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const showMsg = () => {
    showMessage({
      icon: "success",
      position: "top",
      message: null,
      type: participationStatus ? "warning" : "success",
      renderFlashMessageIcon: participationStatus ? UnjoinedBanner : JoinBanner,
      style: { borderRadius: 15, top: 35, height: 50 },
      statusBarHeight: 0,
      floating: true,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: challenge.unsplashurl,
            }}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.titleAndAttendeesButton}>
            <Text style={[styles.title, { width: "65%" }]}>
              {challenge.name}
            </Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                antButton
                  ? { backgroundColor: "#142A4F" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => {
                setAntButton(true);
                antButtonPressed();
              }}
            >
              <View style={[styles.iconText, { margin: 5 }]}>
                <Icon
                  name="people-outline"
                  size={width * 0.05}
                  style={[antButton ? { color: "white" } : { color: "blue" }]}
                />
                <Text
                  style={[
                    { fontSize: 13, fontWeight: "bold", alignSelf: "center" },
                    antButton ? { color: "white" } : { color: "black" },
                  ]}
                >
                  {`${challenge.participants.length} Attendees`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.locationTime}>
            <View style={styles.iconText}>
              <Icon
                name="ios-location-outline"
                size={width * 0.04}
                style={{ color: "blue" }}
              />
              <View style={{ width: width / 2.5 }}>
                <Text style={styles.dateText}>{location}</Text>
              </View>
            </View>
            <View style={styles.iconText}>
              <Icon
                name="calendar-outline"
                size={width * 0.04}
                style={{ color: "blue" }}
              />
              <View>
                <Text style={[styles.dateText, { alignSelf: "flex-end" }]}>
                  {startDate}
                </Text>
                <Text style={[styles.dateText, { alignSelf: "flex-end" }]}>
                  {endDate}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.about}>About</Text>
          <Text style={styles.mainDescription}>{challenge.description}</Text>
          <TouchableOpacity
            disabled={props.route.params.disableButton}
            style={[
              styles.participatingButton,
              {
                backgroundColor: props.route.params.disableButton
                  ? "#EBEBE4"
                  : participationStatus
                  ? "#90ee90"
                  : "#DDDDDD",
              },
            ]}
            onPress={() => {
              /**
               * Add a user to a challenge and change participationStatus to allow the UI to update accordingly
               */
              if (participationStatus == false) {
                addUserToChallenge();
                setStatus(!participationStatus);
              } else {
                removeUserFromChallenge();
                setStatus(!participationStatus);
              }
              showMsg();
            }}
          >
            <Text style={styles.participate}>
              {participationStatus ? "Participating" : "Participate"}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={participantModal}
          onBackdropPress={() => setParticipantModal(!participantModal)}
        >
          <ScrollView
            style={styles.modalView}
            showsVerticalScrollIndicator={false}
          >
            <Participant participants={challenge.participants} />
          </ScrollView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width / 27,
  },
  titleAndAttendeesButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height / 50,
  },
  dateText: {
    fontSize: width * 0.035,
    fontWeight: "400",
    alignSelf: "flex-start",
    left: 3,
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "blue",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: width * 0.08,
  },
  modalView: {
    marginVertical: height / 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  iconText: {
    flexDirection: "row",
  },
  locationTime: {
    marginTop: height / 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: width - 7,
    height: width - 7,
    alignSelf: "center",
    borderRadius: 20,
  },
  mainDescription: {
    fontSize: width * 0.04,
    fontWeight: "300",
    marginTop: height / 50,
  },
  participatingButton: {
    bottom: height / 100,
    marginTop: height / 50,
    borderRadius: 8,
    width: width - 30,
    alignSelf: "center",
  },
  about: {
    marginTop: height / 50,
    fontWeight: "300",
    fontSize: width * 0.06,
  },
  participate: {
    fontWeight: "500",
    margin: 15,
    alignSelf: "center",
  },
});

export default ChallengeInfo;
