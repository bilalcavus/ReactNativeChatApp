import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react"
import { authStyles } from "../../../core/style/AuthScreensStyle";
import { LoginStackParamList } from "../../../navigation/types";
import { useAuthViewModel } from "../../state/auth/AuthViewModel";

const RegisterScreen = () =>  {
    const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>()
    const {register, isLoading, error} = useAuthViewModel();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [showPass, setShowPass] = useState(false);
    const handleRegister = async () => {
        const result = await register({username, email, password});
        return result
    }
    return (
        <View style = {authStyles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={authStyles.title}>Sign up now</Text>
                <Text style={authStyles.subtitle}>Chat with your friends instantly</Text>
            </View>

            {/* EMAIL */}
                  <View style={authStyles.inputContainer}>
                    <Icon name="person-outline" size={20} color="#777" />
                    <TextInput
                      style={authStyles.input}
                      placeholder="Username"
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>

            {/* EMAIL */}
                  <View style={authStyles.inputContainer}>
                    <Icon name="mail-outline" size={20} color="#777" />
                    <TextInput
                      style={authStyles.input}
                      placeholder="Email"
                      value={email}
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
                   {/* REGISTER BUTTON */}
                        {isLoading ? (
                          <ActivityIndicator />
                        ) : (
                          <Pressable style={authStyles.button} onPress={handleRegister}>
                              <Text style= {authStyles.buttonText}>Sign Up</Text>
                          </Pressable>
                        )}
                  
                        <View style= {authStyles.registerTextView}>
                          <Text style= {authStyles.registerText1}>Already have an account?</Text>
                          <Pressable onPress={() => navigation.push('LoginScreen')}>
                            <Text style= {authStyles.registerText2}>Sign in</Text>
                          </Pressable>
                    </View>
        </View>
    )
}

export default RegisterScreen;
