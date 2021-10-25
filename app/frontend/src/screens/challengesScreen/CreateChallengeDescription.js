import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const CreateChallengeDescription = () => {
    return (
        <View>
            <Text>
                Challenge Description Page
            </Text>
        </View>
    );
};

const style = StyleSheet.create({
    text:{
        marginTop: height / 6,
    }
});

export default CreateChallengeDescription;