import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import Colors from "../Colors";
import MyButton from "./MyButton";

export default function PopupConnect({ onPressDone }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../images/MyProfile.jpg")}
          />
          <Text style={styles.name}>Taj</Text>
          <Text style={styles.type}>Hotel</Text>
          <Text style={styles.location}>Pimpri, Pune</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.contact}>Contact Details:{"\n"}</Text>
          <Text style={styles.detailsText}>
            Full Address:{"\n"}
            <Text style={styles.detailsValues}>
              Lane2, street 12, Pimpri, Pune, 411018
              {"\n"}
            </Text>
          </Text>
          <Text style={styles.detailsText}>
            Registrant Name:{"  "}
            <Text style={styles.detailsValues}>Abhay Bhandari</Text>
          </Text>
          <Text style={styles.detailsText}>
            Email:{"  "}
            <Text style={styles.detailsValues}>abhay@mail.com</Text>
          </Text>
          <Text style={styles.detailsText}>
            Mobile:{"  "}
            <Text style={styles.detailsValues}>1234567890</Text>
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
    fontSize: 13.5,
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
  },
  location: {
    color: "#484848",
    fontFamily: "serif",
    fontSize: 15,
  },
});
