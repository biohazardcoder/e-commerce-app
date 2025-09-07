import { Navbar } from '@/components/Navbar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Fetch } from '@/middlewares/Fetch';
import { ClothTypes } from '@/types/types';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [clothes, setClothes] = useState<ClothTypes[]>([])
  const getClothes = async () => {
    try {
      setLoading(true);
      const response = (await Fetch.get("product")).data;
      setClothes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClothes();
  }, []);

  const SkeletonCard = () => (
    <View style={[styles.item]}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={[styles.skeletonText, { width: "60%" }]} />
      <View style={styles.skeletonBtn} />
    </View>
  );
  const mensClothes = clothes.filter(item=>item.category ==="Erkaklar").slice(0,4)
  const womensClothes = clothes.filter(item=>item.category ==="Ayollar").slice(0,4)
  const kidsClothes = clothes.filter(item=>item.category ==="Bolalar").slice(0,4)
  const accessories = clothes.filter(item=>item.category ==="Aksessuarlar").slice(0,4)
  return (
    <ScrollView>
      <Navbar />
      <View >
        {loading
          ? 
            <View>
              <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Men's Clothes</ThemedText>
              <View style={styles.container}>
                {Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)}
              </View>
              <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Women's Clothes</ThemedText>
              <View style={styles.container}>
                {Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)}
              </View>
              <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Kid's Clothes</ThemedText>
              <View style={styles.container}>
                {Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)}
              </View>
               <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Accessories</ThemedText>
              <View style={styles.container}>
                {Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)}
              </View>
            </View>
          : <View >
            <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Men's Clothes</ThemedText>
            <View style={styles.container}>
                 {
                mensClothes.map(({ _id, title, photos, price }) => (
              <ThemedView key={_id} style={styles.item}>
                <Image source={photos[0]} style={styles.image} contentFit="cover" />
                <ThemedText style={{ fontSize: 12 }}>
                  {price.toLocaleString()} UZS
                </ThemedText>
                <ThemedText style={{ fontSize: 12, fontWeight: "600" }}>
                  {title}
                </ThemedText>
                <Link href={{
                  pathname: "/detail/[id]",
                  params: {id : _id}
                }} asChild>
                   <TouchableOpacity style={styles.shopBtn}>
                  <Text style={styles.shopBtnText}>Buy</Text>
                </TouchableOpacity>
                </Link>
              </ThemedView>
            ))
              }
            </View>
            <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Women's Clothes</ThemedText>
            <View style={styles.container}>
                 {
                womensClothes.map(({ _id, title, photos, price }) => (
              <ThemedView key={_id} style={styles.item}>
                <Image source={photos[0]} style={styles.image} contentFit="cover" />
                <ThemedText style={{ fontSize: 12 }}>
                  {price.toLocaleString()} UZS
                </ThemedText>
                <ThemedText style={{ fontSize: 12, fontWeight: "600" }}>
                  {title}
                </ThemedText>
                <Link href={{
                  pathname: "/detail/[id]",
                  params: {id : _id}
                }} asChild>
                   <TouchableOpacity style={styles.shopBtn}>
                  <Text style={styles.shopBtnText}>Buy</Text>
                </TouchableOpacity>
                </Link>
              </ThemedView>
            ))
              }
            </View>
            <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Kid's Clothes</ThemedText>
            <View style={styles.container}>
                 {
                kidsClothes.map(({ _id, title, photos, price }) => (
              <ThemedView key={_id} style={styles.item}>
                <Image source={photos[0]} style={styles.image} contentFit="cover" />
                <ThemedText style={{ fontSize: 12 }}>
                  {price.toLocaleString()} UZS
                </ThemedText>
                <ThemedText style={{ fontSize: 12, fontWeight: "600" }}>
                  {title}
                </ThemedText>
                <Link href={{
                  pathname: "/detail/[id]",
                  params: {id : _id}
                }} asChild>
                   <TouchableOpacity style={styles.shopBtn}>
                  <Text style={styles.shopBtnText}>Buy</Text>
                </TouchableOpacity>
                </Link>
              </ThemedView>
            ))
              }
            </View>
            <ThemedText style={{paddingHorizontal:20, paddingTop:20, fontSize:28, fontWeight:"bold"}}>Accessories</ThemedText>
            <View style={styles.container}>
                 {
                accessories.map(({ _id, title, photos, price }) => (
              <ThemedView key={_id} style={styles.item}>
                <Image source={photos[0]} style={styles.image} contentFit="cover" />
                <ThemedText style={{ fontSize: 12 }}>
                  {price.toLocaleString()} UZS
                </ThemedText>
                <ThemedText style={{ fontSize: 12, fontWeight: "600" }}>
                  {title}
                </ThemedText>
                <Link href={{
                  pathname: "/detail/[id]",
                  params: {id : _id}
                }} asChild>
                   <TouchableOpacity style={styles.shopBtn}>
                  <Text style={styles.shopBtnText}>Buy</Text>
                </TouchableOpacity>
                </Link>
              </ThemedView>
            ))
              }
            </View>
            </View>}
      </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-between"
  },
  item: {
    width: "48%",
    padding: 12,
    justifyContent:"space-between"
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
  shopBtn: {
    marginTop: 8,
    backgroundColor: "#004643",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
  shopBtnText: {
    color: "white",
    fontSize: 14,
    marginLeft: 6,
  },

  skeletonImage: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    marginBottom: 8,
  },
  skeletonText: {
    height: 14,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
    marginBottom: 6,  
    width: "80%",
  },
  skeletonBtn: {
    height: 36,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    marginTop: 6,
  },
});
