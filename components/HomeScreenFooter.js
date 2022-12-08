import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Colors from "../Colors";

export default function HomeScreenFooter({ userImage }) {
  return (
    <>
      <View style={styles.seperator} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log("Home")}>
          <Image
            style={styles.homeIcon}
            source={require("../images/home-icon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Me")}>
          <Image style={styles.userImage} source={userImage} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  homeIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  seperator: {
    borderBottomColor: "#b1b1b1",
    borderBottomWidth: 0.55,
    width: "100%",
    marginBottom: 5,
  },
  userImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    overflow: "hidden",
    borderWidth: 0.7,
    borderColor: Colors.primary,
    borderRadius: 100,
  },
});
