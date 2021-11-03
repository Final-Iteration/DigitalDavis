import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

const CreateChallengeDate = () => {
  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [locationLength, setLocationLength] = useState(50);

  const textInputCount = (text) => {
    setLocationLength(50 - text.length);
  };

  return (
    <View style={styles.containerDates}>
      <ProgressBar progress={0.5} color={Colors.blue600} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        extraScrollHeight={30}
      >
        <Text style={styles.headerTextDate}>
          Select when and where to begin your challenge!
        </Text>
        <View
          style={{
            top: height / 15,
            height: 150,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.dateDropDown}>
            <Text style={styles.datesText}>Start Date</Text>
            <RNDateTimePicker
              disabled={false}
              style={styles.datePickerStyle}
              testID="dateTimePicker"
              value={startDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setStartDate(selectedDate);
              }}
            />
          </View>

          {/* START DATE CODE GOES HERE */}
          <View style={styles.dateDropDown}>
            <Text style={styles.datesText}>End Date</Text>
            <RNDateTimePicker
              disabled={false}
              style={styles.datePickerStyle}
              testID="dateTimePicker"
              value={endDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setEndDate(selectedDate);
              }}
            />
          </View>
        </View>

        {/* END DATE CODE GOES HERE */}
        <View style={styles.location}>
          <Text style={[styles.datesText, { top: width / 21 }]}>Location</Text>
          <TextInput
            maxLength={50}
            style={styles.locationBox}
            autoCapitalize="none"
            autoCorrect={false}
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              textInputCount(text);
            }}
          />
          <Text style={styles.locationLength}>{locationLength}</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextDate: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: width / 25,
    top: height / 50,
  },
  datesText: {
    fontSize: 22,
    fontWeight: "bold",
    top: 6,
  },
  location: {
    top: height / 10,
    marginHorizontal: width / 25,
    justifyContent: "space-between",
  },
  locationBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 20,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: "#D3D3D3",
    marginTop: height / 45,
  },
  containerDates: {
    flex: 1,
  },
  locationLength: {
    alignSelf: "flex-end",
    marginRight: width / 18,
    top: height / 80,
  },
  dateDropDown: {
    flexDirection: "row",
    marginHorizontal: width / 25,

    justifyContent: "space-between",
  },
  datePickerStyle: {
    height: 45,
    width: 124,
  },
});

export default CreateChallengeDate;
