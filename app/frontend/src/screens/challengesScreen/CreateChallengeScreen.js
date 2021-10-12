import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get("window");

const CreateChallengeScreen = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <TextInput
                style = {styles.challengeTitle} 
                autoCapitalize = "none"
                autoCorrect = {false}
                placeholder = "Challenge Title"
            />
            <View style = {styles.firstDivider}/>
            <TextInput
                style = {styles.description} 
                autoCapitalize = "none"
                autoCorrect = {false}
                placeholder = "Description"
            />
            <View style = {styles.secondDivider}/>
            <TextInput
                style = {styles.detailsOfChallenge} 
                autoCapitalize = "none"
                autoCorrect = {false}
                placeholder = "Details of Challenge"
            />
            <View style = {styles.thirdDivider}/>
            <View style = {styles.dateContainer}>
                <TextInput
                    style = {styles.startDate} 
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    placeholder = "Start Date"
                />
                <TextInput
                    style = {styles.endDate} 
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    placeholder = "End Date"
                />
            </View>
            <View style = {styles.dateContainer}>
                <View style = {styles.startDateDivider}/>
                <View style = {styles.endDateDivider}/>
            </View>
            <TouchableOpacity style = {styles.createButton} onPress={() => props.navigation.navigate("Challenge")}>
                <Text style = {styles.createText}>
                    Create Challenge
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        marginTop: height / 6
    },
    challengeTitle:{
        height: height / 17,
        borderRadius: 5,
        marginHorizontal: width / 10,
        fontSize: 18,
    },
    description:{
        height: height / 17,
        borderRadius: 5,
        marginHorizontal: width / 10,
        fontSize: 18,
        bottom: height / 30
    },
    detailsOfChallenge:{
        height: height / 17,
        borderRadius: 5,
        marginHorizontal: width / 10,
        fontSize: 18,
        bottom: height / 15
    },
    dateContainer:{
        flexDirection: 'row'
    },
    startDate:{
        height: height / 17,
        width: width / 2.9,
        borderRadius: 5,
        marginLeft: width / 10,
        fontSize: 18,
        bottom: height / 10
    },
    endDate:{
        height: height / 17,
        width: width / 2.8,
        borderRadius: 5,
        marginLeft: width / 10,
        fontSize: 18,
        bottom: height / 10
    },
    firstDivider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 100,
        margin: width / 10,
        bottom: height / 100
    },
    secondDivider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 100,
        margin: width / 10,
        bottom: height / 23
    },
    thirdDivider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 100,
        margin: width / 10,
        bottom: height / 13
    },
    startDateDivider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 100,
        margin: width / 10,
        bottom: height / 9,
        width: width / 2.9
    },
    endDateDivider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 100,
        margin: width / 10,
        bottom: height / 9,
        width: width / 2.8,
        right: width / 10
    },
    createButton:{
        alignSelf:'center',
        bottom: height / 7.5,
        backgroundColor: '#ECECEC',
        borderRadius: 4,
        padding: width / 50
    },
    createText:{
        fontSize: 20,
        fontWeight: '300'
    }
});

export default CreateChallengeScreen;