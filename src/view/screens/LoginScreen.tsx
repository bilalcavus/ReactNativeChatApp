import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { authStyles } from "../../core/style/AuthScreensStyle";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";
import { RootStackParamList } from "../../navigation/types";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {login, isLoading, error} = useAuthViewModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const handleLogin = async () => {
    const result = await login({email, password});
    if (result) {
      navigation.replace("ChatList");
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome Back 👋</Text>
      <Text style={authStyles.subtitle}>Chat with your friends instantly</Text>

      {/* EMAIL */}
      <View style={authStyles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#777" />
        <TextInput
          style={authStyles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      {/* PASSWORD */}
      <View style={authStyles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          style={authStyles.input}
          placeholder="Password"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Icon
            name={showPass ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
     
    </View>
  );
};

export default LoginScreen;
