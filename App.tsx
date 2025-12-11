import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./src/data/storage/TokenStorage";
import { ActivityIndicator, View } from "react-native";
import axios from "axios";
import { useAuthViewModel } from "./src/feature/state/auth/AuthViewModel";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [accessToken, refreshToken] = await Promise.all([
          getAccessToken(),
          getRefreshToken(),
        ]);

        if (!accessToken || !refreshToken) {
          await clearTokens();
          useAuthViewModel.getState().resetAuthState();
          return;
        }

        const res = await axios.post(
          "http://localhost:4000/auth/refresh-token",
          { refreshToken }
        );

        const data = res.data.data;

        await saveTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        useAuthViewModel.getState().setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessJti: data.accessJti,
          refreshJti: data.refreshJti,
        });

      } catch (error) {
        await clearTokens();
        useAuthViewModel.getState().resetAuthState();
      } finally {
        useAuthViewModel.getState().setReady();
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
