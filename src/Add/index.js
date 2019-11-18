import React from "react";
import { View, TouchableHighlight, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import list from "../List/list";

const Add = ({ navigation }) => {
  const { navigate, state } = navigation;
  const { title, local } = list.filter(v => v.title === state.params.title)[0];

  const locale = "kr"; // temp

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={{
          marginBottom: 20,
          marginLeft: 25,
          alignSelf: "flex-start",
          paddingTop: 20,
          paddingRight: 20
        }}
        onPress={() => {
          navigate("List");
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>
      <View>
        <Text style={{ color: "#fff" }}>
          {local ? local.title[locale] || title : title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#000",
    height: "100%"
  }
});

export default Add;
