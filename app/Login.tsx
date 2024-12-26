import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; // for social icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import CApi from "@/lib/CApi";
import { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const registerRoute = () => {
    router.push("/Register");
  };

  const [emailFocused, setEmailFocused] = useState(false); // state for email focus
  const [passwordFocused, setPasswordFocused] = useState(false); // state for password focus
  
  const loginRoute = async () => {
    if (!email || !password) {
      ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
      return;
  }

  try {
      const request = {
          email: email,
          password: password,
      }

      const { data } = await CApi.post('/login', request, {
          headers: { 'Content-Type': 'text/plain' }
      })

      console.log('Login berhasil:', data);
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userEmail', data.data.email);
      await AsyncStorage.setItem('userName', data.data.name);

      router.push("/dashboard");
    } catch (err) {
      console.log("Login failed:", err);

      if (err instanceof AxiosError && err.response) {
        const msg = err?.response?.data?.message || 'Terjadi kesalahan';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("An unexpected error occurred", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login here</Text>
      <Text style={styles.subTitle}>Welcome back you’ve been missed!</Text>

      <TextInput
        style={[
          styles.input,
          emailFocused && styles.inputFocused, // Apply focused style when active
        ]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setEmailFocused(true)} // Handle focus
        onBlur={() => setEmailFocused(false)} // Handle blur
      />
      <TextInput
        style={[
          styles.input,
          passwordFocused && styles.inputFocused, // Apply focused style when active
        ]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setPasswordFocused(true)} // Handle focus
        onBlur={() => setPasswordFocused(false)} // Handle blur
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loginRoute} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={registerRoute}>
        <Text style={styles.createAccountText}>Create new account</Text>
      </TouchableOpacity>

      <Text style={styles.orContinueText}>Or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F8F9FD", // light background color
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F41BB",
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 50,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#E3F0FF",
    fontSize: 14,
  },
  inputFocused: {
    borderColor: "#1F41BB", // Border color when focused
    borderWidth: 2, // Thicker border when focused
    backgroundColor: "#E3F0FF", // Slightly different background when focused
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: "#1F41BB",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1F41BB",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  createAccountText: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  orContinueText: {
    textAlign: "center",
    color: "#1F41BB",
    marginTop: 24,
    marginBottom: 10,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 60,
    marginTop: 10,
  },
  socialButton: {
    width: 55,
    height: 45,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
