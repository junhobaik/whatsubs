import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const Period = ({ period, periodNum, setPeriod, setPeriodNum }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Fa icon={faRedoAlt} style={{ color: "#ddd" }} size={20} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <TextInput
          placeholder=""
          style={{
            color: "#fff",
            backgroundColor: "#333",
            width: 40,
            height: 40,
            fontSize: 20,
            textAlign: "center",
            borderRadius: 5,
            marginRight: 5
          }}
          keyboardType="number-pad"
          value={periodNum}
          onChangeText={num => setPeriodNum(num)}
          placeholderTextColor={"#666"}
        />
        <View
          style={{
            flexDirection: "row",
            borderRadius: 5,
            backgroundColor: "#333"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setPeriod("d");
            }}
          >
            <View style={styles.periodItemView}>
              <Text
                style={[
                  styles.periodItemText,
                  {
                    opacity: period === "d" ? 1 : 0.2,
                    fontWeight: period === "d" ? "bold" : "normal"
                  }
                ]}
              >
                Day
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: "#444"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPeriod("m");
              }}
            >
              <View style={styles.periodItemView}>
                <Text
                  style={[
                    styles.periodItemText,
                    {
                      opacity: period === "m" ? 1 : 0.2,
                      fontWeight: period === "m" ? "bold" : "normal"
                    }
                  ]}
                >
                  Month
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setPeriod("y");
            }}
          >
            <View style={styles.periodItemView}>
              <Text
                style={[
                  styles.periodItemText,
                  {
                    opacity: period === "y" ? 1 : 0.2,
                    fontWeight: period === "y" ? "bold" : "normal"
                  }
                ]}
              >
                Year
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  periodItemView: {
    height: 40,
    width: 70,
    paddingHorizontal: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  periodItemText: {
    color: "#fff",
    fontSize: 16,
    margin: 0,
    borderRadius: 3
  }
});

export default Period;
