import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import Field from "./components/Field";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/AntDesign";
//expect API call return
const profile = {
  profilePicture:
    "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
  fullName: "Keisuka Nakagawa",
  userName: "Keisuka N.",
  title: "Software Engineer",
  age: 26,
  birthDate: "01/12/1999",
  department: "Psychiatry and Behavioral Sciences",
  gender: "Male",
  email: "drknakagawa@ucdavis.edu",
};
const { height, width } = Dimensions.get("window");
const UserProfile = (props) => {
  //userEffect to fetch current user
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(profile.userName);
    setProfilePicture(profile.profilePicture);
    setFullName(profile.fullName);
    setTitle(profile.title);
    setAge(profile.age);
    setDepartment(profile.department);
    setGender(profile.gender);
    setEmail(profile.email);
    setBirthday(profile.birthDate);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={50}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={true}
      keyboardShouldPersistTaps={"always"}
      stickyHeaderIndices={[0]}
      style={styles.scrollView}
      bounce={false}
    >
      <View style={styles.imageView}>
        <View style={styles.halfImageView}></View>
        <TouchableOpacity onPress={() => pickImage()}>
          <Avatar.Image
            style={styles.avatar}
            size={110}
            source={{
              uri: profilePicture,
            }}
          />
          <View style={styles.cameraIconView}>
            <Icon name="camera" size={40} style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>

        <View style={{ top: -50 }}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View>
        <Field
          title="Username"
          text={username}
          setting={true}
          callback={setUsername}
        />
        <Field
          title="Age"
          text={age}
          setting={true}
          callback={setProfilePicture}
        />
        <Field
          title="Department"
          text={department}
          setting={true}
          callback={setFullName}
        />
        <Field
          title="Birth Date"
          text={birthday}
          setting={true}
          callback={setAge}
        />
        <Field
          title="Title"
          text={title}
          setting={true}
          callback={setBirthday}
        />
        <Field
          title="Department"
          text={department}
          setting={true}
          callback={setDepartment}
        />
        <Field title="Email" text={email} setting={true} callback={setGender} />
        <Field
          title="Gender"
          text={gender}
          setting={true}
          callback={setEmail}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  cameraIconView: {
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    height: 110,
    width: 110,
    borderRadius: 100,
    opacity: 0.8,
    backgroundColor: "grey",
    top: -60,
  },
  cameraIcon: { color: "black", marginVertical: "30%" },
  avatar: {
    top: -60,
    alignSelf: "center",
    tintColor: "grey",
  },
  uploadBtn: {
    display: "flex",
    position: "absolute",
    alignSelf: "center",
  },
  scrollView: {
    marginBottom: "7%",
  },
  fullName: {
    fontSize: 27,
    fontWeight: "500",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
  },
  imageView: {
    top: 0,
    width: "100%",
    height: 210,
    alignItems: "center",
    backgroundColor: "rgba(242,242,242,255)",
  },
  halfImageView: {
    width: width,
    height: 163 / 2,
    backgroundColor: "#142A4F",
  },
});
export default UserProfile;
