import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Image, Dimensions, StyleSheet } from 'react-native';

//bottom tab
import ChallengeStack from './ChallengesNavigator';
import FormularyStack from './FormularyNavigator';
import InsightStack from './InsightsNavigator';
import KnowledgeStack from './KnowledgeNavigator';
import SearchStack from './SearchNavigator';

const { height, width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const MainBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        headerShown: false,
        keyboardHidesTab: true,
        showLabels: false,
        activeTintColor: '#0288d1',
      }}
    >
      <Tab.Screen
        name="InsightStack"
        component={InsightStack}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({}) => (
            <View>
              <Image
                source={require('../../assets/InsightsLogo.png')}
                style={styles.image}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Formulary"
        component={FormularyStack}
        options={{
          tabBarLabel: 'Formulary',
          tabBarIcon: ({}) => (
            <View>
              <Image
                source={require('../../assets/FormularyLogo.png')}
                style={styles.image}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({}) => (
            <View>
              <Image
                source={require('../../assets/SearchLogo.png')}
                style={styles.image}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Challenge"
        component={ChallengeStack}
        options={{
          tabBarLabel: 'Challenge',
          tabBarIcon: ({}) => (
            <View>
              <Image
                source={require('../../assets/ChallengeLogo.png')}
                style={styles.image}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="KnowledgeStack"
        component={KnowledgeStack}
        options={{
          tabBarLabel: 'Knowledge',
          tabBarIcon: ({}) => (
            <View>
              <Image
                source={require('../../assets/KnowledgeLogo.png')}
                style={styles.image}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  image: {
    width: width / 15,
    height: width / 15,
  },
});
export default MainBottomTab;
