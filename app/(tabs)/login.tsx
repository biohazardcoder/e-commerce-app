import { Navbar } from '@/components/Navbar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { setUser } from '@/toolkit/UserSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Login () {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const theme = useColorScheme()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = (await axios.post("https://naundshop.onrender.com/client/login",{
        phoneNumber:phone,
        password
      })).data 
      await AsyncStorage.setItem("token", response.token);
      dispatch(setUser(response.client))
      router.replace("/")  
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <View>
        <Navbar/>
        <View style={styles.container}>
          <ThemedView style={styles.card}>
              <ThemedText style={styles.title}>
                Welcome back
              </ThemedText>
              <TextInput placeholder='Phone' style={theme === "dark" ? styles.input : styles.input_dark} value={phone}  onChangeText={value=>setPhone(value)}/>
              <TextInput placeholder='Password' style={theme === "dark" ? styles.input : styles.input_dark} value={password}  onChangeText={value=>setPassword(value)}/>
               <TouchableOpacity disabled={loading} onPress={handleSubmit} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>{loading ? "Logging in..." : "Login"}</Text>
                </TouchableOpacity>
                <ThemedText style={styles.link}>
                Don't have an account? <TouchableOpacity>
                  <ThemedText style={styles.register}>
                  Register    
                  </ThemedText>
                </TouchableOpacity> here
              </ThemedText>
          </ThemedView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height:"100%",
    alignItems:'center',
    justifyContent:"center"
  },
  card:{
     padding:20,
     borderRadius:10,
     gap:10
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:"center"
  },
  input:{
    borderWidth:2,
    borderColor:"#ECEDEE",
    color:"#fff",
    marginTop:10,
    borderRadius:4,
    padding:6
  },
  input_dark: {
     borderWidth:2,
    borderColor:"#11181C",
    color:"#000",
    marginTop:10,
    borderRadius:4,
    padding:6
  },
    loginBtn: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
  loginBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight:"700",
    marginLeft: 6,
  },
  link:{
    fontSize:12
  },
  register:{
    color:"dodgerblue",
    textDecorationLine:"underline",
    fontWeight:"500",
    fontSize:14
  }
})