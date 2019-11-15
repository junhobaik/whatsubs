import React, { useState } from "react";
import { View, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-navigation";

const List = ({ navigation }) => {
  const { navigate } = navigation;
  const [value, onChangeText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={{ marginBottom: 20 }}
        onPress={() => {
          navigate("Home");
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>
      <View
        style={{
          backgroundColor: "rgb(26, 27, 29)",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10
        }}
      >
        <Fa icon={faSearch} style={{ color: "rgb(140, 143, 151)" }} />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            color: "#fff",
            paddingLeft: 10,
            paddingRight: 10
          }}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="Search"
        />
      </View>

      <View>
        
      </View>
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

export default List;
