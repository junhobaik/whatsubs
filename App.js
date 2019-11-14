import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Footer from "./src/Footer";
import Dashboard from "./src/Dashboard";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Dashboard />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingTop: 40, // 노치
    display: "flex",
    flex: 1
  },
  content: {
    padding: 20,
    flex: 1
  }
});
