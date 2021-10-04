import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import Field from "./components/Field";

//expect API call return
const profile = {
  profilePicture:
    "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
  fullName: "Keisuka Nakagawa",
  userName: "Keisuka N.",
  title: "Software Engineer",
  age: "26",
  birthDate: new Date(),
  department: "Psychiatry and Behavioral Sciences",
  gender: "Male",
  email: "drknakagawa@ucdavis.edu",
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

  const dob = profile.birthDate.toString().split(" ")
  useEffect(() => {
    setUsername(profile.userName);
    setProfilePicture(profile.profilePicture);
    setFullName(profile.fullName);
    setTitle(profile.title);
    setAge(profile.age);
    setDepartment(profile.department);
    setGender(profile.gender);
    setEmail(profile.email);
    setBirthday(`${dob[1]} ${dob[2]} ${dob[3]}`);
  }, []);

  return (
    <ScrollView stickyHeaderIndices={[0]} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.imageView}>
        <View style={styles.halfImageView}></View>
        <Avatar.Image
          style={{ top: -60, alignSelf: "center" }}
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
      <View style={{ alignSelf: "center" }}>
        <Field title="Username" text={username} />
        <Field title="Age" text={age} />
        <Field title="Department" text={department} />
        <Field title="Birth Date" text={birthday} />
        <Field title="Title" text={title} />
        <Field title="Department" text={department} />
        <Field title="Email" text={email} />
        <Field title="Gender" text={gender} />
      </View>
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
});
export default UserProfile;
