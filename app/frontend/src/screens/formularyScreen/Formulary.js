import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Formulary = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.gif}
          source={{
            uri: "http://mauelementaryschool.weebly.com/uploads/8/2/5/7/8257419/141858_orig.gif",
          }}
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
    height: "100%",
    width: "100%",
  },
});

export default Formulary;
