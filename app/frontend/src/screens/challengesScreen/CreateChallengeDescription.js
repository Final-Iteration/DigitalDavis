import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import { ProgressBar, Colors, } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get('window');

const CreateChallengeDescription = () => {
    
    const [nameLength, setInputLength] = useState(30);
    const [descriptionLength, setDescriptionLength] = useState(250);
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');

    const textInputCounts = (prop, text) => {
        if (prop == 'name'){
            setInputLength(30 - text.length)
        }else{
            setDescriptionLength(250 - text.length)
        }
        
    };

    return (
        <View style = {styles.containerDescription}>
            <ProgressBar progress={0.75} color={Colors.blue600} />
            <KeyboardAwareScrollView
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"always"}
            extraScrollHeight={20}
            >
                <Text style = {styles.headerTextDescription}>
                    Give your challenge a name and description. 
                </Text>
                <Text style = {styles.secondHeaderTextDescription}>
                    Don't worry about it too much you can change it later. 
                </Text>
                <Text style = {styles.nameAndDescriptionText}>
                    Name
                </Text>
                <TextInput 
                    maxLength={30}
                    style={styles.nameBox}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={challengeName}
                    onChangeText={(text) => {setChallengeName(text); textInputCounts('name', text);}}
                />
                <Text style = {styles.inputLengths}>
                    {nameLength}
                </Text>
                <Text style = {styles.nameAndDescriptionText}>
                    Description
                </Text>
                <TextInput 
                    maxLength={250}
                    multiline={true}
                    style={styles.descriptionBox}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={challengeDescription}
                    onChangeText={(text) => {setChallengeDescription(text); textInputCounts('',text);}}
                />
                <Text style = {styles.inputLengths}>
                    {descriptionLength}
                </Text>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTextDescription:{
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: width / 25,
        marginTop: height / 50
    },
    secondHeaderTextDescription: {
        marginHorizontal: width / 25,
        fontWeight: '300',
        marginTop: height / 20
    },
    nameAndDescriptionText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: width / 25,
        marginTop: height / 20
    },
    containerDescription: {
        flex: 1
    },
    inputLengths: {
        alignSelf: 'flex-end',
        marginRight: width / 18,
        top: height / 80
    },
    nameBox:{
        borderRadius: 10,
        width: width / 1.1,
        height: height / 25,
        marginHorizontal: width / 25,
        borderWidth: width / 300,
        padding: width / 50,
        borderColor: '#D3D3D3',
        marginTop: height / 50
    },
    descriptionBox:{
        borderRadius: 10,
        width: width / 1.1,
        height: height / 6,
        marginHorizontal: width / 25,
        borderWidth: width / 300,
        padding: width / 50,
        borderColor: '#D3D3D3',
        marginTop: height / 50,
    }
});

export default CreateChallengeDescription;