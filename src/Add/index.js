import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const Add = () => {
  return (
    <View>
      <TouchableHighlight onPress={() => {}}>
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>
      <Text style={{ fontSize: 50, color: "#fff" }}>Add</Text>
    </View>
  );
};

export default Add;
