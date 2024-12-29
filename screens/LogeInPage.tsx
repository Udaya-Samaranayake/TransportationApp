import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = () => {
    setLoading(true);
    setError("");
    // Replace this with your authentication logic
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        alert("Sign In Successful");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#999"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#ccc", true: "#007BFF" }}
            thumbColor={rememberMe ? "#007BFF" : "#f4f3f4"}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.footerText}>Or continue with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8,
    color: "#666",
  },
  forgotPassword: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footerText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});

export default LogIn;
