import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  await AsyncStorage.multiSet([
    ["accessToken", data.accessToken],
    ["refreshToken", data.refreshToken],
  ]);
};

export const getAccessToken = async () => {
    return AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async () => {
    return AsyncStorage.getItem('refreshToken');
};

export const clearTokens = async () => {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
};
