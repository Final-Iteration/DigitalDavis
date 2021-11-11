import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Appbar, Avatar } from "react-native-paper";
const { height, width } = Dimensions.get("window");
const barHeight = 37;
const CustomHeader = ({
  navigation,
  title,
  profile,
  setting,
  signup,
  challenge,
  challengeInfo,
  CreateChallengeTags,
  CreateChallengeDate,
  CreateChallengeDescription,
}) => {
  //get user profile
  useEffect(() => {});
  const r = () => {
    if (CreateChallengeTags) {
      return (
        <TouchableOpacity
          style={{
            left: 5,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Ionicon
            name="ios-chevron-back-outline"
            size={30}
            style={{ color: "#2F80ED", opacity: 0 }}
          />
          <Text style={{ opacity: 0 }}>Back</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.plusButton}>
          <AntDesign
            name="plus"
            size={28}
            color="black"
            style={{ opacity: 0 }}
          />
        </TouchableOpacity>
      );
    }
  };

  // if (CreateChallengeDescription) {
  //   return (
  //     <Appbar.Header
  //       statusBarHeight={barHeight}
  //       style={{
  //         backgroundColor: "#fff",
  //         elevation: 0,
  //       }}
  //     >
  //       <View style={styles.tagPageContainerGustav}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("CreateChallengeDate");
  //           }}
  //         >
  //           <Text style={styles.backButtonGustav}>Back</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("Challenge");
  //           }}
  //         >
  //           <Text style={styles.nextButtonGustav}>Create</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Appbar.Header>
  //   );
  // } else if (CreateChallengeDate) {
  //   return (
  //     <Appbar.Header
  //       statusBarHeight={barHeight}
  //       style={{
  //         backgroundColor: "#fff",
  //         elevation: 0,
  //       }}
  //     >
  //       <View style={styles.tagPageContainerGustav}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("CreateChallengeTags");
  //           }}
  //         >
  //           <Text style={styles.backButtonGustav}>Back</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("CreateChallengeDescription");
  //           }}
  //         >
  //           <Text style={styles.nextButtonGustav}>Next</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Appbar.Header>
  //   );
  // } else if (CreateChallengeTags) {
  //   return (
  //     <Appbar.Header
  //       statusBarHeight={barHeight}
  //       style={{
  //         backgroundColor: "#fff",
  //         elevation: 0,
  //       }}
  //     >
  //       <View style={styles.tagPageContainerGustav}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("Challenge");
  //           }}
  //         >
  //           <Text style={styles.backButtonGustav}>Back</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("CreateChallengeDate");
  //           }}
  //         >
  //           <Text style={styles.nextButtonGustav}>Next</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Appbar.Header>
  //   );
  // } else
  if (challengeInfo) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#fff",
          elevation: 0,
        }}
      >
        <Appbar.Action
          style={{ width: 70 }}
          animated={false}
          icon={() => (
            <View style={{ flexDirection: "row" }}>
              <Ionicon
                name="ios-chevron-back-outline"
                size={30}
                style={{ color: "#2F80ED" }}
              />
              <Text style={styles.backButton}>Back</Text>
            </View>
          )}
          onPress={() => {
            navigation.navigate("Challenge");
          }}
        />

        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <TouchableOpacity
          style={{
            left: 5,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Ionicon
            name="ios-chevron-back-outline"
            size={30}
            style={{ color: "#2F80ED", opacity: 0 }}
          />
          <Text style={{ opacity: 0 }}>Back</Text>
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else if (signup) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#1d3679",
          elevation: -1,
        }}
      >
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />

        <TouchableOpacity
          style={{ right: 22 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else if (profile) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#142A4F",
          elevation: 0,
        }}
      >
        <Appbar.Action
          style={styles.leftAction}
          animated={false}
          icon={() => (
            <Icon name="setting" size={30} style={{ color: "white" }} />
          )}
          onPress={() => navigation.navigate("Setting")}
        />

        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />

        <Appbar.Action
          style={styles.rightAction}
          animated={false}
          icon={() => <Feather name="chevron-down" size={30} color="white" />}
          onPress={() => navigation.goBack(null)}
        />
      </Appbar.Header>
    );
  } else if (setting) {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#142A4F",
          elevation: 0,
        }}
      >
        <Appbar.Action
          style={styles.leftAction}
          animated={false}
          icon={() => (
            <Avatar.Image
              size={40}
              source={{
                uri: "https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png",
              }}
            />
          )}
          onPress={() => navigation.navigate("User")}
        />
        <Appbar.Content
          style={styles.headerStyle}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <Appbar.Action
          style={styles.rightAction}
          animated={false}
          icon={() => <Feather name="chevron-down" size={30} color="white" />}
          onPress={() => navigation.goBack(null)}
        />
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header
        statusBarHeight={barHeight}
        style={{
          backgroundColor: "#fff",
          elevation: 0,
        }}
      >
        <Appbar.Action
          style={styles.leftAction}
          animated={false}
          icon={() => (
            <Avatar.Image
              size={40}
              source={{
                uri: "https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png",
              }}
            />
          )}
          onPress={() => navigation.navigate("User")}
        />

        <Appbar.Content
          style={[styles.headerStyle]}
          title={<Text style={styles.title}>{title}</Text>}
        />
        <Appbar.Action
          style={styles.rightAction}
          animated={false}
          icon={() => {
            if (challenge) {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateChallengeTags")}
                  style={styles.plusButton}
                >
                  <AntDesign name="plus" size={25} color="black" />
                </TouchableOpacity>
              );
            } else {
              return r();
            }
          }}
          onPress={() => navigation.navigate("User")}
        />
      </Appbar.Header>
    );
  }
};
const styles = StyleSheet.create({
  challengeInfoBack: {
    fontSize: 17,
    color: "#2F80ED",
    fontWeight: "500",
    marginVertical: 5,
  },
  headerStyle: {
    // alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "300",
  },
  logOutButton: {
    fontSize: 17,
    color: "#2F80ED",
    fontWeight: "500",
  },
  nextButtonGustav: {
    right: width / 20,
    fontSize: 20,
    color: "#0288d1",
  },
  backButton: {
    color: "#0288d1",
    alignSelf: "center",
    fontSize: 18,
  },

  backButtonGustav: {
    left: width / 20,
    fontSize: 20,
    color: "#0288d1",
  },
  tagPageContainerGustav: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  leftAction: {
    left: width / 28,
  },
  rightAction: {
    right: width / 28,
  },
});

export default CustomHeader;
