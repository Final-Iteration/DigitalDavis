import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Avatar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
const { height, width } = Dimensions.get("window");
const participants = [
  {
    id: 1,
    name: "John",
    title: "Administrative Assistant",
    picture:
      "https://headshots.thelightcommittee.com/wp-content/uploads/2020/04/quarter-body-headshot-example.jpg",
  },
  {
    id: 2,
    name: "Mary",
    title: "Executive Assistant",
    picture:
      "https://lh3.googleusercontent.com/wXrxZqIufl5HkzEfE7cwHqJj9OBHz_1MgEVYWhYfPTUgfVxOOob9vxB-LzLIEovO9VpS6_Fv2js6oH86E9ZOFYPY7UdzgzkJIJANfsMYff7694ITlTVR3NDHZK_1ahdQcRzGcx8E",
  },
  {
    id: 3,
    name: "Joshua",
    title: "Marketing Manager",
    picture:
      "https://www.bethesdaheadshots.com/wp-content/uploads/2020/02/Jonathan-Business-Headshot.jpg",
  },
  {
    id: 4,
    name: "Keisuka",
    title: "Customer Service Representative",
    picture:
      "https://d5t4h5a9.rocketcdn.me/wp-content/uploads/2021/04/Website-Photo-18.png",
  },
  {
    id: 5,
    name: "Manh",
    title: "Nurse Practitioner",
    picture:
      "https://images.squarespace-cdn.com/content/v1/50204bd5e4b03f6f4d185490/1601995306243-JKYRJMZVA089IAB1P7OK/Professional-Headshots-5-1.jpg?format=500w",
  },
  {
    id: 6,
    name: "Daniel",
    title: "Software Engineer",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYfzprczy-P-5CFIEA7WHBrrm1ck3w_5-y6A&usqp=CAU",
  },
  {
    id: 7,
    name: "Gustav",
    title: "Software Engineer",
    picture:
      "https://nycheadshotspot.com/wp-content/uploads/2019/11/IMG_0362-copy-1.jpg",
  },
  {
    id: 8,
    name: "Sahira",
    title: "Sales Manager",
    picture:
      "https://zenstudiosla.com/wp-content/uploads/2020/10/2-Medical-Residency-Headshot-Kelly-.jpg",
  },
  {
    id: 9,
    name: "Akasha",
    title: "Data Entry Clerk",
    picture:
      "https://www.lensrentals.com/blog/media/2016/02/Cinematic-Headshots-1.jpg",
  },
  {
    id: 10,
    name: "Sharon",
    title: "Office Assistant",
    picture:
      "https://dandyheadshots.com/wp-content/uploads/2019/11/patrick-lord-remmert-photo-by-josh-humble-dandy-headshots-dhs_5448.jpg",
  },
  {
    id: 11,
    name: "Dennis",
    title: "Animal science",
    picture:
      "https://static.showit.co/1200/nJ8gn_r6QyG3O5dOdoT3HQ/68020/professional_headshots_photographer_charleston_sc-king-and-fields-studios.jpg",
  },
  {
    id: 12,
    name: "Mathew",
    title: "Software Engineer",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcK_1VnKp13ta86IPr-AQ5vH6JxhJeUhx_xA&usqp=CAU",
  },
];

const Participant = () => {
  const participant = useState([]);
  //make axios call to get participant
  useEffect(() => {}, []);
  const renderData = (data) => {
    return (
      <View style={styles.container}>
        <Avatar.Image
          size={40}
          source={{
            uri: data.item.picture,
          }}
        />
        <View style={{ left: 20 }}>
          <Text style={styles.name}>{data.item.name}</Text>
          <Text style={styles.title}>{data.item.title}</Text>
        </View>
        <View
          style={{
            right: 0,
            alignSelf: "flex-end",
            position: "absolute",
            alignSelf: "center",
          }}
        >
          <Entypo
            style={{ opacity: 0.7 }}
            size={23}
            name="chevron-small-right"
          />
        </View>
      </View>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "mailto:support@example.com?subject=SendMail&body=Description"
          )
        }
      >
        <Icon style={{ opacity: 0.7 }} size={25} name="email-send-outline" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <SwipeListView
        data={participants}
        renderItem={renderData}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={40}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      ></SwipeListView>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 28,
    top: 9,
  },
  name: { fontSize: 18 },
  title: { opacity: 0.6, fontSize: 13 },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    width: width - 75,
    alignSelf: "center",
    height: height / 15,
    top: 10,
    alignItems: "center",
  },
});

export default Participant;
