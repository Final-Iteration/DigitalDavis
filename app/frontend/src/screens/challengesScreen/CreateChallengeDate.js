import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, TextInput,} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

const CreateChallengeDate = () => {
    // const [date, setDate] = useState(new Date())
    // const [open, setOpen] = useState(false)
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [locationLength, setLocationLength] = useState(50);

    const textInputCount = (text) => {
        setLocationLength(50 - text.length) 
    };

    return (
        <View style = {styles.container}>
            <ProgressBar progress={0.50} color={Colors.blue600} />
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"always"}
                extraScrollHeight={30}
                
            >
                <Text style = {styles.headerText}>
                    Select when and where to begin your challenge!
                </Text>
                <Text style = {styles.datesText}>
                    Start Date
                </Text>
                {/* START DATE CODE GOES HERE */}
                <Text style = {styles.datesText}>
                    End Date
                </Text>
                {/* END DATE CODE GOES HERE */}
                <Text style = {styles.datesText}>
                    Location
                </Text>
                
                <TextInput 
                    style={styles.locationBox}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={location}
                    onChangeText={(text) => {setLocation(text); textInputCount(text);}}
                />
                <Text style = {styles.locationLength}>
                    {locationLength}
                </Text>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: width / 25,
        top: height / 50
    },
    datesText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: width / 25,
        marginTop: height / 10
    },
    locationBox:{
        borderRadius: 10,
        width: width / 1.1,
        height: height / 20,
        marginHorizontal: width / 25,
        borderWidth: width / 300,
        padding: width / 50,
        borderColor: '#D3D3D3',
        marginTop: height / 50
    },
    container:{
        flex: 1
    },
    locationLength:{
        alignSelf: 'flex-end',
        marginRight: width / 18,
        top: height / 80
    },
});

export default CreateChallengeDate;