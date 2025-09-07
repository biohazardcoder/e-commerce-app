import { Navbar } from '@/components/Navbar'
import { ThemedText } from '@/components/ThemedText'
import { RootState } from '@/store/RootStore'
import { setLogout } from '@/toolkit/UserSlicer'
import { AdminTypes } from '@/types/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { useRootNavigationState, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const color = useColorScheme()
  const { data } = useSelector((state: RootState) => state.user)
  const user = (data as AdminTypes) || {}
  const router = useRouter()
  const rootNavigation = useRootNavigationState()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    dispatch(setLogout())
    
    if (rootNavigation?.key) {
      router.push("/")
    }
  }

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.flex}>
            <TouchableOpacity onPress={()=>router.replace("/")}>
              <MaterialIcons color={color === "dark" ? "#ECEDEE" : "#11181C"} size={40} name='chevron-left' />
            </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons color={color === "dark" ? "#ECEDEE" : "#11181C"} size={32} name='logout' />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Image source={user.avatar} style={styles.avatar} />
          <ThemedText style={styles.name}>
            {user.firstName} {user.lastName}
          </ThemedText>
          <ThemedText style={styles.phone}>
            +998 {user.phoneNumber}
          </ThemedText>
          <ThemedText style={styles.phone}>
             {user.address}
          </ThemedText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    padding: 20
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 15
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },
  phone: {
    marginTop: 4,
    color: "#9BA1A6",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700"
  },
  flex: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between"
  }
})
