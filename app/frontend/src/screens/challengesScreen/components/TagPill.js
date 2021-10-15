import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TagPill = ({ tag }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#142A4F',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: '#142A4F',
  },
  tagText: {
    fontSize: 17,
    margin: 9,
    color: 'white',
    alignSelf: 'center',
  },
});

export default TagPill;
