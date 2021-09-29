import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { View, Image, Dimensions, StyleSheet } from 'react-native';

//bottom tab
import ChallengeStack from './ChallengesNavigator';
import FormularyStack from './FormularyNavigator';
import InsightStack from './InsightsNavigator';
import KnowledgeStack from './KnowledgeNavigator';
import SearchStack from './SearchNavigator';

const { height, width } = Dimensions.get('window');

const MainBottomTab = createBottomTabNavigator(
  {
    InsightStack: {
      screen: InsightStack,
      navigationOptions: {
        tabBarLabel: 'Insights',
        tabBarIcon: ({}) => (
          <View>
            <Image
              source={require('../../assets/InsightsLogo.png')}
              style={styles.image}
            />
          </View>
        ),
      },
    },
    Formulary: {
      screen: FormularyStack,
      navigationOptions: {
        tabBarLabel: 'Formulary',
        tabBarIcon: ({}) => (
          <View>
            <Image
              source={require('../../assets/FormularyLogo.png')}
              style={styles.image}
            />
          </View>
        ),
      },
    },
    SearchStack: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({}) => (
          <View>
            <Image
              source={require('../../assets/SearchLogo.png')}
              style={styles.image}
            />
          </View>
        ),
      },
    },
    Challenge: {
      screen: ChallengeStack,
      navigationOptions: {
        tabBarLabel: 'Challenge',
        tabBarIcon: ({}) => (
          <View>
            <Image
              source={require('../../assets/ChallengeLogo.png')}
              style={styles.image}
            />
          </View>
        ),
      },
    },
    KnowledgeStack: {
      screen: KnowledgeStack,
      navigationOptions: {
        tabBarLabel: 'Knowledge',
        tabBarIcon: ({}) => (
          <View>
            <Image
              source={require('../../assets/KnowledgeLogo.png')}
              style={styles.image}
            />
          </View>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        position: 'absolute',
      },
    },
  }
);

const styles = StyleSheet.create({
  image: {
    width: isNaN(width) ? 32 : width / 15,
    height: isNaN(width) ? 32 : width / 15,
  },
});
export default MainBottomTab;
