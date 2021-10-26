import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <Navigation />
    </SafeAreaProvider>
  );
}
