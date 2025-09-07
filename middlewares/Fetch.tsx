import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export const Fetch = axios.create({
  baseURL: "https://naundshop.onrender.com/",
});

Fetch.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
