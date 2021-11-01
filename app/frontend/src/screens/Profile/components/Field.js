import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import DatePicker from '@react-native-community/datetimepicker';

const { height, width } = Dimensions.get('window');
const Field = ({ title, text, setting, callback, dob }) => {
  let canEdit;
  if (setting) {
    canEdit = true;
  } else {
    canEdit = false;
  }
  return (
    <View style={styles.parent}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.fieldTitle}>{title}</Text>
        {setting ? <Text style={styles.changeButton}>Change</Text> : null}
      </View>
      <View style={{ bottom: 35, top: 5 }}>
        {dob ? (
          <DatePicker
            mode="date" //The enum of date, datetime and time
            value={text} //initial date from state
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              callback(date);
            }}
          />
        ) : (
          <TextInput
            style={{ fontSize: 19 }}
            value={text}
            onChangeText={(text) => callback(text)}
            editable={canEdit}
            selectTextOnFocus={canEdit}
          />
        )}

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
    fontSize: 18,
    opacity: 0.5,
  },
  changeButton: {
    fontSize: 18,
    opacity: 0.5,
    right: 0,
    position: 'absolute',
    opacity: 0.5,
  },
  parent: {
    width: width - 80,
    height: height / 10,
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
export default Field;
