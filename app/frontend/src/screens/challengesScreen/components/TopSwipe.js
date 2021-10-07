import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import ChallengeBox from "./ChallengeBox";
import { TabView, SceneMap } from "react-native-tab-view";
import { curChallenge, pastChallenge, allChallenge } from "./MockData";
import { TabBar } from "react-native-tab-view";

const TopSwipe = ({ props }) => {
  const FirstRoute = () => (
    <FlatList
      data={allChallenge}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onLongPress={() => {
              null;
            }}
            onPress={() =>
              props.navigation.navigate("ChallengeInformation", {
                challenge: item,
              })
            }
          >
            <ChallengeBox
              current={true}
              title={item.title}
              description={item.shortDescr}
              image={item.image}
              status={item.status}
            />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={curChallenge}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onLongPress={() => {
              null;
            }}
            onPress={() =>
              props.navigation.navigate("ChallengeInformation", {
                challenge: item,
              })
            }
          >
            <ChallengeBox
              current={true}
              title={item.title}
              description={item.shortDescr}
              image={item.image}
              status={item.status}
            />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
  const ThirdRoute = () => (
    <FlatList
      data={pastChallenge}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onLongPress={() => {
              null;
            }}
            onPress={() =>
              props.navigation.navigate("ChallengeInformation", {
                challenge: item,
              })
            }
          >
            <ChallengeBox
              current={true}
              title={item.title}
              description={item.shortDescr}
              image={item.image}
              status={item.status}
            />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ALL" },
    { key: "second", title: "CURRENT" },
    { key: "third", title: "PAST" },
  ]);

  return (
    <TabView
      tabStyle={{ backgroundColor: "red" }}
      swipeEnabled={true}
      style={styles.container}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "#f2f2f2" }}
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
});
export default TopSwipe;
