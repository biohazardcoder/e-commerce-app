import { useColorScheme } from '@/hooks/useColorScheme'
import { RootState } from '@/store/RootStore'
import { Link, usePathname, useRouter } from 'expo-router'
import { ShoppingCart } from 'lucide-react-native'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

export const Navbar = () => {
    const pathname = usePathname()
    const {isAuth,isPending} = useSelector((state:RootState)=>state.user)
    const colorScheme = useColorScheme();
    const router = useRouter()
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
        isAuth &&  !isPending  && pathname !== "/cart" &&  
            <ThemedText style={styles.title} onPress={()=>router.push("/cart")}>
                <ShoppingCart/>
            </ThemedText>
       
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