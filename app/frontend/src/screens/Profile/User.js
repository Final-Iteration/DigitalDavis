import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import Field from "./components/Field";
import { Feather } from "@expo/vector-icons";
import axios from "../../axios";

const asyncStorage = require("../../asyncStorage");

//expect API call return
const profile = {
  profilePicture:
    "https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png",
  fullName: " ",
  userName: " ",
  title: "Software Engineer",
  age: " ",
  birthDate: new Date(),
  department: " ",
  gender: " ",
  email: " ",
};
const { height, width } = Dimensions.get("window");

const UserProfile = (props) => {
  //userEffect to fetch current user
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("A");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const dob = profile.birthDate.toString().split(" ");

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
        console.log(user);
        const dob = user.dob.split("-", 3);
        dob[2] = dob[2].split("T", 1);
        setFullName(
          user.hasOwnProperty("first_name") && user.hasOwnProperty("last_name")
            ? user.first_name + " " + user.last_name
            : profile.fullName
        );
        setUsername(
          user.hasOwnProperty("userName") ? user.userName : profile.userName
        );
        setTitle(user.hasOwnProperty("title") ? user.title : profile.title);
        setAge(user.hasOwnProperty("age") ? user.age : profile.age);
        setDepartment(
          user.hasOwnProperty("department")
            ? user.department
            : profile.department
        );
        setGender(user.hasOwnProperty("gender") ? user.gender : profile.gender);
        setEmail(user.hasOwnProperty("email") ? user.email : profile.email);
        setBirthday(`${dob[1]} ${dob[2]} ${dob[0]}`);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserInfo();

    setProfilePicture(profile.profilePicture);
    setBirthday(`${dob[1]} ${dob[2]} ${dob[3]}`);
  }, []);

  const logout = () => {
    //remove token from async storage
    props.navigation.navigate("Auth");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imageView}>
        <View style={styles.halfImageView}></View>
        <Avatar.Image
          style={{ top: -60, alignSelf: "center", backgroundColor: "white" }}
          size={110}
          source={{
            uri: profilePicture,
          }}
        />
        <View style={{ top: -50 }}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          backgroundColor: "#f2f2f2",
          width: width,
        }}
      >
        <Field title="Username" text={username} />
        <Field title="Age" text={age} />
        <Field title="Department" text={department} />
        <Field title="Birth Date" text={birthday} />
        <Field title="Title" text={title} />
        <Field title="Department" text={department} />
        <Field title="Email" text={email} />
        <Field title="Gender" text={gender} />
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={() => logout()}>
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
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
  logOutButton: {
    textAlign: "center",
    height: 75,
    width: "100%",
    backgroundColor: "#142A4F",
    borderRadius: 10,
  },
  logOutText: {
    marginVertical: 12,
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    alignSelf: "center",
  },
});
export default UserProfile;
