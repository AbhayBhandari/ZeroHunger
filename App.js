import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import LoginScreen from "./src/screen/LoginScreen";
import OnBoardingScreen from "./src/screen/OnBoardingScreen";
import RegistrationScreen from "./src/screen/RegistrationScreen";
import HomeScreen from "./src/screen/HomeScreen";

export default function App() {

  Stack = createNativeStackNavigator();


  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true"); 
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false); //set it to false 
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={OnBoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
