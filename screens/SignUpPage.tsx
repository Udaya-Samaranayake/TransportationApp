import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// Define navigation stack types
type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Home: { username: string };
};

type SignUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = () => {
    setLoading(true);
    setError("");

    // Mock validation logic
    setTimeout(() => {
      if (
        fullName === "Udaya Samaranayake" &&
        email === "test@example.com" &&
        password === "password" &&
        password === password
      ) {
        // Navigate to Home page with username
        navigation.navigate("Home", { username: fullName });
      } else {
        setError(
          "Invalid credentials! Use: Full Name - Udaya Samaranayake, Email - test@example.com, Password - password."
        );
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("LogIn")}
        >
          Sign In
        </Text>
      </Text>
      <Text style={styles.footerText}>Or continue with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="google" size={20} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="apple" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  errorText: { color: "red", marginBottom: 16 },
  footerText: { marginTop: 16, fontSize: 14 },
  link: { color: "#6C63FF", textDecorationLine: "underline" },
  socialButtonsContainer: { flexDirection: "row", marginTop: 16 },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    elevation: 2,
  },
});

export default SignUp;
