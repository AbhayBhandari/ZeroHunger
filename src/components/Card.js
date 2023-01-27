import { StyleSheet, Text, View, Image, Modal, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import MyButton from "./MyButton";
import PopupConnect from "./PopupConnect";
import { myDatabase } from "../utils/FirebaseConfig";

export default function Card({ imageUri, name, type, location, userId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    myDatabase
      .collection("users")
      .doc(userId)
      .get()
      .then((data) => {
        setCategoryData({
          categoryName: data.data().category_name,
          categoryType: data.data().type,
          categoryAddress: `${data.data().category_city}, ${
            data.data().category_state
          }`,
          registrantName: data.data().registrant_name,
          email: data.data().email,
          mobile: data.data().mobile,
          fullAddress: data.data().category_address,
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <PopupConnect
          categoryData={categoryData}
          onPressDone={() => setModalVisible(false)}
          imageUri={imageUri}
        />
      </Modal>
      <View style={styles.cardComponent}>
        <Image style={styles.cardImage} source={{ uri: imageUri }} />
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <MyButton
          onPress={() => setModalVisible(true)}
          buttonStyle={{ width: "60%", height: 40, left: 20 }}
          textStyle={{ fontSize: 14, fontWeight: "600" }}
          text="Connect"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  container: {
    borderRadius: 10,
    borderColor: "#c9c9c9",
    borderWidth: 0.8,
    marginHorizontal: 13,
    padding: 5,
    marginBottom: 10,
    top: 20,
  },
  contentWrapper: {
    position: "absolute",
    left: 85,
  },
  name: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 18,
  },
  type: {
    color: "#888888",
    fontFamily: "serif",
    fontSize: 12,
  },
  location: {
    color: "#484848",
    fontFamily: "serif",
    fontSize: 13,
  },
});
