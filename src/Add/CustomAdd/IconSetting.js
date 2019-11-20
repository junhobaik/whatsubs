import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

const IconSetting = ({ hexValue, setHexValue, iconChar, setIconChar }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View
            style={{
              backgroundColor: "#d8d8d8",
              height: 20,
              width: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>{`i`}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginTop: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setHexValue("#dd5471");
              }}
              style={{
                backgroundColor: "#dd5471",
                flexGrow: 1,
                width: 40,
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#eea341");
              }}
              style={{ backgroundColor: "#eea341", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#42803c");
              }}
              style={{ backgroundColor: "#42803c", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#4388ae");
              }}
              style={{ backgroundColor: "#4388ae", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#193a4a");
              }}
              style={{
                backgroundColor: "#193a4a",
                flexGrow: 1,
                width: 40,
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3
              }}
            ></TouchableOpacity>
          </View>
        </View>

        <View>
          <TextInput
            style={{
              borderRadius: 10,
              width: 70,
              height: 70,
              backgroundColor: hexValue,
              textAlign: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: "#ddd"
            }}
            onChangeText={text => {
              if (text.length < 2) setIconChar(text);
            }}
            value={iconChar}
          />
        </View>
      </View>
    </View>
  );
};

export default IconSetting;
