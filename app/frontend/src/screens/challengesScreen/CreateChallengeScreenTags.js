import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput, ScrollView, Image, SafeAreaView} from 'react-native';
import { Divider } from "react-native-elements";
import { ProgressBar, Colors } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Fontisto";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import UnsplashCred from "../../secrete/UnplashCred";
import axios from "axios";
import UnplashImage from "./components/UnplashImage";

const { width, height } = Dimensions.get('window');

const CreateChallengeScreenTags = (props) => {

    const [tagsPageActive, setTagsPageActive] = useState(true);
    const [datePageActive, setDatePageActive] = useState(false);
    const [descriptionPageActive, setDescriptionPageActive] = useState(false);
    const [checkInput, setCheckInput] = useState(false);

    // const inputCheck = () => {
    //     if (tagsPageActive){
    //         if (emotionalTag || environmentalTag || intellectualTag || physicalTag || socialTag || spiritualTag){
    //             setCheckInput(true);
    //             return checkInput;
    //         }else{
    //             setCheckInput(false);
    //             return checkInput;
    //         }
    //     }else if (datePageActive) {
            
    //     }else if (descriptionPageActive){

    //     }
    // };

    //tags page states
    const [selectAllTags, setSelectAllTags] = useState(false);
    const [emotionalTag, setEmotionalTag] = useState(false);
    const [environmentalTag, setEnvironmentalTag] = useState(false);
    const [intellectualTag, setIntellectualTag] = useState(false);
    const [physicalTag, setPhysicalTag] = useState(false);
    const [socialTag, setSocialTag] = useState(false);
    const [spiritualTag, setSpiritualTag] = useState(false);

    // dates page states and methods
    const [open, setOpen] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [locationLength, setLocationLength] = useState(50);

    const textInputCount = (text) => {
        setLocationLength(50 - text.length);
    };

    //description page states and methods
    const [nameLength, setInputLength] = useState(30);
    const [descriptionLength, setDescriptionLength] = useState(250);
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [modal, setModal] = useState(false);
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState([]); //list of images returned from unsplash api
    const [selectedPhoto, setSelectedPhoto] = useState(
        "https://mpama.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
    ); //url of a single picture chosen by user

    const searchPhotos = async (text) => {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${UnsplashCred.accessKey}&query=${text}&per_page=20`
        );
    
        setImageURL(
          response.data.results.map((data) => {
            return data.urls.regular;
          })
        );
      };

    const textInputCounts = (prop, text) => {
        if (prop == 'name'){
            setInputLength(30 - text.length)
        }else{
            setDescriptionLength(250 - text.length)
        }
    };

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

    // TAG PAGE INFORMATION
    if (tagsPageActive) {
        return (
            <View style = {styles.pageContainer}> 
                <View style={styles.tagPageContainerGustav}>
                    <TouchableOpacity onPress={() => {props.navigation.navigate("Challenge");}}>
                    <Text style={styles.backButtonGustav}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (emotionalTag || environmentalTag || intellectualTag || physicalTag || socialTag || spiritualTag) ? (setTagsPageActive(false), setDatePageActive(true)): null}>
                        <Text style={(emotionalTag || environmentalTag || intellectualTag || physicalTag || socialTag || spiritualTag) ? styles.nextButtonValid : styles.nextButtonInvalid}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
                <ProgressBar progress={0.25} color={Colors.blue600} />
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
    // DATES PAGE INFORMATION
    }else if (datePageActive) {
        return (
            <View style={styles.containerDatesAndDescription}>
                <View style={styles.tagPageContainerGustav}>
                    <TouchableOpacity onPress={() => {setTagsPageActive(true); setDatePageActive(false);}}>
                    <Text style={styles.backButtonGustav}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {location.trim().length ? (setDatePageActive(false), setDescriptionPageActive(true)) : null}}>
                        <Text style={location.trim().length ? styles.nextButtonValid : styles.nextButtonInvalid}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
                <ProgressBar progress={0.5} color={Colors.blue600} />
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={"always"}
                    extraScrollHeight={30}
                >
                <Text style={styles.headerText}>
                  Select when and where to begin your challenge!
                </Text>
                <View
                  style={{
                    top: height / 15,
                    height: 150,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.dateDropDown}>
                    <Text style={styles.datesText}>Start Date</Text>
                    <RNDateTimePicker
                        minimumDate = {new Date(startDate)}
                        disabled={false}
                        style={styles.datePickerStyle}
                        testID="dateTimePicker"
                        value={startDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            setStartDate(selectedDate);
                        }}
                    />
                  </View>
        
                  {/* START DATE CODE GOES HERE */}
                  <View style={styles.dateDropDown}>
                    <Text style={styles.datesText}>End Date</Text>
                    <RNDateTimePicker
                        minimumDate = {new Date(startDate)}
                        disabled={false}
                        style={styles.datePickerStyle}
                        testID="dateTimePicker"
                        value={endDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                        setEndDate(selectedDate);
                        }}
                    />
                  </View>
                </View>
        
                {/* END DATE CODE GOES HERE */}
                <View style={styles.location}>
                  <Text style={[styles.datesText, { top: width / 21 }]}>Location</Text>
                  <TextInput
                    maxLength={50}
                    style={styles.locationBox}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={location}
                    onChangeText={(text) => {
                      setLocation(text);
                      textInputCount(text);
                    }}
                  />
                  <Text style={styles.locationLength}>{locationLength}</Text>
                </View>
              </KeyboardAwareScrollView>
            </View>
        );
    // DESCRIPTION PAGE INFORMATION
    }else if (descriptionPageActive){
        return (
            <View style = {styles.containerDatesAndDescription}>
                <View style={styles.tagPageContainerGustav}>
                    <TouchableOpacity onPress={() => {setDatePageActive(true); setDescriptionPageActive(false);}}>
                    <Text style={styles.backButtonGustav}>
                        Back
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {(challengeName.trim().length && challengeDescription.trim().length) ? props.navigation.navigate('Challenge') : null}}>
                        <Text style={(challengeName.trim().length && challengeDescription.trim().length) ? styles.nextButtonValid : styles.nextButtonInvalid}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.safeAreaViewContainer}>
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
                        <View style={styles.challengePhotoContainer}>
                            <Image
                                style={styles.challengePhoto}
                                source={{ uri: selectedPhoto }}
                            />
                            <TouchableOpacity
                                style={styles.uploadPictureContainer}
                                onPress={() => setModal(!modal)}
                                activeOpacity={1}
                            >
                            <Text style={styles.uploadPictureText}>Select challenge photo</Text>
                            <Feather
                                name="external-link"
                                size={17}
                                color={"white"}
                                style={{ marginRight: 10 }}
                            />
                            </TouchableOpacity>
                        </View>
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
                        <Modal
                            isVisible={modal}
                            onBackdropPress={() => setModal(!modal)}
                            useNativeDriver={true}
                        >
                            <ScrollView
                                style={styles.modalView}
                                showsVerticalScrollIndicator={false}
                            >
                                <View
                                    style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "98%",
                                    alignSelf: "center",
                                    }}
                                >
                                    <View style={styles.searchContainer}>
                                        <Icon name="search" size={16} style={{marginHorizontal: width / 50}}/>
                                        <TextInput
                                            style={{ width: "85%" }}
                                            value={image}
                                            // marginHorizontal = {width / 50}
                                            placeholder="Search images"
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                            setImage(text);
                                            searchPhotos(text);
                                        }}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={{ right: 0, position: "absolute" }}
                                        onPress={() => setModal(!modal)}
                                    >
                                    <Feather name="x-circle" size={25} />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.pictureList}
                                    data={imageURL}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        <UnplashImage
                                        url={item}
                                        setPhoto={setSelectedPhoto}
                                        currentlySelected={selectedPhoto}
                                    />
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </ScrollView>
                        </Modal>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    safeAreaViewContainer:{
        flex: 1,
    },
    challengePhotoContainer: {
        marginTop: height / 55,
        height: height / 3,
        marginHorizontal: width / 25,
    },
    challengePhoto: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    closeModalText: {
        margin: 7,
        fontSize: 15,
        marginHorizontal: 20,
        color: "white",
    },
    closeModal: {
        borderRadius: 5,
        marginVertical: 7,
        alignSelf: "center",
        backgroundColor: "#4997d0",
    },
    pictureList: {
        alignSelf: "center",
        marginTop: -5,
    },
    iconStyle: { 
        marginHorizontal: 10
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 0.3,
        borderRadius: 10,
        backgroundColor: "#D3D3D3",
        borderColor: "#D3D3D3",
        marginVertical: height / 60,
        marginHorizontal: width / 30,
        right: 5,
        height: 35,
    },
    modalView: {
        marginVertical: 100,
        backgroundColor: "white",
        borderRadius: 10,
    },
    uploadPictureText: {
        marginVertical: 10,
        marginLeft: 10,
        fontSize: 17,
        alignSelf: "center",
        color: "white",
    },
    uploadPictureContainer: {
        position: "absolute",
        alignSelf: "center",
        bottom: 2,
        borderColor: "#abdcfb",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
    nextButtonInvalid: {
        right: width / 20,
        fontSize: 20,
        color: "#BEBEBE",
    },
    nextButtonValid: {
        right: width / 20,
        fontSize: 20,
        color: "#0288d1",
    },
    backButtonGustav: {
        left: width / 20,
        fontSize: 20,
        color: "#0288d1",
    },
    tagPageContainerGustav: {
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: height / 60
    },
    pageContainer:{
        marginTop: height / 13
    },
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
    headerTextDate: {
        fontSize: 22,
        fontWeight: "bold",
        marginHorizontal: width / 25,
        top: height / 50,
    },
    datesText: {
        fontSize: 22,
        fontWeight: "bold",
        top: 6,
    },
    location: {
        top: height / 10,
        marginHorizontal: width / 25,
        justifyContent: "space-between",
    },
    locationBox: {
        borderRadius: 10,
        width: width / 1.1,
        height: height / 20,
        borderWidth: width / 300,
        padding: width / 50,
        borderColor: "#D3D3D3",
        marginTop: height / 45,
    },
    containerDatesAndDescription: {
        marginTop: height / 13,
        flex: 1,
    },
    locationLength: {
        alignSelf: "flex-end",
        marginRight: width / 18,
        top: height / 80,
    },
    dateDropDown: {
        flexDirection: "row",
        marginHorizontal: width / 25,
        justifyContent: "space-between",
    },
    datePickerStyle: {
        height: 45,
        width: 124,
    },
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

export default CreateChallengeScreenTags;