import { useColorScheme } from '@/hooks/useColorScheme'
import { RootState } from '@/store/RootStore'
import { Link, usePathname } from 'expo-router'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

export const Navbar = () => {
    const pathname = usePathname()
    const {isAuth,isPending} = useSelector((state:RootState)=>state.user)
    const colorScheme = useColorScheme();
  return (
    <ThemedView style={styles.container}>
        <Link href={"/"}>
            <ThemedText style={styles.title}>
                E-Commerce
            </ThemedText>
        </Link>
        {
            isPending && <ActivityIndicator size="small"   color={ colorScheme === "dark" ?"#ECEDEE" :"#11181C"} />
        }
       {
        !isPending && !isAuth&& pathname !== "/login" &&  <Link href={"/login"}>
            <ThemedText style={styles.title}>
                Login
            </ThemedText>
        </Link>
       }
        {
        isAuth &&  !isPending  && pathname !== "/dashboard" &&  <Link href={"/dashboard"}>
            <ThemedText style={styles.title}>
                Dashboard
            </ThemedText>
        </Link>
       }
    </ThemedView>
)}

const styles = StyleSheet.create({
    container:{
        paddingTop:50,
        padding:15,
        flexDirection:'row',
        justifyContent:"space-between"
    },
    title:{
        fontWeight:'bold'
    },
    avatar: {
    width: 10,
    height: 10,
  },

})