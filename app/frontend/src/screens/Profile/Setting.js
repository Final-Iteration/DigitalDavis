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
const asyncStorage = require("../../asyncStorage");
import axios from "../../axios";

//expect API call return
// const profile = {
//   profilePicture:
//     "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
//   fullName: "Keisuka Nakagawa",
//   userName: "Keisuka N.",
//   title: "Software Engineer",
//   age: "26",
//   birthDate: new Date(),
//   department: "Psychiatry and Behavioral Sciences",
//   gender: "Male",
//   email: "drknakagawa@ucdavis.edu",
// };
const { height, width } = Dimensions.get("window");
const UserProfile = (props) => {
  //userEffect to fetch current user
  const [profilePicture, setProfilePicture] = useState(
    "https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState(0);
  const [birthday, setBirthday] = useState(new Date(Date.now()));
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  function getAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const id = await asyncStorage.getData("ID");
        const authToken = await asyncStorage.getData("Authorization");
        const res = await axios.get(`/users/${id}`, {
          headers: {
            id: id,
            Authorization: authToken,
          },
        });

        const user = res.data;
        const dob = user.dob.split("-");
        dob[2] = dob[2].split("T", 1);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setTitle(user.job_title[0]);
        setDepartment(user.department);
        setEmail(user.email);
        setBirthday(user.dob);
        setAge(getAge(user.dob));
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserInfo();
  }, []);
  //API CALL TO SAVE UPDATED INFO TO DATA BASE
  const saveChange = async () => {
    try {
      const id = await asyncStorage.getData("ID");
      const authToken = await asyncStorage.getData("Authorization");

      const body = {
        first_name: firstName,
        last_name: lastName,
        job_title: title,
        department: department,
      };

      const res = await axios.patch(`/users/${id}`, body,
      {
        headers: {
          id: id,
          Authorization: authToken,
        },
        params: {
          Id: id
        }
      });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    //to be removed
    // props.navigation.navigate("User");
  };

  const onBirthdateChange = (event, value) => {
    setBirthday(value);
    setAge(getAge(value));
    console.log(value);
    console.log(age);
  };

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
      extraHeight={120}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={styles.imageView}>
        <View style={styles.halfImageView}></View>
        <TouchableOpacity onPress={() => pickImage()}>
          <Avatar.Image
            style={styles.avatar}
            size={width / 4}
            source={{
              uri: profilePicture,
            }}
          />
        </TouchableOpacity>
        <View style={{ top: -(height / 15) }}>
          <Text style={styles.fullName}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View
        style={{
          top: -(height / 15),
          backgroundColor: "rgba(242,242,242,255)",
        }}
      >
        <Field
          title="First Name"
          text={firstName}
          setting={true}
          callback={setFirstName}
        />
        <Field
          title="Last Name"
          text={lastName}
          setting={true}
          callback={setLastName}
        />
        <Field
          title="Age"
          text={age.toString()}
          setting={false}
          callback={setAge}
        />
        <Field
          title="Date of Birth"
          text={birthday}
          setting={true}
          dob={true}
          callback={onBirthdateChange}
        />
        <Field
          title="Department"
          text={department}
          setting={true}
          callback={setDepartment}
        />
        <Field title="Title" text={title} setting={true} callback={setTitle} />
        <Field title="Email" text={email} setting={true} callback={setEmail} />
      </View>
      <TouchableOpacity
        style={styles.saveChangeButton}
        onPress={() => saveChange()}
      >
        <Text style={styles.saveChangeText}>Save Changes</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  saveChangeButton: {
    top: -(height / 25),
    width: "100%",
    backgroundColor: "#142A4F",
  },
  saveChangeText: {
    color: "white",
    fontWeight: "500",
    fontSize: width * 0.05,
    alignSelf: "center",
  },
  avatar: {
    top: -50,
    alignSelf: "center",
    tintColor: "grey",
  },
  fullName: {
    fontSize: width * 0.07,
    fontWeight: "500",
    alignSelf: "center",
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "500",
    alignSelf: "center",
  },
  imageView: {
    width: "100%",
    backgroundColor: "rgba(242,242,242,255)",
  },
  halfImageView: {
    width: width,
    height: height / 13,
    backgroundColor: "#142A4F",
  },
});
export default UserProfile;
