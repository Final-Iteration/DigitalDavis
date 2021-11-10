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
import JoinBanner from "./components/JoinBanner";
import UnjoinedBanner from "./components/UnjoinedBanner";
import Modal from "react-native-modal";
import Participant from "./components/Participant";
import axios from "../../axios";

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

  const challenge = props.navigation.state.params.challenge;

  useEffect(() => {
    setStatus(challenge.participationStatus);
    setLocation(challenge.location);
    setStartDate(challenge.start_date.toString().substring(0, 11));
    setEndDate(challenge.start_date.toString().substring(0, 11));
  }, []);
  console.log("-------------CHALLENGE CLICKED-------------");
  console.log(challenge.id);
  const antButtonPressed = () => {
    setTimeout(() => {
      setAntButton(false);
      setParticipantModal(!participantModal);
    }, 250);
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
          <Image style={styles.image} source={{ uri: challenge.image }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: height / 50,
          }}
        >
          <Text style={styles.title}>{challenge.name}</Text>
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
            <View style={styles.iconText}>
              <Icon
                name="people-outline"
                size={25}
                style={[antButton ? { color: "white" } : { color: "blue" }]}
              />
              <Text
                style={[
                  { left: 5, fontSize: 13, fontWeight: "bold" },
                  antButton ? { color: "white" } : { color: "black" },
                ]}
              >
                Attendees
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.locationTime}>
          <View style={styles.iconText}>
            <Icon
              name="ios-location-outline"
              size={25}
              style={{ color: "blue" }}
            />
            <Text style={styles.dateText}>{location}</Text>
          </View>
          <View style={[styles.iconText]}>
            <Icon name="calendar-outline" size={25} style={{ color: "blue" }} />
            <Text style={styles.dateText}>{startDate}</Text>
            <Text style={styles.dateText}>-</Text>
            <Text style={styles.dateText}>{endDate}</Text>
          </View>
        </View>
        <Text style={styles.about}>About</Text>
        <Text style={styles.mainDescription}>{challenge.description}</Text>

        {/* API CALL TO UPDATE PARTICIPATION */}
        <TouchableOpacity
          disabled={props.navigation.state.params.disableButton}
          style={[
            styles.participatingButton,
            {
              backgroundColor: props.navigation.state.params.disableButton
                ? "#EBEBE4"
                : participationStatus
                ? "#90ee90"
                : "#DDDDDD",
            },
          ]}
          onPress={() => {
            const addUserToChallenge = async () => {
              try {
                // console.log(challenge.id);
                // TODO: Route should be /challenges/addParticipant/:id
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
            showMessage({
              icon: "success",
              position: "top",
              message: null,
              type: participationStatus ? "warning" : "success",
              renderFlashMessageIcon: participationStatus
                ? UnjoinedBanner
                : JoinBanner,
              style: { borderRadius: 15, top: 35, height: 50 },
              statusBarHeight: 0,
              floating: true,
            });
          }}
        >
          <Text style={styles.participate}>
            {participationStatus ? "Participating" : "Participate"}
          </Text>
        </TouchableOpacity>
        {/* PARTICIPANT MODAL */}
        <Modal
          isVisible={participantModal}
          onBackdropPress={() => setParticipantModal(!participantModal)}
        >
          <ScrollView
            style={styles.modalView}
            showsVerticalScrollIndicator={false}
          >
            <Participant />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginVertical: height / 65,
              }}
              onPress={() => setParticipantModal(!participantModal)}
            >
              <Text style={{ fontSize: 17, color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 15,
    fontWeight: "500",
    left: 2,
  },
  buttonContainer: {
    height: 35,
    borderRadius: 10,
    width: 115,
    borderWidth: 0.7,
    borderColor: "blue",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    right: width / 35,
  },
  title: {
    fontWeight: "500",
    fontSize: 25,
    left: 17,
  },
  modalView: {
    marginVertical: height / 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  date: {
    fontSize: 16,
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  locationTime: {
    top: 10,
    flexDirection: "row",
    marginHorizontal: width / 30,
    marginVertical: 15,
    justifyContent: "space-between",
  },
  image: {
    width: width - 7,
    height: width - 7,
    alignSelf: "center",
    borderRadius: 20,
  },
  mainDescription: {
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 17,
  },
  participatingButton: {
    borderRadius: 8,
    width: width - 30,
    marginVertical: height / 60,
    borderRadius: 8,
    alignSelf: "center",
  },
  about: {
    fontWeight: "300",

    fontSize: 25,
    left: 16,
    marginVertical: 7,
  },
  participate: {
    fontWeight: "500",
    margin: 15,
    alignSelf: "center",
  },
});

export default ChallengeInfo;
