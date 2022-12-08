import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import Colors from "../Colors";

export default function InputBox({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style
}) {
  return (
    <TextInput
      style={[styles.inputBox,style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: "80%",
    padding: 5,
    color: Colors.primary,
    fontSize: 15,
  },
});
