import React from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
const JoinBanner = (icon = "unjoined", style = {}, customProps = {}) => {
  return (
    <View
      style={{
        width: width - 65,
        alignItems: "center",
        top: 4,
      }}
    >
      <View style={styles.container}>
        <Icon name="checkcircleo" size={23} style={{ color: "white" }} />
        <Text style={styles.text}>Successfully Joined Challenge</Text>
      </View>
    </View>
  );

  return renderFlashMessageIcon(icon, style, customProps);
};
const styles = StyleSheet.create({
  container: {
    bottom: 5,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "white",
    left: 9,
    top: 2,
  },
});

export default JoinBanner;
