import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Fontisto';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import axios from '../../axios';
import UnplashImage from './components/UnplashImage';
import CreateChallengeBanner from './components/banners/CreateChallengeBanner';
import { showMessage } from 'react-native-flash-message';
const asyncStorage = require('../../asyncStorage');

const { width, height } = Dimensions.get('window');

const CreateChallengeScreenTags = (props) => {
  const createChallenge = async () => {
    const tagsArray = [];
    if (selectAllTags == true) {
      tagsArray.push(
        'Emotional',
        'Environmental',
        'Intellectual',
        'Physical',
        'Social',
        'Spiritual'
      );
    } else {
      if (emotionalTag == true) {
        tagsArray.push('Emotional');
      }
      if (environmentalTag == true) {
        tagsArray.push('Environmental');
      }
      if (intellectualTag == true) {
        tagsArray.push('Intellectual');
      }
      if (physicalTag == true) {
        tagsArray.push('Physical');
      }
      if (socialTag == true) {
        tagsArray.push('Social');
      }
      if (spiritualTag == true) {
        tagsArray.push('Spiritual');
      }
    }
    const id = await asyncStorage.getData('ID');
    const authToken = await asyncStorage.getData('Authorization');
    let body = {
      name: challengeName,
      start_date: startDate,
      end_date: endDate,
      description: challengeDescription,
      tags: tagsArray,
      location: location,
      unsplashurl: selectedPhoto,
    };
    if (challengeName.trim().length && challengeDescription.trim().length) {
      try {
        const res = await axios.post('/challenges', body, {
          headers: {
            id: id,
            Authorization: authToken,
          },
        });
        showMessage({
          icon: 'success',
          position: 'top',
          message: null,
          type: 'success',
          renderFlashMessageIcon: CreateChallengeBanner,
          style: { borderRadius: 15, top: 35, height: 50 },
          statusBarHeight: 0,
          floating: true,
        });
        props.navigation.navigate('Challenge');
      } catch (error) {
        if (error.response.status === 500) {
          setError('Something went wrong, try again later');
        } else {
          const err = error.response.data.message.replaceAll('"', '');
          alert(err);
        }
      }
    }
  };
  const [tagsPageActive, setTagsPageActive] = useState(true);
  const [datePageActive, setDatePageActive] = useState(false);
  const [descriptionPageActive, setDescriptionPageActive] = useState(false);

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
  const [location, setLocation] = useState('');
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
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState([]); //list of images returned from unsplash api
  const [selectedPhoto, setSelectedPhoto] = useState(
    'https://mpama.com/wp-content/uploads/2017/04/default-image-620x600.jpg'
  );
  const [unsplashError, setUnsplashError] = useState('');
  const [completeUnsplash, setCompleteUnplash] = useState(true);
  const [error, setError] = useState('');

  const searchPhotos = async (text) => {
    try {
      setCompleteUnplash(false);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${process.env.ACCESSKEY}&query=${text}&per_page=20`
      );

      setImageURL(
        response.data.results.map((data) => {
          return data.urls.regular;
        })
      );

      setCompleteUnplash(true);
    } catch (err) {
      setUnsplashError('Cannot retreive images from Unsplash, try again later');
    }
  };

  const textInputCounts = (prop, text) => {
    if (prop == 'name') {
      setInputLength(30 - text.length);
    } else {
      setDescriptionLength(250 - text.length);
    }
  };

  const [challengeTags, setChallengeTags] = useState([
    { tagName: 'Emotional', id: '1' },
    { tagName: 'Environmental', id: '2' },
    { tagName: 'Intellectual', id: '3' },
    { tagName: 'Physical', id: '4' },
    { tagName: 'Social', id: '5' },
    { tagName: 'Spiritual', id: '6' },
  ]);

  const toggleAll = () => {
    if (selectAllTags === true) {
      setEmotionalTag(false);
      setEnvironmentalTag(false);
      setIntellectualTag(false);
      setPhysicalTag(false);
      setSocialTag(false);
      setSpiritualTag(false);
    } else {
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
      <View style={styles.pageContainer}>
        <View style={styles.tagPageContainerGustav}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Challenge');
            }}
          >
            <Text style={styles.backButtonGustav}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              emotionalTag ||
              environmentalTag ||
              intellectualTag ||
              physicalTag ||
              socialTag ||
              spiritualTag
                ? (setTagsPageActive(false), setDatePageActive(true))
                : null
            }
          >
            <Text
              style={
                emotionalTag ||
                environmentalTag ||
                intellectualTag ||
                physicalTag ||
                socialTag ||
                spiritualTag
                  ? styles.nextButtonValid
                  : styles.nextButtonInvalid
              }
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <ProgressBar progress={0.25} color={Colors.blue600} />
        <Text style={styles.headerText}>
          Which domain of wellness does your challenge belong to?
        </Text>

        <View style={styles.tagTextContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectAllTags(!selectAllTags);
              toggleAll();
            }}
          >
            <View style={styles.iconTextConainer}>
              <Entypo
                style={styles.iconStyle}
                name="chevron-with-circle-down"
                size={24}
                color={selectAllTags ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  selectAllTags
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Select All
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity onPress={() => setEmotionalTag(!emotionalTag)}>
            <View style={styles.iconTextConainer}>
              <AntDesign
                style={styles.iconStyle}
                name="hearto"
                size={24}
                color={emotionalTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  emotionalTag
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Emotional
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity
            onPress={() => setEnvironmentalTag(!environmentalTag)}
          >
            <View style={styles.iconTextConainer}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="flower-tulip-outline"
                size={24}
                color={environmentalTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  environmentalTag
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Environmental
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity
            onPress={() => setIntellectualTag(!intellectualTag)}
          >
            <View style={styles.iconTextConainer}>
              <Feather
                style={styles.iconStyle}
                name="book"
                size={24}
                color={intellectualTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  intellectualTag
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Intellectual
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity onPress={() => setPhysicalTag(!physicalTag)}>
            <View style={styles.iconTextConainer}>
              <Ionicons
                style={styles.iconStyle}
                name="ios-basketball-outline"
                size={24}
                color={physicalTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  physicalTag
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Physical
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity onPress={() => setSocialTag(!socialTag)}>
            <View style={styles.iconTextConainer}>
              <Ionicons
                style={styles.iconStyle}
                name="md-people-outline"
                size={24}
                color={socialTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  socialTag ? styles.tagSelectedText : styles.tagNotSelectedText
                }
              >
                Social
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.lineContainer} />
          <TouchableOpacity onPress={() => setSpiritualTag(!spiritualTag)}>
            <View style={styles.iconTextConainer}>
              <Ionicons
                style={styles.iconStyle}
                name="ios-bonfire-outline"
                size={24}
                color={spiritualTag ? '#0288d1' : 'black'}
              />
              <Text
                style={
                  spiritualTag
                    ? styles.tagSelectedText
                    : styles.tagNotSelectedText
                }
              >
                Spiritual
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    // DATES PAGE INFORMATION
  } else if (datePageActive) {
    return (
      <View style={styles.containerDatesAndDescription}>
        <View style={styles.tagPageContainerGustav}>
          <TouchableOpacity
            onPress={() => {
              setTagsPageActive(true);
              setDatePageActive(false);
            }}
          >
            <Text style={styles.backButtonGustav}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              location.trim().length
                ? (setDatePageActive(false), setDescriptionPageActive(true))
                : null;
            }}
          >
            <Text
              style={
                location.trim().length
                  ? styles.nextButtonValid
                  : styles.nextButtonInvalid
              }
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <ProgressBar progress={0.5} color={Colors.blue600} />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          extraScrollHeight={30}
        >
          <Text style={styles.headerText}>
            Select when and where to begin your challenge!
          </Text>
          <View
            style={{
              top: height / 15,
              height: 150,
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.dateDropDown}>
              <Text style={styles.datesText}>Start Date</Text>
              <RNDateTimePicker
                minimumDate={new Date(startDate)}
                disabled={false}
                style={styles.datePickerStyle}
                testID="dateTimePicker"
                value={startDate}
                mode={'date'}
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
                minimumDate={new Date(startDate)}
                disabled={false}
                style={styles.datePickerStyle}
                testID="dateTimePicker"
                value={endDate}
                mode={'date'}
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
            <Text style={[styles.datesText, { top: width / 21 }]}>
              Location
            </Text>
            <TextInput
              maxLength={50}
              style={styles.locationBox}
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
  } else if (descriptionPageActive) {
    return (
      <View style={styles.containerDatesAndDescription}>
        <View style={styles.tagPageContainerGustav}>
          <TouchableOpacity
            onPress={() => {
              setDatePageActive(true);
              setDescriptionPageActive(false);
            }}
          >
            <Text style={styles.backButtonGustav}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => createChallenge()}>
            <Text
              style={
                challengeName.trim().length &&
                challengeDescription.trim().length
                  ? styles.nextButtonValid
                  : styles.nextButtonInvalid
              }
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <ProgressBar progress={0.75} color={Colors.blue600} />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            extraScrollHeight={20}
          >
            <Text style={styles.headerTextDescription}>
              Give your challenge a name and description.
            </Text>
            <Text style={styles.secondHeaderTextDescription}>
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
                <Text style={styles.uploadPictureText}>
                  Select challenge photo
                </Text>
                <Feather
                  name="external-link"
                  size={17}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.nameAndDescriptionText}>Name</Text>
            <TextInput
              maxLength={30}
              style={styles.nameBox}
              autoCorrect={false}
              value={challengeName}
              onChangeText={(text) => {
                setChallengeName(text);
                textInputCounts('name', text);
              }}
            />
            <Text style={styles.inputLengths}>{nameLength}</Text>
            <Text style={styles.nameAndDescriptionText}>Description</Text>
            <TextInput
              maxLength={250}
              multiline={true}
              style={styles.descriptionBox}
              autoCorrect={false}
              value={challengeDescription}
              onChangeText={(text) => {
                setChallengeDescription(text);
                textInputCounts('', text);
              }}
            />
            <Text style={styles.inputLengths}>{descriptionLength}</Text>
            <Modal
              isVisible={modal}
              onBackdropPress={() => setModal(!modal)}
              useNativeDriver={true}
            >
              <ScrollView
                style={styles.modalView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.searchContainer}>
                  <Icon
                    name="search"
                    size={width * 0.04}
                    style={{ marginHorizontal: width / 50, opacity: 0.6 }}
                  />
                  <TextInput
                    style={{ width: width / 1.4 }}
                    value={image}
                    placeholder="Search images"
                    placeholderTextColor="grey"
                    onChangeText={(text) => {
                      setImage(text);
                      searchPhotos(text);
                    }}
                  />
                </View>
                {unsplashError.length != 0 ? (
                  <Text style={styles.unplashCreditText}>{unsplashError}</Text>
                ) : (
                  <Text style={styles.unplashCreditText}>
                    Photos provided by Unsplash
                  </Text>
                )}
                {!completeUnsplash ? (
                  <View
                    style={{ alignSelf: 'center', marginVertical: height / 5 }}
                  >
                    <ActivityIndicator
                      style={{ alignSelf: 'center' }}
                      size="small"
                    />
                  </View>
                ) : (
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
                )}
              </ScrollView>
            </Modal>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  unplashCreditText: {
    fontSize: width * 0.025,
    alignSelf: 'center',
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  challengePhotoContainer: {
    marginTop: height / 55,
    height: height / 3,
    marginHorizontal: width / 25,
  },
  challengePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pictureList: {
    alignSelf: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  searchContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 80,
    borderColor: '#D3D3D3',
    marginVertical: height / 100,
    height: height / 25,
  },
  modalView: {
    marginVertical: height / 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  uploadPictureText: {
    margin: 10,
    fontSize: width * 0.035,
    alignSelf: 'center',
    color: 'white',
  },
  uploadPictureContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 2,
    borderColor: '#abdcfb',
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextButtonInvalid: {
    right: width / 20,
    fontSize: 20,
    color: '#BEBEBE',
  },
  nextButtonValid: {
    right: width / 20,
    fontSize: 20,
    color: '#0288d1',
  },
  backButtonGustav: {
    left: width / 20,
    fontSize: 20,
    color: '#0288d1',
  },
  tagPageContainerGustav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: height / 60,
  },
  pageContainer: {
    marginTop: height / 13,
  },
  tagTextContainer: {
    marginTop: height / 20,
    marginHorizontal: width / 20,
  },
  lineContainer: {
    width: width / 1.1,
    marginHorizontal: width / 250,
    top: height / 60,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: width / 25,
    top: height / 50,
  },
  tagNotSelectedText: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: height / 30,
    paddingHorizontal: width / 20,
  },
  tagSelectedText: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: height / 30,
    paddingHorizontal: width / 20,
    color: '#0288d1',
  },
  iconTextConainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    marginTop: height / 30,
  },
  headerTextDate: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: width / 25,
    top: height / 50,
  },
  datesText: {
    fontSize: 22,
    fontWeight: 'bold',
    top: 6,
  },
  location: {
    top: height / 10,
    marginHorizontal: width / 25,
    justifyContent: 'space-between',
  },
  locationBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 20,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: '#D3D3D3',
    marginTop: height / 45,
  },
  containerDatesAndDescription: {
    marginTop: height / 13,
    flex: 1,
  },
  locationLength: {
    alignSelf: 'flex-end',
    marginRight: width / 18,
    top: height / 80,
  },
  dateDropDown: {
    flexDirection: 'row',
    marginHorizontal: width / 25,
    justifyContent: 'space-between',
  },
  datePickerStyle: {
    height: 45,
    width: 124,
  },
  headerTextDescription: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: width / 25,
    marginTop: height / 50,
  },
  secondHeaderTextDescription: {
    marginHorizontal: width / 25,
    fontWeight: '300',
    marginTop: height / 20,
  },
  nameAndDescriptionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: width / 25,
    marginTop: height / 20,
  },
  inputLengths: {
    alignSelf: 'flex-end',
    marginRight: width / 18,
    top: 0.5,
  },
  nameBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 25,
    marginHorizontal: width / 25,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: '#D3D3D3',
    marginTop: height / 50,
  },
  descriptionBox: {
    borderRadius: 10,
    width: width / 1.1,
    height: height / 6,
    marginHorizontal: width / 25,
    borderWidth: width / 300,
    padding: width / 50,
    borderColor: '#D3D3D3',
    marginTop: height / 50,
  },
});

export default CreateChallengeScreenTags;
