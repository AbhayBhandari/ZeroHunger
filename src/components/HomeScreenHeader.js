import { StyleSheet, Image } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

export default function HomeScreenHeader() {
  return (
    <Animatable.View animation="bounceIn" duration={3000} style={styles.header}>
      <Image
        style={styles.headerAppLogo}
        source={require("../images/home-header-logo.png")}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  headerAppLogo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
