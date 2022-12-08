import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../Colors";

export default function MyButton({ text, onPress, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "serif",
    color: Colors.white,
  },
});
