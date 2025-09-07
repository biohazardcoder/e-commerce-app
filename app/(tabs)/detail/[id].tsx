import { Navbar } from '@/components/Navbar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Fetch } from '@/middlewares/Fetch';
import { ClothTypes } from '@/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function Detail  () {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [cloth, setCloth] = useState<ClothTypes>()
      const [loading, setLoading] = useState(false); 
    const color = useColorScheme()
    const router = useRouter()
      const toast = useToast(); 
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    useEffect(()=>{
      const getClothById =  async () => {
        setLoading(true)
        const response = (await Fetch.get(`/product/${id}`)).data
        setCloth(response.data);
        setLoading(false)
      }
      const initCart = async () => {
        try {
          const existing = await AsyncStorage.getItem("cart");
          if (!existing) {
            await AsyncStorage.setItem("cart", JSON.stringify([]));
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (id) getClothById();
      initCart();
    }, [id])

    const sizes = cloth?.size.split(",").map(s => s.trim());
    const colors = cloth?.color.split(",").map(s => s.trim());

  const handleAddToCart = async () => {
    if (!cloth) return;

    const shopItem = {
      id: cloth._id,
      title: cloth.title,
      price: cloth.price,
      quantity: 1,
      img: cloth.photos[0],
      size: selectedSize,
      color: selectedColor,
    };

    try {
      const existing = await AsyncStorage.getItem("cart");
      const cart = existing ? JSON.parse(existing) : [];

      const already = cart.find(
        (item: any) =>
          item.id === shopItem.id &&
          item.size === shopItem.size &&
          item.color === shopItem.color
      );

      if (already) {
        toast.show("Already in cart ❗", { type: "warning" });
        return;
      }

      cart.push(shopItem);
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      toast.show("Added to cart ", { type: "success" });
    } catch (error) {
      console.log("Cart error:", error);
      toast.show("Something went wrong ", { type: "danger" });
    }
  };

  if (loading) {
    return <ScrollView style={{ gap: 10, }}>
            <Navbar/>
            <View style={{padding:20,gap:10}}>
               <View style={{ width: "100%", height: 500, marginTop:52, backgroundColor: "#ccc", borderRadius: 10 }} />
            <View style={{ width: "70%", height: 30, backgroundColor: "#ccc", borderRadius: 6 }} />
            <View style={{ width: "40%", height: 20, backgroundColor: "#ccc", borderRadius: 6 }} />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ width: 60, height: 30, backgroundColor: "#ccc", borderRadius: 6 }} />
              <View style={{ width: 60, height: 30, backgroundColor: "#ccc", borderRadius: 6 }} />
            </View>
            </View>
          </ScrollView>
  }


  return (
    <ScrollView >
      <Navbar/>
      <View style={styles.container}>
            <TouchableOpacity onPress={()=>router.replace("/")}>
              <MaterialIcons color={color === "dark" ? "#ECEDEE" : "#11181C"} size={40} name='chevron-left' /> 
            </TouchableOpacity>
            <Image source={cloth?.photos[0]} style={styles.image}/>
            <View style={{flexDirection:'row', justifyContent:"space-between" , alignItems:"center"}}>
               <ThemedText style={{fontSize:32, paddingVertical:10, fontWeight:"bold"}}>
              {cloth?.title && cloth?.title.length > 10 ? `${cloth?.title.slice(0,10)}...` : cloth?.title}
            </ThemedText>
             <ThemedText style={{fontSize:20, fontWeight:"bold", padding:6, color:cloth?.stock && cloth?.stock > 0 ? '#000':'#fff', borderRadius:6, backgroundColor: cloth?.stock && cloth?.stock > 0 ? '#0f0':'crimson'}}>
              {cloth?.sale && cloth?.sale > 0 ?"Available" : "Unavailable"}
            </ThemedText>
            </View>
            <ThemedText style={{fontSize:16 }}>
              {cloth?.company}
            </ThemedText>
              {sizes && sizes.length > 0 && <View>
                <ThemedText>Sizes</ThemedText>
                <View style={{flexDirection:"row", flexWrap:"wrap", gap:20}}>
                {sizes.map((item:string,index:number)=>(
                    <TouchableOpacity onPress={()=>setSelectedSize(item)} key={index} style={{borderColor:"#004643", backgroundColor: selectedSize === item ? "#004643" : "#302f2c",  borderWidth:4, padding:8, paddingHorizontal:10, borderRadius: 6}}>
                        <ThemedText>
                          {item}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
                </View>
                </View>}

              {colors && colors.length > 0 && <View>
                  <ThemedText>Colors</ThemedText>
                  <View style={{flexDirection:"row", gap:20}}>
                  {colors.map((item:string,index:number)=>(
                      <TouchableOpacity onPress={()=>setSelectedColor(item)} key={index} style={{borderColor:"#004643",  backgroundColor: item,  borderWidth: 4, padding:20, borderRadius: selectedColor === item ? "100%" :6}}/>       
                  ))}
                  </View>
                </View>}

           <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <ThemedView style={styles.cartFlex}>
            <ShoppingCart
              color={color === "dark" ? "#ECEDEE" : "#11181C"}
              size={20}
            />
            <ThemedText> Add to Cart | {cloth?.price.toLocaleString()} UZS{" "}
              {cloth?.sale && cloth.sale > 0 && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                    textDecorationLine: "line-through",
                  }}
                >
                  {cloth?.sale.toLocaleString()} UZS
                </Text>
              )}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    height:"100%",
  },
  image:{
    width:"100%",
    height:"100%",
    objectFit:"cover",
    borderRadius:10
  },
  cartBtn : {
    width:"100%",
    height:20,
    margin:"auto",
  },
  cartFlex :{
    flexDirection:"row",
    backgroundColor:"#004643",
    padding:10,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  }
})