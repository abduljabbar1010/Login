import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import CApi from "../lib/CApi";
import { useSelector, useDispatch } from "react-redux";
import { setData, resetData } from "../store/reducer/loginReducer";
import React, { useState } from "react";


export default function Register() {
  const registerForm = useSelector((state: any) => state.login.loginInput);
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const onChangeValue = (payload: Partial<typeof registerForm>) => {
    dispatch(setData({ ...registerForm, ...payload }));
  };

  const onSaveData = async () => {
    try {
      if (!registerForm.email || !registerForm.password || !registerForm.confirm_password) {
        ToastAndroid.show("All fields are required!", ToastAndroid.SHORT);
        return;
      }

      if (registerForm.password !== registerForm.confirm_password) {
        ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
        return;
      }

      const { data } = await CApi.post("/register", registerForm, {
        headers: { "Content-Type": "text/plain" },
      });

      ToastAndroid.show("Register Success", ToastAndroid.SHORT);

      dispatch(resetData());
      router.push("/Login");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Create an account so you can explore all the existing jobs
        </Text>
        <TextInput
      style={[
        styles.input,
        focusedInput === "name" && styles.inputFocused,
      ]}
      placeholder="Name"
      value={registerForm.name}
      onChangeText={(value) => onChangeValue({ name: value })}
      onFocus={() => setFocusedInput("name")}
      onBlur={() => setFocusedInput(null)}
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === "email" && styles.inputFocused,
          ]}
          placeholder="Email"
          value={registerForm.email}
          onChangeText={(value) => onChangeValue({ email: value })}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedInput === "password" && styles.inputFocused,
          ]}
          placeholder="Password"
          value={registerForm.password}
          onChangeText={(value) => onChangeValue({ password: value })}
          secureTextEntry
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedInput === "confirm_password" && styles.inputFocused,
          ]}
          placeholder="Confirm Password"
          value={registerForm.confirm_password}
          onChangeText={(value) => onChangeValue({ confirm_password: value })}
          secureTextEntry
          onFocus={() => setFocusedInput("confirm_password")}
          onBlur={() => setFocusedInput(null)}
        />

        <TouchableOpacity onPress={onSaveData} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/Login")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Already have an account</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Or continue with</Text>
        </View>

        <View style={styles.socialIcons}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F41BB",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 55,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#E3F0FF",
    fontSize: 14,
    color: "#333",
  },
  inputFocused: {
    borderColor: "#1F41BB", // Border color when focused
    borderWidth: 2, // Thicker border when focused
    backgroundColor: "#E3F0FF", // Slightly different background when focused
  },
  button: {
    backgroundColor: "#1F41BB",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    fontWeight: "bold",
    color: "#000000",
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  dividerText: {
    textAlign: "center",
    color: "#1F41BB",
    marginTop: 24,
    marginBottom: 10,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    marginTop: 10,
  },
  socialButton: {
    width: 55,
    height: 45,
    backgroundColor: '#E0E0E0', // Light gray background for the container
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Rounded corners for container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Subtle shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Ensure shadow works on Android
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
});
