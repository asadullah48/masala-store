import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";

const INITIAL_CART = [
  { id: 1, name_en: "Shan Biryani Masala", name_ur: "شان بریانی مصالحہ", price: 3.99, weight: "60g", qty: 2, image_url: "https://via.placeholder.com/80x80/8B0000/ffffff?text=BM" },
  { id: 2, name_en: "Basmati Rice Premium", name_ur: "باسمتی چاول", price: 12.99, weight: "5kg", qty: 1, image_url: "https://via.placeholder.com/80x80/556B2F/ffffff?text=BR" },
  { id: 3, name_en: "Mango Pickle Achaar", name_ur: "آم کا اچار", price: 6.99, weight: "400g", qty: 1, image_url: "https://via.placeholder.com/80x80/DAA520/ffffff?text=MA" },
];

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState(INITIAL_CART);

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  };

  const subtotal  = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery  = subtotal > 50 ? 0 : 5.99;
  const total     = subtotal + delivery;

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name_en}</Text>
        <Text style={styles.itemUr}>{item.name_ur}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        <Text style={styles.itemPrice}>CA${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.qtyControl}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyVal}>{item.qty}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some delicious South Asian groceries!</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation && navigation.goBack()}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart ({cart.length} items)</Text>

      {/* Free delivery banner */}
      {subtotal < 50 && (
        <View style={styles.deliveryBanner}>
          <Text style={styles.deliveryText}>
            🚚 Add CA${(50 - subtotal).toFixed(2)} more for FREE delivery!
          </Text>
        </View>
      )}

      <FlatList
        data={cart}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryVal}>CA${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={[styles.summaryVal, delivery === 0 && { color: "#16A34A" }]}>
            {delivery === 0 ? "FREE" : `CA$${delivery.toFixed(2)}`}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>CA${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}
          onPress={() => navigation && navigation.navigate("Checkout", { cart, total })}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: "#FFF7ED" },
  header:         { fontSize: 22, fontWeight: "700", color: "#7C2D12", padding: 20, paddingBottom: 8 },
  deliveryBanner: { marginHorizontal: 16, backgroundColor: "#FEF3C7", borderRadius: 10, padding: 12, marginBottom: 8 },
  deliveryText:   { fontSize: 13, color: "#92400E", fontWeight: "500" },
  list:           { paddingHorizontal: 16, paddingBottom: 8 },
  cartItem:       { backgroundColor: "#fff", borderRadius: 14, marginBottom: 10, padding: 12, flexDirection: "row", alignItems: "center", elevation: 2 },
  itemImage:      { width: 64, height: 64, borderRadius: 10, backgroundColor: "#FEF3C7", marginRight: 12 },
  itemInfo:       { flex: 1 },
  itemName:       { fontSize: 14, fontWeight: "600", color: "#1C1917" },
  itemUr:         { fontSize: 12, color: "#A8A29E", textAlign: "right", marginBottom: 2 },
  itemWeight:     { fontSize: 11, color: "#A8A29E" },
  itemPrice:      { fontSize: 15, fontWeight: "700", color: "#C2410C", marginTop: 4 },
  qtyControl:     { alignItems: "center", gap: 6 },
  qtyBtn:         { width: 30, height: 30, borderRadius: 8, backgroundColor: "#FFF7ED", borderWidth: 1, borderColor: "#FED7AA", justifyContent: "center", alignItems: "center" },
  qtyBtnText:     { fontSize: 16, color: "#C2410C", fontWeight: "700" },
  qtyVal:         { fontSize: 15, fontWeight: "700", color: "#1C1917" },
  summary:        { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 12 },
  summaryRow:     { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel:   { fontSize: 14, color: "#78716C" },
  summaryVal:     { fontSize: 14, fontWeight: "600", color: "#1C1917" },
  totalRow:       { borderTopWidth: 1, borderTopColor: "#FEF3C7", paddingTop: 12, marginTop: 4, marginBottom: 16 },
  totalLabel:     { fontSize: 16, fontWeight: "700", color: "#1C1917" },
  totalVal:       { fontSize: 22, fontWeight: "800", color: "#C2410C" },
  checkoutBtn:    { backgroundColor: "#C2410C", borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  checkoutText:   { color: "#fff", fontSize: 16, fontWeight: "700" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", gap: 10 },
  emptyIcon:      { fontSize: 64 },
  emptyTitle:     { fontSize: 20, fontWeight: "700", color: "#7C2D12" },
  emptySub:       { fontSize: 14, color: "#A8A29E", textAlign: "center" },
  shopBtn:        { marginTop: 10, backgroundColor: "#C2410C", borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14 },
  shopBtnText:    { color: "#fff", fontSize: 15, fontWeight: "700" },
});
