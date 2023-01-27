import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import Colors from "../Colors";
import MyButton from "./MyButton";

export default function PopupConnect({ onPressDone, categoryData, imageUri }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Image
          style={styles.verifiedImage}
          source={require("../images/verified.png")}
        />
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: imageUri }} />
          <Text style={styles.name}>{categoryData.categoryName}</Text>
          <Text style={styles.type}>{categoryData.categoryType}</Text>
          <Text style={styles.location}>{categoryData.categoryAddress}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.contact}>
            {"\n"}Contact Details{"\n"}
          </Text>
          <Text style={styles.detailsText}>
            Full Address:{"\n"}
            <Text style={styles.detailsValues}>
              {categoryData.fullAddress}
              {"\n"}
            </Text>
          </Text>
          <Text style={styles.detailsText}>
            Registrant Name:{"  "}
            <Text style={styles.detailsValues}>
              {categoryData.registrantName}
            </Text>
          </Text>
          <Text style={styles.detailsText}>
            Email:{"  "}
            <Text style={styles.detailsValues}>{categoryData.email}</Text>
          </Text>
          <Text style={styles.detailsText}>
            Mobile:{"  "}
            <Text style={styles.detailsValues}>{categoryData.mobile}</Text>
          </Text>
          <MyButton
            buttonStyle={{ width: "35%", height: 40 }}
            textStyle={{ fontSize: 20 }}
            text="Done"
            onPress={onPressDone}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 17,
  },
  detailsText: {
    fontFamily: "serif",
    fontWeight: "700",
    fontSize: 12.5,
  },
  detailsValues: {
    fontFamily: "serif",
    fontSize: 12.5,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 0.09,
    borderColor: Colors.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    margin: 9,
  },
  name: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 20,
  },
  type: {
    color: "#888888",
    fontFamily: "serif",
    fontSize: 14,
    textTransform: "capitalize",
  },
  location: {
    color: "#484848",
    fontFamily: "serif",
    fontSize: 15,
  },
  verifiedImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
    marginTop: 10,
  },
});
