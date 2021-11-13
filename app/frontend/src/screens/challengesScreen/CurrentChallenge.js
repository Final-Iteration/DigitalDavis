import React, { useState, useEffect, useCallback } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ChallengeBox from "./components/ChallengeBox";
import { TabView, SceneMap } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";
import axios from "../../axios";
const asyncStorage = require("../../asyncStorage");
const { height, width } = Dimensions.get("window");
const CurrentChallenges = (props) => {
  const [allChallenges, setAllChallenge] = useState([]);
  const [pastChallenges, setPastChallenges] = useState([]);
  const [currentChallenges, setCurrentChallenges] = useState([]);
  //to delete: to be REMOVED
  // const del = async () => {
  //   try {
  //     const id = await asyncStorage.getData("ID");
  //     const authToken = await asyncStorage.getData("Authorization");
  //     const getAllChallenges = await axios.delete(
  //       "/challenges/618efb56702eb8a36c4d370a",
  //       {
  //         headers: {
  //           id: id,
  //           Authorization: authToken,
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const getAllChallenges = async () => {
    try {
      const id = await asyncStorage.getData("ID");
      const authToken = await asyncStorage.getData("Authorization");
      const getAllChallenges = await axios.get("/challenges", {
        headers: {
          id: id,
          Authorization: authToken,
        },
      });
      const getCurrentChallenges = await axios.get("/challenges/active", {
        headers: {
          id: id,
          Authorization: authToken,
        },
      });
      const getPastChallenges = await axios.get("/challenges/past", {
        headers: {
          id: id,
          Authorization: authToken,
        },
      });
      console.log(getAllChallenges.data.results);
      setAllChallenge(getAllChallenges.data.results);
      setCurrentChallenges(getCurrentChallenges.data);
      setPastChallenges(getPastChallenges.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllChallenges();
      // del();
      return () => {
        setAllChallenge([]);
      };
    }, [])
  );

  const defaultNoChallenge = (currentTab) => {
    switch (currentTab) {
      case "All":
        return (
          <Text style={styles.defaultText}>
            There is currently no active challenges to display
          </Text>
        );
      case "Current":
        return (
          <Text style={styles.defaultText}>
            You are not currently participating in any challenges
          </Text>
        );
      case "Past":
        return (
          <Text style={styles.defaultText}>
            You have not completed any challenges
          </Text>
        );
    }
  };

  const FirstRoute = () => {
    //if there is no challenges to display
    if (allChallenges.length === 0) {
      return defaultNoChallenge("All");
    } else {
      return (
        <FlatList
          data={allChallenges}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  props.navigation.navigate("ChallengeInformation", {
                    challenge: item,
                    disableButton: false,
                  })
                }
              >
                <ChallengeBox
                  current={true}
                  title={item.name}
                  description={item.description}
                  image={
                    // eslint-disable-next-line max-len
                    "https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ"
                  }
                  status={"participating"}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };

  const SecondRoute = () => {
    if (currentChallenges.length === 0) {
      return defaultNoChallenge("Current");
    } else {
      return (
        <FlatList
          data={currentChallenges}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  props.navigation.navigate("ChallengeInformation", {
                    challenge: item,
                    disableButton: false,
                  })
                }
              >
                <ChallengeBox
                  current={true}
                  title={item.name}
                  description={item.description}
                  image={
                    "https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ"
                  }
                  status={"participating"}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };

  const ThirdRoute = () => {
    if (pastChallenges.length === 0) {
      return defaultNoChallenge("Past");
    } else {
      return (
        <FlatList
          data={pastChallenges}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  props.navigation.navigate("ChallengeInformation", {
                    challenge: item,
                    disableButton: true,
                  })
                }
              >
                <ChallengeBox
                  current={true}
                  title={item.name}
                  description={item.description}
                  image={
                    "https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ"
                  }
                  status={"participating"}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Current" },
    { key: "third", title: "Past" },
  ]);

  return (
    <TabView
      tabStyle={{ backgroundColor: "red" }}
      swipeEnabled={false}
      style={styles.container}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "#f2f2f2", flex: 0.08 }}
          indicatorStyle={{ backgroundColor: "#142A4F" }}
          renderLabel={({ route, focused, color }) => (
            <Text
              style={{
                color: "black",
                fontSize: width * 0.043,
              }}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
  },
  defaultText: {
    marginVertical: "50%",
    alignSelf: "center",
    fontSize: width * 0.04,
  },
});
export default CurrentChallenges;
