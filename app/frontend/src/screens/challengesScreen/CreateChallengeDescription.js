import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import UnsplashCred from "../../secrete/UnplashCred";
import axios from "axios";
import UnplashImage from "./components/UnplashImage";
// import { showMessage } from "react-native-flash-message";
// import CreateChallengeBanner from "./components/CreateChallengeBanner";
const { width, height } = Dimensions.get("window");

const CreateChallengeDescription = () => {
  const [nameLength, setInputLength] = useState(30);
  const [descriptionLength, setDescriptionLength] = useState(250);
  const [challengeName, setChallengeName] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState([]); //list of images returned from unsplash api
  const [selectedPhoto, setSelectedPhoto] = useState(
    "https://mpama.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
  ); //url of a single picture chosen by user
  const textInputCount = (prop, text) => {
    if (prop == "name") {
      setInputLength(30 - text.length);
    } else {
      setDescriptionLength(250 - text.length);
    }
  };

  const searchPhotos = async (text) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${UnsplashCred.accessKey}&query=${text}&per_page=20`
    );

    setImageURL(
      response.data.results.map((data) => {
        return data.urls.regular;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar progress={0.75} color={Colors.blue600} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        extraScrollHeight={20}
        contentContainerStyle={{ paddingBottom: 13 }}
      >
        <Text style={styles.headerText}>
          Give your challenge a picture, name, and description.
        </Text>

        <Text style={styles.secondHeaderText}>
          Don't worry about it too much you can change it later.
        </Text>
        <View style={styles.challengePhotoContainer}>
          <Image
            style={styles.challengePhoto}
            source={{ uri: selectedPhoto }}
          />
          <TouchableOpacity
            style={styles.uploadPictureContainer}
            onPress={() => setModal(!modal)}
            activeOpacity={1}
          >
            <Text style={styles.uploadPictureText}>Select challenge photo</Text>
            <Feather
              name="external-link"
              size={17}
              color={"white"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.nameAndDescriptionText}>Name</Text>
        <TextInput
          maxLength={30}
          style={styles.nameBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={challengeName}
          onChangeText={(text) => {
            setChallengeName(text);
            textInputCount("name", text);
          }}
        />
        <Text style={styles.inputLengths}>{nameLength}</Text>
        <Text style={styles.nameAndDescriptionText}>Description</Text>
        <TextInput
          maxLength={250}
          multiline={true}
          style={styles.descriptionBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={challengeDescription}
          onChangeText={(text) => {
            setChallengeDescription(text);
            textInputCount("", text);
          }}
        />
        <Text style={styles.inputLengths}>{descriptionLength}</Text>

        <Modal
          isVisible={modal}
          onBackdropPress={() => setModal(!modal)}
          useNativeDriver={true}
        >
          <ScrollView
            style={styles.modalView}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "98%",
                alignSelf: "center",
              }}
            >
              <View style={styles.searchContainer}>
                <Icon name="search" size={16} style={styles.iconStyle} />
                <TextInput
                  style={{ width: "85%" }}
                  value={image}
                  placeholder="Search images"
                  placeholderTextColor="grey"
                  onChangeText={(text) => {
                    setImage(text);
                    searchPhotos(text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ right: 0, position: "absolute" }}
                onPress={() => setModal(!modal)}
              >
                <Feather name="x-circle" size={25} />
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.pictureList}
              data={imageURL}
              numColumns={2}
              renderItem={({ item }) => (
                <UnplashImage
                  url={item}
                  setPhoto={setSelectedPhoto}
                  currentlySelected={selectedPhoto}
                />
              )}
              keyExtractor={(item) => item}
            />
          </ScrollView>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  challengePhotoContainer: {
    marginTop: height / 55,
    height: height / 3,
    marginHorizontal: width / 25,
  },
  challengePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  closeModalText: {
    margin: 7,
    fontSize: 15,
    marginHorizontal: 20,
    color: "white",
  },
  closeModal: {
    borderRadius: 5,
    marginVertical: 7,
    alignSelf: "center",
    backgroundColor: "#4997d0",
  },
  pictureList: {
    alignSelf: "center",
    marginTop: -5,
  },
  iconStyle: { marginHorizontal: 10 },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    borderColor: "#D3D3D3",
    marginVertical: height / 60,
    marginHorizontal: width / 30,
    right: 5,
    height: 35,
  },
  modalView: {
    marginVertical: 100,
    backgroundColor: "white",
    borderRadius: 10,
  },
  uploadPictureText: {
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 17,
    alignSelf: "center",
    color: "white",
  },
  uploadPictureContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 2,
    borderColor: "#abdcfb",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: width / 25,
    marginTop: height / 50,
  },
  secondHeaderText: {
    marginHorizontal: width / 25,
    fontWeight: "300",
    marginTop: height / 20,
  },
  nameAndDescriptionText: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: width / 25,
    marginTop: height / 20,
  },
  container: {
    flex: 1,
  },
  inputLengths: {
    alignSelf: "flex-end",
    marginRight: width / 18,
    top: height / 80,
  },
  nameBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 25,
    marginHorizontal: width / 25,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: "#D3D3D3",
    marginTop: height / 50,
  },
  descriptionBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 6,
    marginHorizontal: width / 25,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: "#D3D3D3",
    marginTop: height / 50,
  },
});

export default CreateChallengeDescription;
