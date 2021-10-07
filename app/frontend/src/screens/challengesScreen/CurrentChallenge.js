import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import TopSwipe from "./components/TopSwipe";

const CurrentChallenges = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSwipe props={props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CurrentChallenges;
