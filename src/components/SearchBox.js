import { Image, StyleSheet, TextInput, View } from "react-native";
import React from "react";

import * as Animatable from "react-native-animatable";
import Colors from "../utils/Colors";

export default function SearchBox({value, setValue}) {
  return (
    <Animatable.View
      animation="slideInRight" 
      duration = {1500}
      style={styles.container}>
      <View style={styles.components}>
        <Image
          style={styles.icon}
          source={require("../images/search-icon.png")}
        />
        <TextInput
          value={value}
          onChangeText = {setValue}
          style={styles.textInput} placeholder="Search" />
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 13,
    marginVertical: 20,
    flex: 0.1,
  },
  components: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: "#9f9f9f",
    paddingLeft: 15,
    backgroundColor: "#dadada",
    paddingRight: 15,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    width: "90%",
  },
});
