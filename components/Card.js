import { StyleSheet, Text, View, Image, Modal, Pressable } from "react-native";
import React, { useState } from "react";

import MyButton from "./MyButton";
import PopupConnect from "./PopupConnect";

export default function Card({ imageUri, name, type, location }) {
  const [modalVisible, setModalVisible] = useState(false);
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
        <PopupConnect onPressDone={() => setModalVisible(false)} />
      </Modal>
      <View style={styles.cardComponent}>
        <Image style={styles.cardImage} source={imageUri} />
        <View style={styles.cardDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <MyButton
          onPress={() => setModalVisible(true)}
          buttonStyle={{ width: "60%", height: 40 }}
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
  cardDetails: {
    marginLeft: -35,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 100,
    overflow: "hidden",
  },
  container: {
    borderRadius: 10,
    borderColor: "#c9c9c9",
    borderWidth: 0.8,
    marginHorizontal: 13,
    padding: 5,
    marginBottom: 8,
    top:20
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
