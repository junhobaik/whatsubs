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

const Period = ({ period, setPeriod }) => {
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
        <View
          style={{
            flexDirection: "row",
            borderRadius: 5,
            backgroundColor: "#333",
            width: 150
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: "#444",
              width: "50%"
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
            style={{
              width: "50%"
            }}
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
