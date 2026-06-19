import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from "react-native";

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [urduMode, setUrduMode] = useState(false);
  const [deals, setDeals] = useState(true);

  const menuItems = [
    { icon: "📦", label: "My Orders",         action: () => navigation && navigation.navigate("Orders") },
    { icon: "🤍", label: "Wishlist",           action: () => {} },
    { icon: "📍", label: "Delivery Addresses", action: () => {} },
    { icon: "💳", label: "Payment Methods",    action: () => {} },
    { icon: "🎁", label: "Loyalty Points",     badge: "240 pts", action: () => {} },
    { icon: "🔄", label: "Recurring Orders",   action: () => {} },
    { icon: "⭐", label: "My Reviews",         action: () => {} },
    { icon: "❓", label: "Help & Support",     action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>AS</Text></View>
          <Text style={styles.name}>Asadullah Shafique</Text>
          <Text style={styles.email}>asadullah@email.com · Brampton, ON</Text>
          <View style={styles.loyaltyBar}>
            <Text style={styles.loyaltyText}>🌟 240 Loyalty Points</Text>
            <Text style={styles.loyaltySub}>= CA$2.40 reward credit</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>18</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>CA$284</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={item.action} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>}
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🔔 Push Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: "#C2410C" }} thumbColor="#fff" />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🏷️ Deal Alerts</Text>
            <Switch value={deals} onValueChange={setDeals} trackColor={{ true: "#C2410C" }} thumbColor="#fff" />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🇵🇰 اردو زبان</Text>
            <Switch value={urduMode} onValueChange={setUrduMode} trackColor={{ true: "#C2410C" }} thumbColor="#fff" />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪 Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Masala Store v1.0.0 · 🇨🇦 Made for Pakistani Canadians</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#FFF7ED" },
  headerCard:   { backgroundColor: "#fff", padding: 24, alignItems: "center", marginBottom: 12 },
  avatar:       { width: 80, height: 80, borderRadius: 40, backgroundColor: "#C2410C", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText:   { color: "#fff", fontSize: 28, fontWeight: "700" },
  name:         { fontSize: 20, fontWeight: "700", color: "#1C1917" },
  email:        { fontSize: 13, color: "#A8A29E", marginTop: 4, marginBottom: 14 },
  loyaltyBar:   { backgroundColor: "#FEF3C7", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, alignItems: "center", marginBottom: 16, width: "100%" },
  loyaltyText:  { fontSize: 15, fontWeight: "700", color: "#92400E" },
  loyaltySub:   { fontSize: 12, color: "#A8A29E", marginTop: 2 },
  statsRow:     { flexDirection: "row", alignItems: "center", gap: 20 },
  stat:         { alignItems: "center" },
  statNum:      { fontSize: 17, fontWeight: "700", color: "#1C1917" },
  statLabel:    { fontSize: 12, color: "#A8A29E", marginTop: 2 },
  statDivider:  { width: 1, height: 32, backgroundColor: "#FEF3C7" },
  section:      { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, marginBottom: 12, overflow: "hidden" },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: "#A8A29E", padding: 16, paddingBottom: 8 },
  menuItem:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#FFF7ED" },
  menuIcon:     { fontSize: 18, marginRight: 14, width: 24 },
  menuLabel:    { flex: 1, fontSize: 15, color: "#1C1917" },
  badge:        { backgroundColor: "#FEF3C7", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginRight: 8 },
  badgeText:    { fontSize: 11, color: "#92400E", fontWeight: "600" },
  menuArrow:    { fontSize: 20, color: "#D6D3D1" },
  toggleRow:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#FFF7ED" },
  toggleLabel:  { fontSize: 15, color: "#1C1917" },
  logoutBtn:    { marginHorizontal: 16, marginBottom: 12, backgroundColor: "#FEF2F2", borderRadius: 16, padding: 16, alignItems: "center" },
  logoutText:   { fontSize: 15, color: "#EF4444", fontWeight: "600" },
  version:      { textAlign: "center", color: "#D6D3D1", fontSize: 12, marginBottom: 30 },
});
