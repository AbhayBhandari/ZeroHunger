import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreenHeader from "../components/HomeScreenHeader";
import HomeScreenFooter from "../components/HomeScreenFooter";
import SearchBox from "../components/SearchBox";
import Card from "../components/Card";

import { myDatabase, myStorage } from "../utils/FirebaseConfig";

export default function HomeScreen() {
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    myDatabase
      .collection("users")
      //.where("type", "==", "Caterering")
      .get()
      .then((categoryData) => {
        categoryData.forEach((data) => {
          let url = myStorage.ref(
            `users/${data.data().type}/${data.id}/${data.data().type}.jpeg`
          );
          (async () => {
            url = await url.getDownloadURL();

            setDATA((preArray) => [
              ...preArray,
              {
                id: data.id,
                imageUri: url,
                name: data.data().category_name,
                type: `${data.data().type}`,
                location: `${data.data().category_city}, ${
                  data.data().category_state
                }`,
              },
            ]);
          })();
        });
      });
  }, []);

  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <SearchBox value={searchText} setValue={setSearchText} />
      <View style={styles.body}>
        <FlatList
          data={DATA}
          keyExtractor={(data) => data.id}
          renderItem={({ item }) => (
            <Card
              imageUri={item.imageUri}
              name={item.name}
              type={item.type}
              location={item.location}
              userId={item.id}
            />
          )}
          ListFooterComponent={() => <View style={{ marginBottom: 40 }} />}
        />
      </View>
      <HomeScreenFooter userImage={require("../images/MyProfile.jpg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
  },
});
