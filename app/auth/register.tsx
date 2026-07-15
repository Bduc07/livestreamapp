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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing info", "Fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords don't match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      Alert.alert("Registration failed", error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: name,
        is_creator: false,
      });
      if (profileError) {
        setLoading(false);
        Alert.alert("Profile setup failed", profileError.message);
        return;
      }
    }

    setLoading(false);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

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

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
    fontSize: 32,
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
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    height: 60,
    backgroundColor: "#3A86FF",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 18,

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
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#FF006E",
    fontSize: 16,
    fontWeight: "800",
  },
});
