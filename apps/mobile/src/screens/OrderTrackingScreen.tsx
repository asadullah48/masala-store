import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

const STEPS = [
  { id: 1, label: "Order Placed",     icon: "✅", time: "2:30 PM", desc: "We received your order." },
  { id: 2, label: "Order Confirmed",  icon: "📦", time: "2:35 PM", desc: "Your order has been confirmed and is being packed." },
  { id: 3, label: "Out for Delivery", icon: "🚚", time: "4:15 PM", desc: "Your order is on its way!" },
  { id: 4, label: "Delivered",        icon: "🏠", time: "Expected 5:30 PM", desc: "We'll ring the bell when we arrive." },
];

export default function OrderTrackingScreen({ route, navigation }) {
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentStep(3), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Order Header */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #MS-2026-0042</Text>
          <View style={styles.statusBadge}><Text style={styles.statusText}>OUT FOR DELIVERY</Text></View>
        </View>

        {/* ETA Card */}
        <View style={styles.etaCard}>
          <Text style={styles.etaLabel}>Estimated Delivery</Text>
          <Text style={styles.etaTime}>Today, 5:00 – 5:30 PM</Text>
          <Text style={styles.etaAddress}>📍 123 Main St, Brampton, ON L6X 0Y5</Text>
        </View>

        {/* Tracker Steps */}
        <View style={styles.trackerContainer}>
          <Text style={styles.sectionTitle}>Order Progress</Text>
          {STEPS.map((step, index) => {
            const isDone    = step.id <= currentStep;
            const isActive  = step.id === currentStep;
            const isLast    = index === STEPS.length - 1;
            return (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={[styles.stepDot, isDone && styles.stepDotDone, isActive && styles.stepDotActive]}>
                    <Text style={styles.stepIcon}>{isDone ? step.icon : "○"}</Text>
                  </View>
                  {!isLast && <View style={[styles.stepLine, isDone && styles.stepLineDone]} />}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepLabel, isDone && styles.stepLabelDone]}>{step.label}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                  {isActive && <Text style={styles.stepDesc}>{step.desc}</Text>}
                </View>
              </View>
            );
          })}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items in this order</Text>
          {[
            { name: "Shan Biryani Masala x2", price: 7.98 },
            { name: "Basmati Rice 5kg x1",    price: 12.99 },
            { name: "Mango Pickle 400g x1",   price: 6.99 },
          ].map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>CA${item.price.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.itemRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalVal}>CA${(7.98 + 12.99 + 6.99).toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Agent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Agent</Text>
          <View style={styles.agentRow}>
            <View style={styles.agentAvatar}><Text style={styles.agentAvatarText}>MK</Text></View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>Mohammed Khan</Text>
              <Text style={styles.agentSub}>⭐ 4.9 · 340 deliveries</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Text style={styles.callBtnText}>📞 Call</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: "#FFF7ED" },
  orderHeader:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 },
  orderId:         { fontSize: 18, fontWeight: "700", color: "#7C2D12" },
  statusBadge:     { backgroundColor: "#FEF3C7", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  statusText:      { fontSize: 11, fontWeight: "700", color: "#92400E" },
  etaCard:         { marginHorizontal: 16, backgroundColor: "#C2410C", borderRadius: 16, padding: 20, marginBottom: 16 },
  etaLabel:        { color: "#FED7AA", fontSize: 13 },
  etaTime:         { color: "#fff", fontSize: 22, fontWeight: "700", marginVertical: 4 },
  etaAddress:      { color: "#FED7AA", fontSize: 13 },
  trackerContainer:{ backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, padding: 20, marginBottom: 12 },
  sectionTitle:    { fontSize: 16, fontWeight: "700", color: "#1C1917", marginBottom: 16 },
  stepRow:         { flexDirection: "row", gap: 14 },
  stepLeft:        { alignItems: "center", width: 36 },
  stepDot:         { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F5F5F4", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#E7E5E4" },
  stepDotDone:     { backgroundColor: "#FEF3C7", borderColor: "#F59E0B" },
  stepDotActive:   { backgroundColor: "#C2410C", borderColor: "#C2410C" },
  stepIcon:        { fontSize: 14 },
  stepLine:        { width: 2, flex: 1, backgroundColor: "#E7E5E4", marginVertical: 4 },
  stepLineDone:    { backgroundColor: "#F59E0B" },
  stepContent:     { flex: 1, paddingBottom: 20 },
  stepLabel:       { fontSize: 14, fontWeight: "600", color: "#A8A29E" },
  stepLabelDone:   { color: "#1C1917" },
  stepTime:        { fontSize: 12, color: "#A8A29E", marginTop: 2 },
  stepDesc:        { fontSize: 13, color: "#C2410C", marginTop: 4 },
  section:         { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, padding: 16, marginBottom: 12 },
  itemRow:         { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  itemName:        { fontSize: 14, color: "#57534E" },
  itemPrice:       { fontSize: 14, fontWeight: "600", color: "#1C1917" },
  divider:         { height: 1, backgroundColor: "#FEF3C7", marginVertical: 8 },
  totalLabel:      { fontSize: 15, fontWeight: "700", color: "#1C1917" },
  totalVal:        { fontSize: 16, fontWeight: "800", color: "#C2410C" },
  agentRow:        { flexDirection: "row", alignItems: "center", gap: 12 },
  agentAvatar:     { width: 46, height: 46, borderRadius: 23, backgroundColor: "#C2410C", justifyContent: "center", alignItems: "center" },
  agentAvatarText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  agentInfo:       { flex: 1 },
  agentName:       { fontSize: 15, fontWeight: "600", color: "#1C1917" },
  agentSub:        { fontSize: 12, color: "#A8A29E", marginTop: 2 },
  callBtn:         { backgroundColor: "#FEF3C7", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  callBtnText:     { fontSize: 13, color: "#92400E", fontWeight: "600" },
});
