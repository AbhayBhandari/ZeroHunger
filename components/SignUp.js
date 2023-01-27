import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import Colors from "../Colors";
import InputBox from "../components/InputBox";
import { myAuthentication, myDatabase, myStorage } from "../FirebaseConfig";
import MyButton from "./MyButton";
import { useNavigation } from "@react-navigation/native";

export default function SignUp({ categoryType }) {
  const navigation = useNavigation();

  const [categoryName, setCategoryName] = useState("");
  const [categoryCity, setCategoryCity] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [categoryAddress, setCategoryAddress] = useState("");
  const [categoryImageUri, setCategoryImageUri] = useState(null);
  const [fssaiImageUri, setFssaiImageUri] = useState(null);

  const [registrantName, setRegistrantName] = useState("");
  const [registrantEmail, setRegistrantEmail] = useState("");
  const [registrantMobNumber, setRegistrantMobNumber] = useState("");
  const [registrantPassword, setRegistrantPassword] = useState("");
  const [registrantIdImageUri, setRegistrantIdImageUri] = useState(null);

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
  const handleUploadCategoryImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setCategoryImageUri(result.uri);
    }
  };

  const handleUploadCategoryFssaiImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setFssaiImageUri(result.uri);
    }
  };

  const handleUploadRegistrantIdImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setRegistrantIdImageUri(result.uri);
    }
  };

  //Form Validation
  //email validation
  const [checkValidRegistrantEmail, setCheckValidRegistrantEmail] =
    useState(false);

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setRegistrantEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidRegistrantEmail(true);
    } else {
      setCheckValidRegistrantEmail(false);
    }
  };

  //Password Validation
  const [checkValidRegistrantPassword, setCheckValidRegistrantPassword] =
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
    setRegistrantPassword(value);
    let isValid = checkPasswordValidity(value);
    if (isValid === true) {
      setCheckValidRegistrantPassword(true);
    }
  };

  const uploadImage = async (imageUri, imageType, userId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    let filenameAfterDot = imageUri.substring(imageUri.lastIndexOf(".") + 1);

    let filepath = `users/${categoryType}/` + userId + "/";

    let filename = imageType + "." + filenameAfterDot;

    filepath += filename;

    var ref = myStorage.ref().child(filepath).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log("error is ", e);
    }
  };

  const signUp = async (registrantEmail, registrantPassword) => {
    try {
      await myAuthentication
        .createUserWithEmailAndPassword(registrantEmail, registrantPassword)
        .then(() => {
          uploadImage(fssaiImageUri, "fssai", myAuthentication.currentUser.uid);
          uploadImage(
            categoryImageUri,
            categoryType,
            myAuthentication.currentUser.uid
          );
          uploadImage(
            registrantIdImageUri,
            "id",
            myAuthentication.currentUser.uid
          );
        })
        .then(() => {
          myDatabase
            .collection("users")
            .doc(myAuthentication.currentUser.uid)
            .set({
              type: categoryType,
              category_name: categoryName, //name of hotel, restaurant, caterering, NGO
              category_city: categoryCity,
              category_state: categoryState,
              category_address: categoryAddress,
              registrant_name: registrantName,
              email: registrantEmail,
              mobile: registrantMobNumber,
              is_Verified: false,
            });
        })
        .then(() => {
          Alert.alert(
            "Zero Hunger",
            "Form Submitted Successfully.\nNote: Admin verification under process.\nOnce verified you can login to Zero Hunger.",
            [{ text: "OK", onPress: () => navigation.navigate("Login") }]
          );
        });
    } catch (e) {
      if (e.code == "auth/email-already-in-use")
        alert("Email Already Registered.");
    }
  };
  const handleSubmit = () => {
    if (
      categoryName &&
      categoryCity &&
      categoryState &&
      categoryAddress &&
      categoryImageUri &&
      fssaiImageUri &&
      registrantName &&
      checkValidRegistrantEmail &&
      registrantMobNumber &&
      checkValidRegistrantPassword &&
      registrantIdImageUri
    ) {
      signUp(registrantEmail, registrantPassword);
    } else {
      Alert.alert("Zero Hunger", "Please Fill All Details Properly.", [
        { text: "OK", onPress: () => null },
      ]);
    }
  };

  return (
    <View>
      <Text style={styles.selectedTypeHeading}>
        {categoryType} Registration
      </Text>

      <Text style={styles.heading}>{categoryType} Details</Text>
      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>{categoryType} Name</Text>
        <InputBox
          placeholder={`${categoryType} Name`}
          value={categoryName}
          onChangeText={setCategoryName}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>City</Text>
        <InputBox
          placeholder="City Name"
          value={categoryCity}
          onChangeText={setCategoryCity}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>State</Text>
        <InputBox
          placeholder="State Name"
          value={categoryState}
          onChangeText={setCategoryState}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Full Address</Text>
        <InputBox
          placeholder="Full Address"
          value={categoryAddress}
          onChangeText={setCategoryAddress}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>{categoryType} Image</Text>
        <View>
          {!categoryImageUri && (
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
              <TouchableOpacity onPress={handleUploadCategoryImage}>
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
          {categoryImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image style={styles.icon} source={{ uri: categoryImageUri }} />
              <TouchableOpacity onPress={handleUploadCategoryImage}>
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
              <TouchableOpacity onPress={handleUploadCategoryFssaiImage}>
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
              <TouchableOpacity onPress={handleUploadCategoryFssaiImage}>
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

      <Text style={styles.heading}>Registrant Contact Details</Text>
      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Registrant Name</Text>
        <InputBox
          placeholder="Name"
          value={registrantName}
          onChangeText={setRegistrantName}
          style={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Email</Text>
        <InputBox
          placeholder="Email"
          value={registrantEmail}
          onChangeText={(text) => handleCheckEmail(text)}
          style={{ fontSize: 18 }}
        />
        {checkValidRegistrantEmail ? (
          <Text></Text>
        ) : (
          <Text style={styles.validationText}>Invalid Email</Text>
        )}
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Mobile Number</Text>
        <InputBox
          placeholder="Mobile Number"
          value={registrantMobNumber}
          onChangeText={setRegistrantMobNumber}
          style={{ fontSize: 18 }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>Set Password</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputBox
            placeholder="Password"
            value={registrantPassword}
            onChangeText={(value) => handleCheckPassword(value)}
            style={{ fontSize: 18 }}
            secureTextEntry={isPasswordHidden}
          />
          <TouchableOpacity onPress={handleEyeIcons}>
            <Image onPress style={[styles.icon]} source={eyeIcon} />
          </TouchableOpacity>
        </View>
        {checkValidRegistrantPassword ? (
          <Text></Text>
        ) : (
          <Text style={styles.validationText}>
            {checkPasswordValidity(registrantPassword)}
          </Text>
        )}
      </View>

      <View style={styles.labelInputBoxWrapper}>
        <Text style={styles.label}>ID Proof</Text>
        <View>
          {!registrantIdImageUri && (
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
              <TouchableOpacity onPress={handleUploadRegistrantIdImage}>
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
          {registrantIdImageUri && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={styles.icon}
                source={{ uri: registrantIdImageUri }}
              />
              <TouchableOpacity onPress={handleUploadRegistrantIdImage}>
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
      <MyButton
        buttonStyle={{ width: "60%", marginBottom: 80 }}
        text="SUBMIT"
        onPress={handleSubmit}
      />
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

  validationText: {
    fontSize: 13,
    color: "red",
    marginTop: 4,
    textAlign: "right",
  },
});
