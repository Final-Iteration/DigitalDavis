import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Knowledge = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.gif}
          source={require("../../../assets/output-onlinegiftools.gif")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    marginTop: "50%",
  },
  gif: {
    height: "90%",
    width: "100%",
  },
});

export default Knowledge;
