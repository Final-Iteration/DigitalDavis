import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { Divider } from "react-native-elements";
import { ProgressBar, Colors } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const { width, height } = Dimensions.get('window');

const CreateChallengeScreenTags = () => {
    const [selectAllTags, setSelectAllTags] = useState(false);
    const [emotionalTag, setEmotionalTag] = useState(false);
    const [environmentalTag, setEnvironmentalTag] = useState(false);
    const [intellectualTag, setIntellectualTag] = useState(false);
    const [physicalTag, setPhysicalTag] = useState(false);
    const [socialTag, setSocialTag] = useState(false);
    const [spiritualTag, setSpiritualTag] = useState(false);

    const [challengeTags, setChallengeTags] = useState([
        {tagName: 'Emotional', id: '1'},
        {tagName: 'Environmental', id: '2'},
        {tagName: 'Intellectual', id: '3'},
        {tagName: 'Physical', id: '4'},
        {tagName: 'Social', id: '5'},
        {tagName: 'Spiritual', id: '6'},
    ]);

    const toggleAll = () => {
        if (selectAllTags === true){
            setEmotionalTag(false);
            setEnvironmentalTag(false);
            setIntellectualTag(false);
            setPhysicalTag(false);
            setSocialTag(false);
            setSpiritualTag(false);
        }else{
            setEmotionalTag(true);
            setEnvironmentalTag(true);
            setIntellectualTag(true);
            setPhysicalTag(true);
            setSocialTag(true);
            setSpiritualTag(true);
        }
    };

    return (
        <View>
            <ProgressBar progress={0.33} color={Colors.blue600} />
            <Text style = {styles.headerText}>
                Which domain of wellness does your challenge belong to?
            </Text>
            {/* <FlatList 
                keyExtractor = {(item) => item.id}
                data = {challengeTags}
                renderItem = {({item}) => (
                    <Text style = {styles.tagText}>{item.tagName}</Text>
                )}
            /> */}
            <View style = {styles.tagTextContainer}>
                <TouchableOpacity onPress = {() => {setSelectAllTags(!selectAllTags); toggleAll();} }>
                    <View style = {styles.iconTextConainer}>
                        <Entypo  style = {styles.iconStyle} name="chevron-with-circle-down" size={24} color= {selectAllTags ? '#0288d1' : 'black'} />
                        <Text style = {selectAllTags ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Select All
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setEmotionalTag(!emotionalTag)}>
                    <View style = {styles.iconTextConainer}>
                        <AntDesign style = {styles.iconStyle} name="hearto" size={24} color={emotionalTag ? '#0288d1' : 'black'} />
                        <Text style = {emotionalTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Emotional
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setEnvironmentalTag(!environmentalTag)}>
                    <View style = {styles.iconTextConainer}>
                        <MaterialCommunityIcons style = {styles.iconStyle} name="flower-tulip-outline" size={24} color={environmentalTag ? '#0288d1' : 'black'}/>
                        <Text style = {environmentalTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Environmental
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setIntellectualTag(!intellectualTag)}>
                    <View style = {styles.iconTextConainer}>
                        <Feather style = {styles.iconStyle} name="book" size={24} color={intellectualTag ? '#0288d1' : 'black'}/>
                        <Text style = {intellectualTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Intellectual
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setPhysicalTag(!physicalTag)}>
                    <View style = {styles.iconTextConainer}>
                        <Ionicons style = {styles.iconStyle} name="ios-basketball-outline" size={24} color={physicalTag ? '#0288d1' : 'black'} />
                        <Text style = {physicalTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Physical
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setSocialTag(!socialTag)}>
                    <View style = {styles.iconTextConainer}>
                        <Ionicons style = {styles.iconStyle} name="md-people-outline" size={24} color={socialTag ? '#0288d1' : 'black'} />
                        <Text style = {socialTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Social
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style = {styles.lineContainer}/>
                <TouchableOpacity onPress = {() => setSpiritualTag(!spiritualTag)}>
                    <View style = {styles.iconTextConainer}>
                        <Ionicons style = {styles.iconStyle} name="ios-bonfire-outline" size={24} color={spiritualTag ? '#0288d1' : 'black'} />
                        <Text style = {spiritualTag ? styles.tagSelectedText : styles.tagNotSelectedText}>
                            Spiritual
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tagTextContainer:{
        marginTop: height / 20,
        marginHorizontal: width / 20,
        // marginTop: height / 50
    },
    lineContainer:{
        width: width / 1.1, 
        marginHorizontal: width / 250,
        top: height / 60,
    },
    headerText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: width / 25,
        top: height / 50
    },
    tagNotSelectedText: {
        fontSize: 18,
        fontWeight: '300',
        marginTop: height / 30,
        paddingHorizontal: width / 20,
    },
    tagSelectedText:{
        fontSize: 18,
        fontWeight: '300',
        marginTop: height / 30,
        paddingHorizontal: width / 20,
        color: '#0288d1'
    },
    iconTextConainer:{
        flexDirection: 'row'
    },
    iconStyle:{
        marginTop: height / 30,
    },
});

export default CreateChallengeScreenTags;