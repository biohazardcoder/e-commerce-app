import { Navbar } from "@/components/Navbar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Fetch } from "@/middlewares/Fetch";
import { RootState } from "@/store/RootStore";
import { AdminTypes } from "@/types/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img?: string;
  color?: string;
  size?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state: RootState) => state.user);
  const user = (data as AdminTypes) || {};
  const router = useRouter();
  const color = useColorScheme();
  const toast = useToast()
  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const saved = await AsyncStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
      };
      loadCart();
    }, [])
  );

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handleRemoveItem = (index: number) => {
    Alert.alert("Tasdiqlash", "Bu mahsulotni o‘chirishni xohlaysizmi?", [
      { text: "Bekor qilish", style: "cancel" },
      {
        text: "Ha",
        onPress: () => {
          const updatedCart = cart.filter((_, i) => i !== index);
          setCart(updatedCart);
        },
      },
    ]);
  };

  const handleQuantityChange = (index: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(newQty, 1) };
        }
        return item;
      })
    );
  };

  const handleCheckout = async () => {
    if (!cart.length) {
      return Alert.alert("Xatolik", "Savatingiz bo‘sh!");
    }
    try {
      setLoading(true);
      const orderData = {
        customer: user._id,
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          title: item.title,
        })),
        status: "Kutilmoqda",
        totalPrice: total,
      };

      const res = await Fetch.post("/order/new-order", orderData);
      console.log("order:", res.data);

      toast.show("Your order created!", {type:"success"})
      setCart([]);
      await AsyncStorage.removeItem("cart");
    } catch (err: any) {
        toast.show("Error in create order", {type:"danger"})
        console.log("order error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <View>
        <Navbar />
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <MaterialIcons
              color={color === "dark" ? "#ECEDEE" : "#11181C"}
              size={40}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.empty}>
          <ThemedText style={styles.emptyText}>Your cart is empty!</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
        <Navbar/>
        <View style={{padding:20}}>
            <TouchableOpacity onPress={() => router.replace("/")}>
            <MaterialIcons
              color={color === "dark" ? "#ECEDEE" : "#11181C"}
              size={40}
              name="chevron-left"
            />
          </TouchableOpacity>
            <ThemedText style={styles.title}>Your cart</ThemedText>
      {cart.map((item, index) => (
        <ThemedView key={index} style={styles.item}>
          <Image
            source={{ uri: item.img || "https://via.placeholder.com/60" }}
            style={styles.image}
          />
          <View style={styles.info}>
            <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.price}>{item.price.toLocaleString()} UZS</ThemedText>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange(index, "dec")}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <ThemedText>{item.quantity}</ThemedText>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange(index, "inc")}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ThemedText style={styles.totalPrice}>
              {(item.price * item.quantity).toLocaleString()} UZS
            </ThemedText>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleRemoveItem(index)}
            >
              <Trash2/>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ))}

      <ThemedText style={styles.summary}>
        Jami: <ThemedText style={styles.bold}>{total.toLocaleString()} UZS</ThemedText>
      </ThemedText>

      <TouchableOpacity
        style={[styles.checkoutBtn, loading && { opacity: 0.6 }]}
        onPress={handleCheckout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ThemedText style={styles.checkoutText}>Create Order</ThemedText>
        )}
      </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  item: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, marginHorizontal: 8 },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#666", marginBottom: 4 },
  quantityRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#eee",
    borderRadius: 4,
  },
  qtyText: { fontSize: 18 },
  totalPrice: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  deleteBtn: {width:40, height:40, backgroundColor: "crimson", color:"#fff", alignItems:"center", justifyContent:"center",  borderRadius: 4 },
  summary: { fontSize: 18, textAlign: "right", marginTop: 12 },
  bold: { fontWeight: "bold" },
  checkoutBtn: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#004643",
    borderRadius: 6,
    alignItems: "center",
  },
  checkoutText: { color: "white", fontSize: 16, fontWeight: "bold" },
  empty: { paddingTop: 50, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#777" },
});
