import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const CreateChallengeDate = () => {
    return (
        <View>
            <Text>
                Challenge Date Picker Page
            </Text>
        </View>
    );
};

const style = StyleSheet.create({
    text:{
        marginTop: height / 6,
    }
});

export default CreateChallengeDate;