import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import list from "./licenseList";
import gs from "../globalStyle";

const License = ({ navigation }) => {
  const { goBack } = navigation;

  const licenseList = list.map(l => {
    return (
      <View
        key={l.title}
        style={{
          marginBottom: 10,
          borderColor: "#999",
          borderBottomWidth: 1,
          paddingHorizontal: 15
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{l.title}</Text>
        <Text style={{ fontSize: 10 }}>{l.content}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={gs.container}>
      <TouchableOpacity
        style={gs.goBack}
        onPress={() => {
          goBack();
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={gs.goBackColor} />
        </View>
      </TouchableOpacity>
      <ScrollView>{licenseList}</ScrollView>
    </SafeAreaView>
  );
};

export default License;
