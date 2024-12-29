import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "@/screens/LogeInPage"; // ensure correct file name
import SignUp from "@/screens/SignUpPage";  // ensure correct file name

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign Up", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
