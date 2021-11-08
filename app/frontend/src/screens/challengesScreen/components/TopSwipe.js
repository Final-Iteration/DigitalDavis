import React, { useState, useEffect } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import ChallengeBox from "./ChallengeBox";
import { TabView, SceneMap } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";
import axios from "../../../axios";
import { cc, pc, ac } from "./MockData";
const baseURL =
  "http://2bf0-2601-204-e780-d390-b00f-3872-a6cf-3210.ngrok.io/api/challenges";

const TopSwipe = ({ props }) => {
  const [allChallenges, setAllChallenge] = useState([]);
  const [pastChallenges, setPastChallenges] = useState([]);
  const [currentChallenges, setCurrentChallenges] = useState([]);
  useEffect(() => {
    async function getAllChallenges() {
      try {
        const res = await axios.get("/challenges");
        console.log("-----ALL Challenges-----");
        console.log(res.data);
        setAllChallenge(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getAllChallenges();
  }, []);
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
    if (ac.length === 0) {
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
  useEffect(() => {
    async function getCurrentChallenges() {
      try {
        const res = await axios.get("/challenges/active");
        console.log("-----Current Challenges-----");
        console.log(res.data);
        setCurrentChallenges(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentChallenges();
  }, []);

  const SecondRoute = () => {
    if (currentChallenges.length === 0) {
      return defaultNoChallenge("Current");
    } else {
      console.log(currentChallenges);
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

  useEffect(() => {
    async function getCurrentChallenges() {
      try {
        const res = await axios.get("/challenges/past");
        console.log("-----Past Challenges-----");
        console.log(res.data);
        setPastChallenges(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentChallenges();
  }, []);

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
          style={{ backgroundColor: "#f2f2f2", flex: 0.09 }}
          indicatorStyle={{ backgroundColor: "#142A4F" }}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: "black", margin: 8, fontSize: 15 }}>
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
    fontSize: 16,
  },
});
export default TopSwipe;
