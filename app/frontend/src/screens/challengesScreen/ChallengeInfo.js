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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TagPill from "./components/TagPill";
import { showMessage } from "react-native-flash-message";
import JoinBanner from "./components/JoinBanner";
import UnjoinedBanner from "./components/UnjoinedBanner";
import Modal from "react-native-modal";
import Participant from "./components/Participant";
import axios from "../../axios";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
const GOOGLE_API_KEY = "AIzaSyBJCM6WfGIUpdIxDYp3fjSHgGPZLvrUgNM";
const MAP_QUEST_KEY = "HrX8Ag2remRQH5v0FIcYe7xk7d9Y775u";
const { width, height } = Dimensions.get("window");
const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUD_DELTA + width / height;

const ChallengeInfo = (props) => {
  /**
   * @todo: this needs to be changed when we are importing data, should not be set to false
   */

  const [participationStatus, setStatus] = useState(false);
  const [participantModal, setParticipantModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [locationButton, setLocationButton] = useState(false);
  const [dateButton, setDateButton] = useState(false);
  const [antButton, setAntButton] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });
  const [showMap, setShowMap] = useState(false);

  const challenge = props.navigation.state.params.challenge;

  useEffect(() => {
    setStatus(challenge.participationStatus);
    
    const getUserLocation = async () => {
      try {
        //user location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});

        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUD_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        //challenge address location

        const longLat = await axios.get(
          `http://www.mapquestapi.com/geocoding/v1/address?location=${challenge.location}&key=${MAP_QUEST_KEY}`
        );
        const result = longLat.data.results[0].locations[0].displayLatLng;
        setDestination({ latitude: result.lat, longitude: result.lng });

        setShowMap(true);
      } catch (err) {
        console.log(err);
      }
    };

    getUserLocation();
  }, []);
  console.log("-------------CHALLENGE CLICKED-------------");
  console.log(challenge.id);

  // let day = challenge.start_date.toString();
  // day = day.substring(0, day.indexOf("T"));
  let day = "09/40/20";
  const locationButtonPressed = () => {
    setTimeout(() => {
      setLocationButton(false);
      setMapModal(!mapModal);
    }, 250);
  };
  const dateButtonPressed = () => {
    setTimeout(() => {
      setDateButton(false);
      setDateModal(!dateModal);
    }, 250);
  };
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

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text style={styles.title}>{challenge.name}</Text>
          <FlatList
            style={{
              left: 35,
              height: 35,
              marginRight: 50,
              alignSelf: "center",
            }}
            contentContainerStyle={{
              flexDirection: "row",
            }}
            data={challenge.tags}
            renderItem={({ item }) => <TagPill tag={item} />}
            keyExtractor={(item) => item}
          />
          {/* </View> */}
        </ScrollView>
        <View style={{ marginHorizontal: width / 100, marginVertical: 10 }}>
          <View style={styles.locationTime}>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                locationButton
                  ? { backgroundColor: "#142A4F" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => {
                setLocationButton(true);
                locationButtonPressed();
              }}
            >
              <View style={styles.iconText}>
                <Icon
                  name="ios-location-outline"
                  size={25}
                  style={[
                    locationButton ? { color: "white" } : { color: "blue" },
                  ]}
                />
                <Text
                  style={[
                    { left: 5, fontSize: 13, fontWeight: "bold" },
                    locationButton ? { color: "white" } : { color: "black" },
                  ]}
                >
                  Location
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                dateButton
                  ? { backgroundColor: "#142A4F" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => {
                setDateButton(true);
                dateButtonPressed();
              }}
            >
              <View style={styles.iconText}>
                <Icon
                  name="calendar-outline"
                  size={25}
                  style={[dateButton ? { color: "white" } : { color: "blue" }]}
                />
                <Text
                  style={[
                    { left: 5, fontSize: 13, fontWeight: "bold" },
                    dateButton ? { color: "white" } : { color: "black" },
                  ]}
                >
                  Date
                </Text>
              </View>
            </TouchableOpacity>
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
        </View>

        <View style={{ marginVertical: 12, bottom: 10 }}>
          <Text style={styles.about}>About</Text>
          <Text style={styles.mainDescription}>{challenge.description}</Text>
        </View>

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
            const addUserToChallenge = async () =>{
              try{
              // console.log(challenge.id);
              // TODO: Route should be /challenges/addParticipant/:id
              const res = await axios.patch(`/challenges/${challenge.id}`,{
                //TODO: Will need to pass in UserID, and make sure Challenge service is appending this into the challenge
                //participants: [`${user.id}`]
                participants: ["Test Participation Axios call"]
              });
              }catch (error){
              console.log(error.message);
              }
            
            }
            const removeUserFromChallenge = async () => {
              try{
                // console.log(challenge.id);
                // TODO: Route should be /challenges/removeParticipant/:id
                const res = await axios.patch(`/challenges/${challenge.id}`,{
                  //TODO: Will need to pass in UserID, and make sure Challenge service is removing the user from the challenge
                  //participants: [`${user.id}`]
                  participants: ["Test Participation Axios call"]
                });
                }catch (error){
                console.log(error.message);
                } 
            }

            /**
             * Add a user to a challenge and change participationStatus to allow the UI to update accordingly
             */
            if(participationStatus == false)
            {
              addUserToChallenge();
              setStatus(!participationStatus);
            }else{
              removeUserFromChallenge();
              setStatus(!participationStatus);
            }
            
            setStatus(!participationStatus);
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
                marginVertical: 15,
              }}
              onPress={() => setParticipantModal(!participantModal)}
            >
              <Text style={{ fontSize: 17, color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

        {/* MAP MODAL */}

        <Modal
          isVisible={mapModal}
          onBackdropPress={() => setMapModal(!mapModal)}
        >
          {showMap ? (
            <MapView
              followUserLocation={true}
              zoomEnabled={true}
              style={[
                {
                  height: 500,
                  width: 372,
                },
                styles.modalView,
              ]}
              initialRegion={origin}
            >
              <Marker coordinate={origin} />
              <Marker
                coordinate={destination}
                title={"Location"}
                description={challenge.location}
              />
              <MapViewDirections
                destination={destination}
                origin={origin}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="red"
              />
            </MapView>
          ) : (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </Modal>

        {/* MODALS END */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  title: {
    fontWeight: "600",
    fontSize: 33,
    left: 17,
  },
  modalView: {
    marginVertical: 200,
    backgroundColor: "white",
    borderRadius: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
    marginHorizontal: 17,
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
    top: 10,
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 17,
  },
  participatingButton: {
    borderRadius: 8,
    width: width - 30,
    marginVertical: 11,
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
