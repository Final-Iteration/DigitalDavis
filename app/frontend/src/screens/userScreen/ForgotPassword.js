import React,{useState} from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert} from 'react-native';

const { width, height } = Dimensions.get('window');

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [inputValidate, setInputValidate] = useState(false);

    // a function that validates an email to the format of name@domain.com
    function validateEmail(email) {
        const regexp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const test = regexp.test(email);
        return regexp.test(email);
    }

    const resetPasswordAlert = () => {
        Alert.alert(
            "Reset Password",
            `An email has been sent to ${email}. Click the link included in that message to reset your password.`,
            [
                {
                    text: 'OK',
                    onPress:() => props.navigation.navigate('Login'),
                    // blankEmailCheck()
                }
            ]
        );
    };

    return (
        <View style = {styles.topTextContainer}>
            <Text style = {styles.topText}>
                Please enter your email address, and we'll send you
            </Text>
            <Text style = {styles.topText}>
                info on how to reset your password.
            </Text>
            <TextInput
                style={styles.emailBox}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
                value={email}
                onChangeText={(text) => {setEmail(text); setInputValidate(validateEmail(text))}}
            />
            <TouchableOpacity style = {inputValidate ? styles.invalidEmail : styles.resetPasswordButton} onPress={resetPasswordAlert}>
                <Text style = {inputValidate ? styles.validEmailText : styles.resetPasswordText}>
                    Reset Password
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    topTextContainer:{
        marginTop: height / 60,
    },
    topText:{
        alignSelf: 'center',
        fontWeight: '300',
    },
    emailBox:{
        height: height / 16,
        borderRadius: 5,
        backgroundColor: '#F6F6F6', 
        marginHorizontal: width / 20,
        fontSize: 17,
        padding: height / 50,
        top: height / 50,
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
    },
    resetPasswordButton:{
        height: height / 16,
        borderRadius: 5,
        backgroundColor: '#E4E4E4', 
        marginHorizontal: width / 20,
        padding: height / 50,
        top: height / 30,
    },
    invalidEmail:{
        height: height / 16,
        borderRadius: 5,
        backgroundColor: '#142A4F', 
        marginHorizontal: width / 20,
        padding: height / 50,
        top: height / 30,
    },
    resetPasswordText:{
        fontWeight: '300',
        alignSelf: 'center',
        fontSize: 17,
    },
    validEmailText: {
        fontWeight: '300',
        alignSelf: 'center',
        fontSize: 17,
        color: 'white'
    }
});

export default ForgotPassword;