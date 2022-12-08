import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import { myAuthentication, myDatabase, myStorage } from "../FirebaseConfig";
import Colors from "../Colors";
import InputBox from "../components/InputBox";

export default function CatererSignUp() {
  const [catererName, setCatererName] = useState(null);
  const [catererAddress, setCatererAddress] = useState(null);
  const [catererImageUri, setCatererImageUri] = useState(null);
  const [fssaiImageUri, setFssaiImageUri] = useState(null);
  const [catererEmail, setCatererEmail] = useState("");
  const [catererMobNumber, setCatererMobNumber] = useState("");
  const [catererPassword, setCatererPassword] = useState("");
  const [catererIdImageUri, setCatererIdImageUri] = useState(null);

  //hiding or showing password
  const openEyeIcon = require("../images/open-eye-icon.png");
  const closedEyeIcon = require("../images/closed-eye-icon.png");
  const [eyeIcon, setEyeIcon] = useState(closedEyeIcon);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  //eye icon to hide or showing password
  const handleEyeIcons = () => {
    setIsPasswordHidden(!isPasswordHidden);

    if (eyeIcon === closedEyeIcon) {
      setEyeIcon(openEyeIcon);
    } else {
      setEyeIcon(closedEyeIcon);
    }
  };

  //Uploading Image
  const handleUploadCatererImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setCatererImageUri(result.uri);
    }
  };

  const handleUploadCatererFssaiImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setFssaiImageUri(result.uri);
    }
  };

  const handleUploadCatererIdImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setCatererIdImageUri(result.uri);
    }
  };

  //Form Validation
  //email validation
  const [checkValidCatererEmail, setCheckValidCatererEmail] =
    useState(false);

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setCatererEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidCatererEmail(true);
    } else {
      setCheckValidCatererEmail(false);
    }
  };

  //Password Validation
  const [checkValidCatererPassword, setCheckValidCatererPassword] =
    useState(false);

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }
    return true;
  };

  const handleCheckPassword = (value) => {
    setCatererPassword(value);
    let isValid = checkPasswordValidity(value);
    if (isValid === true) {
      setCheckValidCatererPassword(true);
    }
  };

  const uploadImage = async (imageUri, imageType, userId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    let filenameAfterDot = imageUri.substring(imageUri.lastIndexOf(".") + 1);

    let filepath = "users/caterers/" + userId + "/";

    let filename = imageType + "." + filenameAfterDot;

    filepath += filename;

    var ref = myStorage.ref().child(filepath).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log("error is ", e);
    }
  };

  const signUp = async (catererEmail, catererPassword) => {
    try {
      await myAuthentication
        .createUserWithEmailAndPassword(catererEmail, catererPassword)
        .then(() => {
          uploadImage(fssaiImageUri, "fssai", myAuthentication.currentUser.uid);
          uploadImage(
            catererImageUri,
            "caterer",
            myAuthentication.currentUser.uid
          );
          uploadImage(
            catererIdImageUri,
            "id",
            myAuthentication.currentUser.uid
          );
        })
        .then(() => {
          myDatabase
            .collection("users")
            .doc(myAuthentication.currentUser.uid)
            .set({
              type: "caterer",
              caterer_name: catererName,
              caterer_address: catererAddress,
              email: catererEmail,
              mobile: catererMobNumber,
              is_Verified: false,
            });
        })
        .then(() => {
          Alert.alert(
            "Zero Hunger",
            "Form Submitted Successfully.\nNote: Admin verification under process.\nOnce verified you can login to Zero Hunger.",
            [{ text: "OK", onPress: () => console.log("Form Submiited") }]
          );
        });
    } catch (e) {
      if (e.code == "auth/email-already-in-use")
        alert("Email Already Registered.");
    }
  };

  const handleSubmit = () => {
    if (
      catererName &&
      catererAddress &&
      catererImageUri &&
      fssaiImageUri &&
      catererName &&
      checkValidCatererEmail &&
      catererMobNumber &&
      checkValidCatererPassword &&
      catererIdImageUri
    ) {
      signUp(catererEmail, catererPassword);
    } else {
      Alert.alert("Zero Hunger", "Please Fill All Details Properly.", [
        { text: "OK", onPress: () => null },
      ]);
    }
  };

  return (
    <View>
      <Text style={styles.selectedTypeHeading}>Caterer Registration</Text>

      <Text style={styles.heading}>Caterer Details</Text>
      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Caterer Name</Text>
        <InputBox
          placeholder="Caterer Name"
          value={catererName}
          onChangeText={setCatererName}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Full Address</Text>
        <InputBox
          placeholder="Full Address"
          value={catererAddress}
          onChangeText={setCatererAddress}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Caterer Image</Text>
        <View>
          {!catererImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={styles.icon}
                source={require("../images/camera-icon.png")}
              />
              <TouchableOpacity onPress={handleUploadCatererImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {catererImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image style={styles.icon} source={{ uri: catererImageUri }} />
              <TouchableOpacity onPress={handleUploadCatererImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Change Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>FSSAI License Certificate</Text>
        <View>
          {!fssaiImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={styles.icon}
                source={require("../images/fssai-icon.png")}
              />
              <TouchableOpacity onPress={handleUploadCatererFssaiImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {fssaiImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image style={styles.icon} source={{ uri: fssaiImageUri }} />
              <TouchableOpacity onPress={handleUploadCatererFssaiImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Change Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Email</Text>
        <InputBox
          placeholder="Email"
          value={catererEmail}
          onChangeText={(text) => handleCheckEmail(text)}
          style={{ fontSize: 18 }}
        />
        {checkValidCatererEmail ? (
          <Text></Text>
        ) : (
          <Text style={styles.validationText}>Invalid Email</Text>
        )}
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Set Password</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputBox
            placeholder="Password"
            value={catererPassword}
            onChangeText={(value) => handleCheckPassword(value)}
            style={{ fontSize: 18 }}
            secureTextEntry={isPasswordHidden}
          />
          <TouchableOpacity onPress={handleEyeIcons}>
            <Image onPress style={[styles.icon]} source={eyeIcon} />
          </TouchableOpacity>
        </View>
        {checkValidCatererPassword ? (
          <Text></Text>
        ) : (
          <Text style={styles.validationText}>
            {checkPasswordValidity(catererPassword)}
          </Text>
        )}
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Mobile Number</Text>
        <InputBox
          placeholder="Mobile Number"
          value={catererMobNumber}
          onChangeText={setCatererMobNumber}
          style={{ fontSize: 18 }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>ID Proof</Text>
        <View>
          {!catererIdImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={styles.icon}
                source={require("../images/id-proof.png")}
              />
              <TouchableOpacity onPress={handleUploadCatererIdImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {catererIdImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image style={styles.icon} source={{ uri: catererIdImageUri }} />
              <TouchableOpacity onPress={handleUploadCatererIdImage}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Change Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Text style={[styles.heading, { marginBottom: 0 }]}>Please Note:</Text>
      <Text style={[styles.label, { marginLeft: 20 }]}>
        Once you submit your form, it will be verified by Admin.
      </Text>
      <Text style={[styles.label, { marginLeft: 20 }]}>
        Once verified then you can use Zero Hunger App.
      </Text>
      <TouchableOpacity onPress={handleSubmit}>
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.submitButton}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            SUBMIT
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "600",
    marginVertical: 20,
    marginLeft: 20,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginLeft: 5,
    marginTop: 3,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 5,
  },
  labelInputBoxWrapper: {
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 20,
    borderRadius: 7,
    padding: 5,
    marginBottom: 22,
    height: 70,
  },
  selectedTypeHeading: {
    alignSelf: "center",
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "bold",
    fontFamily: "serif",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    width: "60%",
    alignSelf: "center",
    height: 50,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  validationText: {
    fontSize: 13,
    color: "red",
    marginTop: 4,
    textAlign: "right",
  },
});
