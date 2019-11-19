import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faMoneyCheckAlt,
  faWonSign,
  faDollarSign,
  faYenSign
} from "@fortawesome/free-solid-svg-icons";

const Pay = ({
  payValue,
  setPayValue,
  currencyValue,
  setCurrencyValue,
  price
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Fa icon={faMoneyCheckAlt} style={{ color: "#ddd" }} size={20} />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            backgroundColor: "#333",
            width: 115,
            height: 40,
            color: "#fff",
            padding: 5,
            paddingHorizontal: 10,
            fontSize: 18,
            borderRadius: 5,
            fontWeight: "bold",
            textAlign: "right",
            marginRight: 5
          }}
          onChangeText={text => setPayValue(text)}
          value={payValue}
          placeholder={price.toString() || ""}
          placeholderTextColor={"#666"}
          keyboardType="decimal-pad"
          clearTextOnFocus={true}
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
              setCurrencyValue("won");
            }}
          >
            <View style={styles.periodItemView}>
              <Fa
                style={{ color: currencyValue === "won" ? "#fff" : "#666" }}
                icon={faWonSign}
              />
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
                setCurrencyValue("dollar");
              }}
            >
              <View style={styles.periodItemView}>
                <Fa
                  style={{
                    color: currencyValue === "dollar" ? "#fff" : "#666"
                  }}
                  icon={faDollarSign}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCurrencyValue("yen");
            }}
          >
            <View style={styles.periodItemView}>
              <Fa
                style={{ color: currencyValue === "yen" ? "#fff" : "#666" }}
                icon={faYenSign}
              />
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
    width: 45,
    paddingHorizontal: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  periodItemText: {
    color: "#fff",
    fontSize: 16,
    margin: 0,
    borderRadius: 3
  },
  icon: {
    color: "#666"
  }
});

export default Pay;
