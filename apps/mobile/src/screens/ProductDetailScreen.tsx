import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";

export default function ProductDetailScreen({ route, navigation }) {
  const product = route?.params?.product || {
    id: 1, name_en: "Shan Biryani Masala", name_ur: "شان بریانی مصالحہ",
    brand: "Shan", category: "spices", price: 3.99, compare_price: 5.49,
    weight: "60g", rating: 4.9, total_reviews: 342, origin_country: "Pakistan",
    description: "The authentic blend of aromatic spices for the perfect biryani. Used by generations of Pakistani families, Shan Biryani Masala brings restaurant-quality flavour to your home kitchen.",
    tags: "Halal,Gluten-Free,No Preservatives",
    image_url: "https://via.placeholder.com/400x400/8B0000/ffffff?text=Biryani+Masala",
  };

  const [qty, setQty] = useState(1);
  const tags = (product.tags || "").split(",").filter(Boolean);
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image_url }} style={styles.image} />
          {discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          {/* Title */}
          <Text style={styles.nameEn}>{product.name_en}</Text>
          {product.name_ur && <Text style={styles.nameUr}>{product.name_ur}</Text>}
          <Text style={styles.brand}>{product.brand} · {product.weight} · From {product.origin_country}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>⭐ {product.rating}</Text>
            <Text style={styles.reviews}>({product.total_reviews} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>CA${product.price.toFixed(2)}</Text>
            {product.compare_price && (
              <Text style={styles.comparePrice}>CA${product.compare_price.toFixed(2)}</Text>
            )}
          </View>

          {/* Tags */}
          {tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.map((t, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>✓ {t.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Description */}
          <Text style={styles.sectionTitle}>About this product</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* How to use */}
          <Text style={styles.sectionTitle}>How to use</Text>
          <View style={styles.stepBox}>
            <Text style={styles.step}>1. Heat oil in a pan and fry onions until golden.</Text>
            <Text style={styles.step}>2. Add the Shan Biryani Masala and stir for 2 minutes.</Text>
            <Text style={styles.step}>3. Add your choice of meat or vegetables.</Text>
            <Text style={styles.step}>4. Layer with soaked basmati rice and cook on dum.</Text>
          </View>

          {/* Quantity */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyVal}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.qtyTotal}>CA${(product.price * qty).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.wishlistBtn}>
          <Text style={styles.wishlistText}>🤍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}
          onPress={() => navigation && navigation.navigate("Cart")}>
          <Text style={styles.addBtnText}>Add to Cart · CA${(product.price * qty).toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: "#FFF7ED" },
  imageContainer: { backgroundColor: "#FEF3C7", position: "relative" },
  image:          { width: "100%", height: 280 },
  discountBadge:  { position: "absolute", top: 16, right: 16, backgroundColor: "#DC2626", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  discountText:   { color: "#fff", fontWeight: "700", fontSize: 14 },
  body:           { padding: 20 },
  nameEn:         { fontSize: 22, fontWeight: "700", color: "#1C1917", marginBottom: 4 },
  nameUr:         { fontSize: 18, color: "#78716C", textAlign: "right", marginBottom: 8 },
  brand:          { fontSize: 13, color: "#A8A29E", marginBottom: 10 },
  ratingRow:      { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  stars:          { fontSize: 15, fontWeight: "600", color: "#1C1917" },
  reviews:        { fontSize: 13, color: "#A8A29E" },
  priceRow:       { flexDirection: "row", alignItems: "baseline", gap: 10, marginBottom: 14 },
  price:          { fontSize: 28, fontWeight: "800", color: "#C2410C" },
  comparePrice:   { fontSize: 18, color: "#A8A29E", textDecorationLine: "line-through" },
  tagsRow:        { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  tag:            { backgroundColor: "#FEF3C7", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  tagText:        { fontSize: 12, color: "#92400E", fontWeight: "500" },
  sectionTitle:   { fontSize: 16, fontWeight: "700", color: "#1C1917", marginBottom: 10, marginTop: 4 },
  description:    { fontSize: 14, color: "#57534E", lineHeight: 22, marginBottom: 16 },
  stepBox:        { backgroundColor: "#fff", borderRadius: 12, padding: 14, gap: 8, marginBottom: 16 },
  step:           { fontSize: 13, color: "#57534E", lineHeight: 20 },
  qtyRow:         { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 },
  qtyBtn:         { width: 40, height: 40, borderRadius: 12, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 2 },
  qtyBtnText:     { fontSize: 20, color: "#C2410C", fontWeight: "700" },
  qtyVal:         { fontSize: 20, fontWeight: "700", color: "#1C1917", minWidth: 30, textAlign: "center" },
  qtyTotal:       { fontSize: 18, fontWeight: "700", color: "#C2410C", marginLeft: "auto" },
  footer:         { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 16, flexDirection: "row", gap: 12, elevation: 12 },
  wishlistBtn:    { width: 52, height: 52, borderRadius: 14, borderWidth: 1, borderColor: "#E7E5E4", justifyContent: "center", alignItems: "center" },
  wishlistText:   { fontSize: 22 },
  addBtn:         { flex: 1, backgroundColor: "#C2410C", borderRadius: 14, justifyContent: "center", alignItems: "center", paddingVertical: 14 },
  addBtnText:     { color: "#fff", fontSize: 16, fontWeight: "700" },
});
