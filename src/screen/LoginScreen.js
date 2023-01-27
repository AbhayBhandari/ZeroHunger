import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import Colors from "../utils/Colors";
import InputBox from "../components/InputBox";
import MyButton from "../components/MyButton";
import { myAuthentication, myDatabase } from "../utils/FirebaseConfig";

export default function LoginScreen({ navigation }) {
  const [isLoginButtonPressed, setLoginButtonPressed] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openEyeIcon = require("../images/open-eye-icon.png");
  const closedEyeIcon = require("../images/closed-eye-icon.png");
  const [eyeIcon, setEyeIcon] = useState(closedEyeIcon);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleEyeIcons = () => {
    setIsPasswordHidden(!isPasswordHidden);

    if (eyeIcon === closedEyeIcon) {
      setEyeIcon(openEyeIcon);
    } else {
      setEyeIcon(closedEyeIcon);
    }
  };

  const handleLogin = async () => {
    let tempEmail = email;
    tempEmail = tempEmail.trim();

    if (tempEmail == "" || password == "") {
      alert("Please fill all the details");
    } else {
      setLoginButtonPressed(true);
      await myAuthentication
        .signInWithEmailAndPassword(tempEmail, password)
        .then(() => {
          setLoginButtonPressed(false);
          myDatabase
            .collection("users")
            .doc(myAuthentication.currentUser.uid)
            .get()
            .then((categoryData) => {
              //set false to true
              if (categoryData.data().is_Verified == true) {
                navigation.navigate("Home");
              } else {
                alert(
                  "Account is not verified yet. Please wait for few hours."
                );
              }
            });
        })
        .catch((error) => {
          setLoginButtonPressed(false);
          if (error.code == "auth/user-not-found") {
            alert("You have not registered with this email-id.");
          }
          if (error.code == "auth/wrong-password") {
            alert("Incorrect Password");
          }
          if (error.code == "auth/invalid-email") {
            alert("Invalid Email");
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={4000}
          style={styles.image}
          source={require("../images/home-screen-logo.png")}
        />
      </View>

      <Text style={styles.welcomeHeading}>Welcome!</Text>
      <Text
        style={[
          styles.welcomeHeading,
          { fontSize: 25, paddingTop: 0, marginBottom: 40 },
        ]}
      >
        Log-In to Zero Hunger.
      </Text>

      <Animatable.View animation="fadeInUp" style={styles.footer}>
        <View style={styles.inputBoxContainer}>
          <Image
            style={styles.inputBoxIcon}
            source={require("../images/email-icon.png")}
          />
          <InputBox
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <Image
            style={styles.inputBoxIcon}
            source={require("../images/password-icon.png")}
          />

          <InputBox
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordHidden}
          />
          <TouchableOpacity onPress={handleEyeIcons}>
            <Image onPress style={[styles.inputBoxIcon]} source={eyeIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log("Forgot Password")}>
          <Text
            style={{
              textAlign: "right",
              marginRight: 44,
              marginBottom: "8%",
              color: Colors.primary,
              fontWeight: "500",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <MyButton
          isButtonPressed={isLoginButtonPressed}
          text="Login"
          onPress={() => handleLogin()}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#8f8f8f" }}>New to Zero Hunger?{"  "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={{ color: Colors.primary, fontWeight: "500" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  inputBoxIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  inputBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  footer: {
    flex: 2,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
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
