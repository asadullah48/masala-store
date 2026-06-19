import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import HomeScreen          from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen          from "../screens/CartScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import ProfileScreen       from "../screens/ProfileScreen";

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"          component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#C2410C",
          tabBarInactiveTintColor: "#A8A29E",
          tabBarStyle: { borderTopWidth: 0.5, borderTopColor: "#FEF3C7", paddingBottom: 6, height: 60, backgroundColor: "#fff" },
          tabBarLabel: ({ color }) => {
            const labels = { HomeTab: "Shop", Cart: "Cart", Orders: "Orders", Profile: "Profile" };
            return <Text style={{ color, fontSize: 11, marginBottom: 2 }}>{labels[route.name]}</Text>;
          },
          tabBarIcon: ({ color }) => {
            const icons = { HomeTab: "🛒", Cart: "🛍️", Orders: "📦", Profile: "👤" };
            return <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>;
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="Cart"    component={CartScreen} />
        <Tab.Screen name="Orders"  component={OrderTrackingScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
