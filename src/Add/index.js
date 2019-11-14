import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-navigation";
const Add = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          navigate("Home");
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 25,
    backgroundColor: "#000",
    height: "100%"
  }
});

export default Add;
