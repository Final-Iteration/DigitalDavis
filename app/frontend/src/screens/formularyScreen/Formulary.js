import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Formulary = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: 'center' }}>This is the Formulary screen</Text>
      <Button
        title="search formulary"
        onPress={() => {
          props.navigation.navigate('SearchedFormulary');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Formulary;
