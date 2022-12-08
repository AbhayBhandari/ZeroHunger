import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import HomeScreenHeader from "../components/HomeScreenHeader";
import HomeScreenFooter from "../components/HomeScreenFooter";
import SearchBox from "../components/SearchBox";
import Card from "../components/Card";

//import {myDatabase, myStorage} from "../FirebaseConfig";

export default function HomeScreen() {

  const [searchText, setSearchText] = useState('');
  // myDatabase
  //   .collection("users")
  //   .doc("Y5uJfDYUIbkVSnM4tcGv")
  //   .get()
  //   .then((documentSnapshot) => {
  //     if (documentSnapshot.exists) {
  //       console.log(documentSnapshot.data().name);
  //     } else {
  //       console.log("Does not exists");
  //     }
  //   });

  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <SearchBox value={searchText} setValue={setSearchText} />
      <View style={styles.body}>
        <Card
          imageUri={require("../images/MyProfile.jpg")}
          name="Taj"
          type="Hotel"
          location="Pimpri, Pune"
        />
        <Card
          imageUri={require("../images/MyProfile.jpg")}
          name="Taj"
          type="Hotel"
          location="Pimpri, Pune"
        />
      </View>
      <HomeScreenFooter userImage={require("../images/MyProfile.jpg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0,
    
  },

  
});
