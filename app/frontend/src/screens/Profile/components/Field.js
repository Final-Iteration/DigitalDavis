import React from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { Divider } from "react-native-elements";

const { height, width } = Dimensions.get("window");
const Field = ({ title, text, setting, callback }) => {
  let canEdit;
  if (setting) {
    canEdit = true;
  } else {
    canEdit = false;
  }
  return (
    <View style={styles.parent}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.fieldTitle}>{title}</Text>
        {setting ? <Text style={styles.changeButton}>Change</Text> : null}
      </View>
      <View style={{ bottom: 35, position: "absolute" }}>
        <TextInput
          style={{ fontSize: 19 }}
          value={text}
          onChangeText={(text) => callback(text)}
          editable={canEdit}
          selectTextOnFocus={canEdit}
        />
        <View style={{ width: width - 80, top: 10 }}>
          <Divider orientation="horizontal" width={3} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    left: 0,
    position: "absolute",
    fontSize: 18,
    opacity: 0.5,
  },
  changeButton: {
    fontSize: 18,
    opacity: 0.5,
    right: 0,
    position: "absolute",
    opacity: 0.5,
  },
  parent: {
    width: width - 80,
    height: height / 10,
    flexDirection: "column",
    alignSelf: "center",
  },
});
export default Field;
