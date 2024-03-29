import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import Colors from "../utils/Colors";
import Categories from "../utils/Categories";
import SignUp from "../components/SignUp";

export default function RegistrationScreen({ navigation }) {
  const [selectType, setSelectType] = useState("");

  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceIn" duration={4000}>
        <Text style={styles.welcomeHeading}>Welcome!</Text>
        <Text style={[styles.welcomeHeading, { fontSize: 25, paddingTop: 0 }]}>
          Register To Get Started.
        </Text>
      </Animatable.View>
      <KeyboardAvoidingView style={styles.footer}>
        <ScrollView>
          <Animatable.View animation="fadeInUp">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 20,
              }}
            >
              <Text style={{ color: "#8f8f8f" }}>
                Already have an account?{"  "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: Colors.primary, fontWeight: "500" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: "#efefef",
                borderBottomWidth: 1,
                width: "100%",
                marginBottom: 30,
              }}
            />

            <View style={styles.typeContainer}>
              {Categories.map((item) => (
                <TouchableOpacity
                  key={item.type}
                  style={styles.headerTypeContent}
                  onPress={() => setSelectType(item.type)}
                  activeOpacity={1}
                >
                  <Image source={item.image} style={styles.icon} />
                  <Text style={{ color: Colors.primary }}>{item.type}</Text>
                  <View style={styles.radioButtonOuter}>
                    {selectType === item.type && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Animatable.View animation="bounceIn" duration={4000}>
              {selectType == "" ? null : <SignUp categoryType={selectType} />}
            </Animatable.View>
            
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  footer: {
    flex: 2,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 40,
  },
  headerTypeContent: {
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  radioButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  welcomeHeading: {
    fontFamily: "serif",
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 40,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
});
