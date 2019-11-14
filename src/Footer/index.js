import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faLayerGroup,
  faCog,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
export default function Foo() {
  return (
    <View style={styles.footer}>
      <View style={styles.item}>
        <Fa style={styles.icon} icon={faSearch} size={22} />
        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.item}>
        <Fa style={styles.icon} icon={faLayerGroup} size={22} />
        <Text style={styles.text}>DashBoard</Text>
      </View>
      <View style={styles.item}>
        <Fa style={styles.icon} icon={faCog} size={22} />
        <Text style={styles.text}>Setting</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 80,
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingBottom: 20,
    backgroundColor: "#222"
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#eee",
    fontSize: 12,
    display: "none"
  },
  icon: {
    color: "#eee"
  }
});
