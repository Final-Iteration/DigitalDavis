import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
      } catch (e) {
        console.log("Couldn't store " + value + " in " + key);
      }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
          return value;
        }
      } catch(e) {
        console.log("Couldn't get data for " + key);
      }
};

module.exports = {
    storeData,
    getData
};


