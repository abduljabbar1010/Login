import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const { height } = Dimensions.get("window");
// link ke menu login
const loginRoute = () => {
  router.push('/Login')
}

// link ke menu register
const registerRoute = () => {
  router.push('/Register')
}

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={require("../assets/images/welcome-img.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Discover Your Dream Job here</Text>
          <Text style={styles.subtitle}>
            Explore all the existing job roles based on your interest and study
            major.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={loginRoute}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={registerRoute}
            style={styles.registerButton}
          >
            
            <Text style={styles.buttonTextSecondary}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: height / 2.5,
    marginTop: 50,
  },
  textContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    color: "#1F41BB", 
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#000000", // Text color
    textAlign: "center",
    marginTop: 16,

  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  loginButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "48%",
    borderRadius: 8,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  registerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "48%",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

