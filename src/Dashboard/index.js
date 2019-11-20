import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faLayerGroup,
  faCalendarAlt,
  faDollarSign,
  faStar,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import List from "./List";

const Dashboard = ({ navigation }) => {
  const { navigate } = navigation;
  const [list, setList] = useState([]);

  useEffect(() => {
    // AsyncStorage.clear(); // temp
  }, []);

  const willFocusEvents = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      if (result) setList(JSON.parse(result));
    });
  };

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
    <>
      <NavigationEvents
        onWillFocus={payload => {
          willFocusEvents();
        }}
        // onDidFocus={payload => console.log("did focus")}
        // onWillBlur={payload => console.log("will blur")}
        // onDidBlur={payload => console.log("did blur")}
      />

      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
            marginHorizontal: 25
          }}
        >
          <Text
            style={{ color: "#eee", fontSize: 18, fontWeight: "bold", flex: 1 }}
          >
            WhatSubs
          </Text>
          <TouchableHighlight
            onPress={() => {
              navigate("AddList");
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

        <ScrollView style={{ marginTop: 10, paddingHorizontal: 25 }}>
          <List list={list} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#000",
    height: "100%"
  },
  summary: {
    flexDirection: "row",
    marginHorizontal: 20
  },
  summaryItem: {
    padding: 14,
    paddingTop: 7,
    paddingBottom: 7,
    margin: 5,
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

Dashboard.navigationOptions = {
  title: "WhatSubs"
};

export default Dashboard;
