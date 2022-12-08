import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Colors";

import Onboarding from "react-native-onboarding-swiper";

const NextButton = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonTitle}>Next</Text>
  </TouchableOpacity>
);

const DoneButton = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonTitle}>Done</Text>
  </TouchableOpacity>
);

const Dot = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? Colors.secondary : Colors.white;
  return (
    <View
      style={{
        height: 12,
        width: 12,
        backgroundColor,
        marginHorizontal: 5,
        borderRadius: 100,
        borderColor: Colors.secondary,
        borderWidth: 2,
      }}
    />
  );
};

const OnBoardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Onboarding
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        DotComponent={Dot}
        titleStyles={styles.onboardTitle}
        subTitleStyles={styles.onboardSubTitle}
        bottomBarColor={Colors.primary}
        showSkip={false}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: Colors.primary,
            image: (
              <Image
                style={{ height: 400, width: 400 }}
                source={require("../images/onboard1.png")}
              />
            ),
            title: "Fighting Hunger",
            subtitle: "Give your contribution in fighting this Hunger War. ",
          },
          {
            backgroundColor: Colors.primary,
            image: (
              <Image
                style={styles.image}
                source={require("../images/onboard2.png")}
              />
            ),
            title: "Zero Hunger",
            subtitle:
              "The war against hunger is truly mankind's war of liberation.",
          },
          {
            backgroundColor: Colors.primary,
            image: (
              <Image
                style={styles.image}
                source={require("../images/onboard3.png")}
              />
            ),
            title: "End Hunger End Poverty",
            subtitle: "You can make a difference. Help someone in need.",
          },
        ]}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  background: {},

  button: {
    backgroundColor: Colors.secondary,
    height: "90%",
    width: "55%",
    marginRight: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
    fontFamily: "sans-serif-light",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    top: -20,
    height: 400,
    width: "100%",
    resizeMode: "contain",
  },

  onboardTitle: {
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 30,
  },

  onboardSubTitle: {
    fontFamily: "sans-serif-medium",
    fontWeight: "400",
    color: Colors.white,
    fontSize: 15,
  },
});
