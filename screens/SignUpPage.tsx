import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";


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

  
    setTimeout(() => {
      if (password === confirmPassword && fullName && email && password) {
        
        navigation.navigate("LogIn"); 
      } else {
        setError("Passwords do not match or fields are empty.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
     
      <Image
        source={require("../assets/logo.png")} 
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
         placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
         placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
         placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
         placeholderTextColor="#000000"
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
  container: { flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: "#fff", padding: 16 },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
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
