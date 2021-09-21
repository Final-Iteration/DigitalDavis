import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Search = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>This is the Search screen</Text>
      <Button
        title="searched search"
        onPress={() => {
          props.navigation.navigate("SearchedSearch");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Search;
