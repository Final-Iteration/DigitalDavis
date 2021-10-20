import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const CreateChallengeScreenTags = () => {
    return (
        <View>
            <Text style = {styles.text}>
                Challenge Tags Page
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        marginTop: height / 6,
    }
});

export default CreateChallengeScreenTags;