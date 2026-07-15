import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Enter both email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error.message);
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE45C",
    justifyContent: "center",
  },

  content: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 25,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#444",
    marginBottom: 35,
  },

  input: {
    height: 60,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 18,
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#FFF",
    marginBottom: 18,
  },

  button: {
    height: 60,
    backgroundColor: "#FF4D6D",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  link: {
    marginTop: 22,
    textAlign: "center",
    color: "#0066FF",
    fontSize: 16,
    fontWeight: "800",
  },
});
