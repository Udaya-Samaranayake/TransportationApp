import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "@/screens/LogeInPage";
import SignUp from "@/screens/SignUpPage";
import HomePage from "@/screens/Home";

const Stack = createStackNavigator();

// Context for managing click counts
const ClickCountContext = createContext({ count: 0, increment: () => {} });

const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <ClickCountContext.Provider value={{ count, increment }}>
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
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={({ route }) => ({
              title: `Welcome, ${route.params.username || "User"}`,
              headerTitleAlign: "center",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClickCountContext.Provider>
  );
};

export default App;
