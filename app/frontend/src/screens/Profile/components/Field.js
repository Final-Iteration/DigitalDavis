import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
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
      <View style={styles.indivField}>
        {dob ? (
          <DatePicker
            mode="date" //The enum of date, datetime and time
            value={new Date(text)} //initial date from state
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onChange={callback}
          />
        ) : (
          <TextInput
            style={{ fontSize: width * 0.045 }}
            value={text}
            onChangeText={(text) => callback(text)}
            editable={canEdit}
            selectTextOnFocus={canEdit}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indivField: {
    borderBottomWidth: 0.5,
  },
  fieldTitle: {
    left: 0,
    fontSize: width * 0.045,
    opacity: 0.5,
  },
  changeButton: {
    fontSize: width * 0.045,
    opacity: 0.5,
    right: 0,
    position: 'absolute',
  },

  parent: {
    width: width - 80,
    marginVertical: height / 40,
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
export default Field;
