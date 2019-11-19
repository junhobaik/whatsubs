import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const DateTime = ({ dateValue, setDateValue }) => {
  const [max, setMax] = useState(10);

  const changeValue = text => {
    if (dateValue.length < text.length) {
      if (text.length === 4) text += ".";
      if (text.length === 6 && parseInt(text[5], 10) > 1) {
        setMax(9);
        text += ".";
      }
      if (text.length === 7 && text[6] !== ".") {
        setMax(10);
        text += ".";
      }
      if (text.length - 1 < max) setDateValue(text);
    } else {
      setDateValue(text);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Fa icon={faCalendarAlt} style={{ color: "#ddd" }} size={20} />
      <View>
        <TextInput
          style={{
            backgroundColor: "#333",
            width: 150,
            height: 40,
            color: "#fff",
            padding: 5,
            paddingHorizontal: 10,
            fontSize: 18,
            borderRadius: 5,
            fontWeight: "bold",
            textAlign: "right"
          }}
          onChangeText={text => changeValue(text)}
          value={dateValue}
          placeholder={"2019.01.31"}
          placeholderTextColor={"#666"}
          keyboardType="number-pad"
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};

export default DateTime;
