import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faLayerGroup,
  faCalendarAlt,
  faDollarSign,
  faStar,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const createSummaryItem = (
    title = "title",
    icon,
    color = "#999",
    pressEvent = () => {},
    num = 0
  ) => {
    return (
      <TouchableHighlight
        onPress={pressEvent}
        style={styles.summaryItem}
        underlayColor="rgba(255,255,255,0.2)"
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              minHeight: 30,
              alignItems: "center",
              marginBottom: 7
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  backgroundColor: color,
                  borderRadius: "100%",
                  height: 27,
                  width: 27,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Fa icon={icon} style={{ color: "#fff", margin: 0 }} />
              </View>
            </View>
            <Text style={styles.summaryNum}>{num}</Text>
          </View>
          <Text style={styles.summaryTitle}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Text
          style={{ color: "#eee", fontSize: 18, fontWeight: "bold", flex: 1 }}
        >
          WhatSubs
        </Text>
        <TouchableHighlight
          onPress={() => {
            //
          }}
        >
          <View>
            <Fa icon={faPlusCircle} size={25} style={{ color: "#eee" }} />
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <View style={styles.summary}>
          {createSummaryItem("All", faLayerGroup, "rgb(88, 99, 106)")}
          {createSummaryItem("Monthly", faCalendarAlt, "rgb(4, 132, 255)")}
        </View>

        <View style={styles.summary}>
          {createSummaryItem("Marked", faStar, "rgb(252, 71, 59)")}
          {createSummaryItem("Monthly", faDollarSign, "rgb(252, 160, 9)")}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  summary: {
    flexDirection: "row"
  },
  summaryItem: {
    padding: 14,
    paddingTop: 7,
    paddingBottom: 7,
    margin: 10,
    flex: 1,
    borderWidth: 1.2,
    borderRadius: 10,
    backgroundColor: "rgb(26, 27, 29)"
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgb(144, 145, 152)"
  },
  summaryNum: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff"
  }
});

export default Dashboard;
