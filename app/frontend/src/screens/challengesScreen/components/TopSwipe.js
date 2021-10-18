import React, { useState, useEffect } from 'react';

import {
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
import axios from 'axios';
const baseURL = 'http://0ebf-2601-204-e780-d390-21c6-7498-b775-c0b1.ngrok.io/api/challenges';

const TopSwipe = ({ props }) => {
  const [allChallenges, setAllChallenge] = useState([]);
  const [pastChallenges, setPastChallenges] = useState([]);
  const [currentChallenges, setCurrentChallenged] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      try {
        const res = await axios.get(baseURL);
        console.log(res.data);
        setAllChallenge(res.data.results); 
        //set allChallenges to whatever is returned from the API call
        //we will also do this for setPastChallenges and setCurrentChallenges
      } catch (error) {
        console.log(error);
      }
    }

    fetchAPI();
  }, []);

  const FirstRoute = () => (
    <FlatList
      data={allChallenges}
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
              title={item.name}
              description={item.description}
              image={
                // eslint-disable-next-line max-len
                'https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ'
              }
              status={'participating'}
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
