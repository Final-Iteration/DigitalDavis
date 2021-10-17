import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import ChallengeBox from './ChallengeBox';
import { TabView, SceneMap } from 'react-native-tab-view';
import { curChallenge, pastChallenge, allChallenge } from './MockData';
import { TabBar } from 'react-native-tab-view';

const baseURL = 'http://localhost:3005/api/challenges/';

const TopSwipe = ({ props }) => {
  const [allChallenges, setAllChallenge] = useState([]);

  
  async function getChallengesListNoId() {
    try {
      const res = await axios.get('http://localhost:3005/api/challenges/');
      console.log(res.data);
      setAllChallenge(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  getChallengesListNoId();
  const FirstRoute = () => (
    <FlatList
      data={allChallenge}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onLongPress={() => {
              console.log('pressed');
            }}
            onPress={() =>
              props.navigation.navigate('ChallengeInformation', {
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
            activeOpacity={1}
            onPress={() =>
              props.navigation.navigate('ChallengeInformation', {
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
            onPress={() =>
              props.navigation.navigate('ChallengeInformation', {
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
    { key: 'first', title: 'ALL' },
    { key: 'second', title: 'CURRENT' },
    { key: 'third', title: 'PAST' },
  ]);

  return (
    <TabView
      tabStyle={{ backgroundColor: 'red' }}
      swipeEnabled={false}
      style={styles.container}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: '#f2f2f2', flex: 0.09 }}
          indicatorStyle={{ backgroundColor: '#142A4F' }}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: 'black', margin: 8, fontSize: 15 }}>
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
    backgroundColor: '#f2f2f2',
  },
});
export default TopSwipe;
