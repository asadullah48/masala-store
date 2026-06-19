import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, Image, ActivityIndicator, SafeAreaView,
} from "react-native";

const CATEGORIES = [
  { id: "all",        label: "All",     icon: "🛒" },
  { id: "spices",     label: "Spices",  icon: "🌶️" },
  { id: "lentils",    label: "Lentils", icon: "🫘" },
  { id: "rice_grains",label: "Rice",    icon: "🍚" },
  { id: "flour",      label: "Flour",   icon: "🌾" },
  { id: "pickles",    label: "Pickles", icon: "🫙" },
  { id: "snacks",     label: "Snacks",  icon: "🍿" },
  { id: "sweets",     label: "Sweets",  icon: "🍬" },
];

const mockProducts = [
  { id: 1, name_en: "Shan Biryani Masala", name_ur: "شان بریانی مصالحہ", brand: "Shan", category: "spices", price: 3.99, compare_price: 5.49, weight: "60g", rating: 4.9, is_featured: true, image_url: "https://via.placeholder.com/200x200/8B0000/ffffff?text=Biryani+Masala" },
  { id: 2, name_en: "Basmati Rice Premium", name_ur: "باسمتی چاول", brand: "Tilda", category: "rice_grains", price: 12.99, weight: "5kg", rating: 4.7, is_featured: true, image_url: "https://via.placeholder.com/200x200/556B2F/ffffff?text=Basmati+Rice" },
  { id: 3, name_en: "Red Lentils Masoor Dal", name_ur: "مسور دال", brand: "TRS", category: "lentils", price: 4.49, compare_price: 5.99, weight: "1kg", rating: 4.6, image_url: "https://via.placeholder.com/200x200/CD853F/ffffff?text=Masoor+Dal" },
  { id: 4, name_en: "Mango Pickle Achaar", name_ur: "آم کا اچار", brand: "National", category: "pickles", price: 6.99, weight: "400g", rating: 4.8, image_url: "https://via.placeholder.com/200x200/DAA520/ffffff?text=Mango+Achaar" },
  { id: 5, name_en: "Chickpea Flour Besan", name_ur: "بیسن", brand: "Heera", category: "flour", price: 3.29, weight: "1kg", rating: 4.5, image_url: "https://via.placeholder.com/200x200/D2691E/ffffff?text=Besan" },
  { id: 6, name_en: "Mixed Mithai Box", name_ur: "مٹھائی", brand: "Shan", category: "sweets", price: 15.99, weight: "500g", rating: 4.7, image_url: "https://via.placeholder.com/200x200/B8860B/ffffff?text=Mithai" },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = category === "all" ? mockProducts : mockProducts.filter(p => p.category === category);
      setProducts(filtered);
      setLoading(false);
    }, 400);
  }, [category]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}
      onPress={() => navigation && navigation.navigate("ProductDetail", { product: item })}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      {item.compare_price && <View style={styles.saleBadge}><Text style={styles.saleText}>SALE</Text></View>}
      <View style={styles.cardBody}>
        <Text style={styles.productName} numberOfLines={2}>{item.name_en}</Text>
        {item.name_ur && <Text style={styles.productNameUr}>{item.name_ur}</Text>}
        <Text style={styles.weight}>{item.weight} · {item.brand}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>CA${item.price.toFixed(2)}</Text>
          {item.compare_price && <Text style={styles.comparePrice}>CA${item.compare_price.toFixed(2)}</Text>}
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Masala Store 🌶️</Text>
            <Text style={styles.subtitle}>Authentic South Asian groceries</Text>
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Search in English or اردو..."
            value={search} onChangeText={setSearch} placeholderTextColor="#9CA3AF" />
        </View>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🎉 Weekly Deals</Text>
          <Text style={styles.bannerSub}>Up to 30% off on selected spices</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.id}
              style={[styles.catChip, category === cat.id && styles.catChipActive]}
              onPress={() => setCategory(cat.id)}>
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={[styles.catLabel, category === cat.id && styles.catLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>
          {category === "all" ? "All Products" : CATEGORIES.find(c => c.id === category)?.label}
        </Text>
        {loading
          ? <ActivityIndicator size="large" color="#C2410C" style={{ marginTop: 40 }} />
          : <FlatList data={products} keyExtractor={i => i.id.toString()} renderItem={renderProduct}
              numColumns={2} columnWrapperStyle={styles.row} scrollEnabled={false}
              ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>} />
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: "#FFF7ED" },
  header:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  greeting:        { fontSize: 22, fontWeight: "700", color: "#7C2D12" },
  subtitle:        { fontSize: 13, color: "#9A3412", marginTop: 2 },
  cartBtn:         { width: 42, height: 42, borderRadius: 21, backgroundColor: "#C2410C", justifyContent: "center", alignItems: "center" },
  cartIcon:        { fontSize: 18 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, elevation: 2, marginBottom: 12 },
  searchIcon:      { fontSize: 16, marginRight: 8 },
  searchInput:     { flex: 1, fontSize: 14, color: "#1E293B" },
  banner:          { marginHorizontal: 20, backgroundColor: "#C2410C", borderRadius: 16, padding: 18, marginBottom: 16 },
  bannerTitle:     { color: "#fff", fontSize: 18, fontWeight: "700" },
  bannerSub:       { color: "#FED7AA", fontSize: 13, marginTop: 4 },
  categories:      { paddingLeft: 20, marginBottom: 16, flexGrow: 0 },
  catChip:         { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 10, borderWidth: 1, borderColor: "#FED7AA" },
  catChipActive:   { backgroundColor: "#C2410C", borderColor: "#C2410C" },
  catIcon:         { fontSize: 14, marginRight: 4 },
  catLabel:        { fontSize: 13, color: "#9A3412", fontWeight: "500" },
  catLabelActive:  { color: "#fff" },
  sectionTitle:    { fontSize: 18, fontWeight: "700", color: "#7C2D12", paddingHorizontal: 20, marginBottom: 12 },
  row:             { justifyContent: "space-between", paddingHorizontal: 20 },
  card:            { backgroundColor: "#fff", borderRadius: 16, marginBottom: 16, width: "48%", elevation: 3, overflow: "hidden" },
  productImage:    { width: "100%", height: 140, backgroundColor: "#FEF3C7" },
  saleBadge:       { position: "absolute", top: 10, left: 10, backgroundColor: "#DC2626", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  saleText:        { color: "#fff", fontSize: 10, fontWeight: "700" },
  cardBody:        { padding: 10 },
  productName:     { fontSize: 13, fontWeight: "600", color: "#1C1917", marginBottom: 2 },
  productNameUr:   { fontSize: 12, color: "#78716C", marginBottom: 4, textAlign: "right" },
  weight:          { fontSize: 11, color: "#A8A29E", marginBottom: 6 },
  priceRow:        { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  price:           { fontSize: 15, fontWeight: "700", color: "#C2410C" },
  comparePrice:    { fontSize: 12, color: "#A8A29E", textDecorationLine: "line-through" },
  addBtn:          { backgroundColor: "#C2410C", borderRadius: 8, paddingVertical: 7, alignItems: "center" },
  addBtnText:      { color: "#fff", fontSize: 12, fontWeight: "600" },
  empty:           { textAlign: "center", color: "#A8A29E", marginTop: 60, fontSize: 15 },
});
