import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Knowledge = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: 'center' }}>This is the Knowledge screen</Text>
      <Button
        title="search knowledge"
        onPress={() => {
          props.navigation.navigate('SearchedKnowledge');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Knowledge;
