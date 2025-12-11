import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { authStyles } from "../../../core/style/AuthScreensStyle";
import { LoginStackParamList } from "../../../navigation/types";
import { useAuthViewModel } from "../../state/auth/AuthViewModel";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const {login, isLoading, error} = useAuthViewModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const handleLogin = async () => {
    const result = await login({email, password});
    return result;
  };

  return (
    
    <View style={authStyles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>

        
        <Text style={authStyles.title}>Welcome Back 👋</Text>
        <Text style={authStyles.subtitle}>Chat with your friends instantly</Text>
      </View>
      

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
        <Pressable style={authStyles.button} onPress={handleLogin}>
            <Text style= {authStyles.buttonText}>Login</Text>
        </Pressable>
      )}

      <View style= {authStyles.registerTextView}>
        <Text style= {authStyles.registerText1}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.push('RegisterScreen')}>
          <Text style= {authStyles.registerText2}>Register</Text>
        </Pressable>
        
      </View>
     
    </View>
  );
};

export default LoginScreen;
