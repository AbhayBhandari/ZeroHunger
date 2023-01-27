import { StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryTab from "./CategoryTab";
import MyProfileTab from "./MyProfileTab";
import Colors from "../utils/Colors";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ route }) {
  const categoryType = route.params.categoryType;
  if (
    categoryType == "Hotel" ||
    categoryType == "Restaurant" ||
    categoryType == "Caterering"
  ) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.grey,
            marginHorizontal: -50,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (route.name == "NGOTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/ngo-filled.png")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/ngo.png")}
                  />
                );
              }
            }
            if (route.name == "MyProfileTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.profileFocusedIconStyle}
                    source={require("../images/MyProfile.jpg")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.profileUnFocusedIconStyle}
                    source={require("../images/MyProfile.jpg")}
                  />
                );
              }
            }
          },
        })}
      >
        <Tab.Screen
          name="NGOTab"
          component={CategoryTab}
          initialParams={{ categoryType: "NGO" }}
        />
        <Tab.Screen name="MyProfileTab" component={MyProfileTab} />
      </Tab.Navigator>
    );
  }
  //for NGO Login
  else {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.grey,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (route.name == "HotelTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/hotel-filled.png")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/hotel.png")}
                  />
                );
              }
            }
            if (route.name == "RestaurantTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/restaurant-filled.png")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/restaurant.png")}
                  />
                );
              }
            }
            if (route.name == "CatereringTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/caterer-filled.png")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.iconStyle}
                    source={require("../images/caterer.png")}
                  />
                );
              }
            }
            if (route.name == "MyProfileTab") {
              if (focused) {
                return (
                  <Image
                    style={styles.profileFocusedIconStyle}
                    source={require("../images/MyProfile.jpg")}
                  />
                );
              } else {
                return (
                  <Image
                    style={styles.profileUnFocusedIconStyle}
                    source={require("../images/MyProfile.jpg")}
                  />
                );
              }
            }
          },
        })}
      >
        <Tab.Screen
          name="HotelTab"
          component={CategoryTab}
          initialParams={{ categoryType: "Hotel" }}
        />
        <Tab.Screen
          name="RestaurantTab"
          component={CategoryTab}
          initialParams={{ categoryType: "Restaurant" }}
        />
        <Tab.Screen
          name="CatereringTab"
          component={CategoryTab}
          initialParams={{ categoryType: "Caterering" }}
        />
        <Tab.Screen name="MyProfileTab" component={MyProfileTab} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 35,
    resizeMode: "contain",
  },
  profileFocusedIconStyle: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 100,
    overflow: "hidden",
    borderColor: Colors.primary,
  },
  profileUnFocusedIconStyle: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 100,
    overflow: "hidden",
  },
});
