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
import Modal from "react-native-modal";
import Participant from "./components/Participant";
import axios from "axios";
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
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const challenge = props.navigation.state.params.challenge;

  useEffect(() => {
    setStatus(challenge.participationStatus);
    const getUserLocation = async () => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    };
    const getLongLat = async () => {
      try {
        const longLat = await axios.get(
          `http://www.mapquestapi.com/geocoding/v1/address?location=${challenge.location}&key=${MAP_QUEST_KEY}`
        );
        const result = longLat.data.results[0].locations[0].displayLatLng;
        setDestination({ latitude: result.lat, longitude: result.lng });
      } catch (err) {
        console.log(err);
      }
    };
    getUserLocation();
    getLongLat();
  }, []);

  // console.log(challenge);

  // let day = challenge.start_date.toString();
  // day = day.substring(0, day.indexOf("T"));
  let day = "09/40/20";

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
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              setMapModal(!mapModal);
            }}
          >
            <Icon
              name="ios-location-outline"
              size={30}
              style={{ color: "blue" }}
            />
            <Text style={styles.locationText}>{challenge.location}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dateBox}>
            <Icon
              name="calendar-outline"
              size={30}
              style={{ color: "red", right: 7 }}
            />
            <Text style={styles.date}>{day}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", marginHorizontal: 17 }}
          onPress={() => setParticipantModal(!participantModal)}
        >
          <Icon
            name="people-outline"
            size={30}
            style={{ color: "blue", right: 7 }}
          />
          <Text style={styles.locationText}>456 Participants</Text>
        </TouchableOpacity>

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

        <Modal
          isVisible={mapModal}
          onBackdropPress={() => setMapModal(!mapModal)}
        >
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
            <Marker coordinate={destination} />
            <MapViewDirections
              destination={destination}
              origin={origin}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="red"
            />
          </MapView>
        </Modal>

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
        <View style={{ marginVertical: 12, bottom: 10 }}>
          <Text style={styles.about}>About</Text>
          <Text style={styles.mainDescription}>{challenge.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginVertical: 200,
    backgroundColor: "white",
    borderRadius: 10,
  },
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
    borderRadius: 8,
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
