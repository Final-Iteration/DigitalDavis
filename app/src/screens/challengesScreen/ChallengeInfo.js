import React from "react";
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView} from 'react-native';
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");
const imageSource = require("cd ../../../../assets/yoga.png");

const ChallengeInfo = (props) => {

    return (
        <View style = {styles.container}>
            <StatusBar style = "dark"/>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>
                    Yoga For Beginners!
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("Challenge")}>
                    <Text style = {styles.backButton}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <Image 
                style = {styles.image}   
                //replace this hard coded image with the image uri's when we get them
                source={imageSource}
            />
            <ScrollView>
                <Text style = {styles.description}>
                    Are you new to yoga? You've found the best place to start your yoga journey.
                    The benefits of yoga are there for you: You can develop a strong, healthy body. You can enjoy a clear, calm mind.
                    You can live with a sense of purpose, love, and connection.
                </Text>
                <View style = {styles.lineContainer}>
                    <View style={styles.drawnLine}/>
                </View>
                <Text style = {styles.middleHeader}>
                    The Five Key Aspects of Yoga
                </Text>
                <Text style = {styles.middleText}>
                    Concentration: You will learn to focus and concentrate on the teacher's words and practice mindful breathing.
                    Consistency: Plan to take a class 2 to 3 times per week so you will see and feel the benefits of your work.
                    Determination: No problem if you fall out of a posture. Keep getting back in to build up your will power and stamina. You will get better each day.
                    Patience: Notice not only the changes in your postures. Confidence and faith in yourself will serve you a lifetime!
                    Intensity: Every day is a new chance to try your BEST. It's never to late to begin again. Enjoy the journey.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row-reverse',
    },
    container:{
        marginTop: height / 15,
        flex: 1
    },
    image: {
        borderRadius: 8,
        width: width / 1.05,
        height: height / 4.5,
        margin: width / 40,
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        color: 'black',
        paddingRight: width / 5.5
    },
    description:{
        fontSize: 18,
        fontWeight: '300',
        margin: width / 30,
    },
    drawnLine:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: height / 80,
        marginBottom: height / 80
    },
    lineContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: width / 20
    },
    backButton:{
        top: height / 200,
        fontSize: 20,
        color:'#147efb',
        marginHorizontal: width / 13
    },
    middleHeader:{
        fontSize: 18,
        fontWeight: '400',
        margin: width / 30,
        alignSelf: 'center',
    },
    middleText:{
        fontSize: 18,
        fontWeight: '300',
        marginHorizontal: width / 30,
    },
});

export default ChallengeInfo;