import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Feather } from '@expo/vector-icons'; 
import { Appbar, Avatar } from "react-native-paper";
const { height, width } = Dimensions.get("window");

const headerMargin = Platform.OS === 'ios' ? null: '50%'
const CustomHeader = ({ navigation, title, profile, setting, signup, challenge }) => {
  const logout = () => {
    //remove token from async storage
    navigation.navigate('Auth');
  };
  if(signup){
    return (
      <Appbar.Header
      statusBarHeight={45}
      style={{
        backgroundColor: '#1d3679',
        elevation: -1,
      }}
    >
      <Appbar.Content style = {styles.headerStyle} title={<Text style={styles.title}>{title}</Text>} />
      <TouchableOpacity
          style={{ right: 22 }}
          onPress={() => {navigation.navigate("Login")}}
        >
          <Text>Login</Text>
      </ TouchableOpacity>
    </Appbar.Header>
    )
  }else if (profile) {
    return (
      <Appbar.Header
        statusBarHeight={45}
        style={{
          backgroundColor: '#142A4F',
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: 22 }}
          onPress={() => {
            if (profile && setting) {
              navigation.navigate("User");
            } else {
              navigation.navigate("Setting");
            }
          }}
        >
          {setting ? (
            <Avatar.Image
              size={40}
              source={{
                uri: "https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg",
              }}
            />
          ) : (
            <Icon name="setting" size={30} style={{ color: "#2F80ED" }} />
          )}
        </TouchableOpacity>
        <Appbar.Content style = {styles.headerStyle} title={<Text style={styles.title}>{title}</Text>} />
        <TouchableOpacity style={{ right: 22 }} onPress={() => logout()}>
          <Text style={styles.logOutButton}>Logout</Text>
        </TouchableOpacity>
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header
        statusBarHeight={45}
        style={{
          backgroundColor: '#fff',
          elevation: 0,
        }}
      >
        <TouchableOpacity
          style={{ left: width / 20 }}
          onPress={() => navigation.navigate('User')}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: 'https://i1.sndcdn.com/avatars-000321245778-5wxb1g-t500x500.jpg',
            }}
          />
        </TouchableOpacity>
        <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
        {challenge ? <TouchableOpacity onPress={() => navigation.navigate('CreateChallenge')} style = {styles.plusButton}><Feather name="plus-circle" size={30} color="black" /></TouchableOpacity> : null}
      </Appbar.Header>
    );
  }
};
const styles = StyleSheet.create({
  headerStyle:{
    left:headerMargin
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  logOutButton: {
    fontSize: 17,
    color: '#2F80ED',
    fontWeight: '500',
  },
  plusButton: {
    right: width / 20,
  }
});

export default CustomHeader;
