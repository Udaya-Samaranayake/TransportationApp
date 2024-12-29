import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = () => {
    setLoading(true);
    setError("");
    // Mock sign-up logic; replace with actual API call
    setTimeout(() => {
      if (
        fullName &&
        email.includes("@") &&
        password.length >= 6 &&
        password === confirmPassword
      ) {
        alert("Sign-Up Successful");
      } else {
        setError(
          "Please provide valid details (e.g., email, password > 6 characters, and matching passwords)"
        );
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full name"
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
        placeholder="Confirm password"
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
          {loading ? "Signing Up..." : "Sign up"}
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  errorText: { color: 'red', marginBottom: 16 },
  footerText: { marginTop: 16, fontSize: 14 },
  link: { color: '#6C63FF', textDecorationLine: 'underline' },
  socialButtonsContainer: { flexDirection: 'row', marginTop: 16 },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
});

export default SignUp;
