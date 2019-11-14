import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Footer from "./src/Footer";
import Dashboard from "./src/Dashboard";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Dashboard />
      </View>
      {/* <Footer /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    display: "flex",
    flex: 1
  },
  content: {
    padding: 20,
    flex: 1
  }
});
