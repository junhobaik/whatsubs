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
  faCalendarDay,
  faPlusCircle,
  faWonSign
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Cashify } from "cashify";

import List from "./List";

const Dashboard = ({ navigation }) => {
  const { navigate } = navigation;
  const [list, setList] = useState([]);
  const [listFilter, setListFilter] = useState("all"); // all, price, yearly, monthly
  const rates = {
    USD: 1,
    KRW: 1200,
    JPY: 110
  };
  const cashify = new Cashify({ base: "USD", rates });

  useEffect(() => {
    // AsyncStorage.clear(); // temp
  }, []);

  const getFilterStr = filter => {
    switch (filter) {
      case "all":
        return "All";
      case "price":
        return "All (Sort by price)";
      case "yearly":
        return "Yearly";
      case "monthly":
        return "Monthly";
      default:
        return "list";
    }
  };

  const currencyFormat = currency => {
    switch (currency) {
      case "dollar":
        return "USD";
      case "won":
        return "KRW";
      case "yen":
        return "JPY";
      default:
        return "USD";
    }
  };

  const remakeList = (list, filter) => {
    const cur = item => {
      return parseInt(
        cashify.convert(item.price, {
          from: currencyFormat(item.currency),
          to: "KRW"
        }),
        10
      );
    };

    switch (filter) {
      case "all": {
        return [...list].sort((a, b) => {
          const x = a.title.toLocaleLowerCase();
          const y = b.title.toLocaleLowerCase();
          if (x > y) {
            return 1;
          }
          if (y > x) {
            return -1;
          }
          return 0;
        });
      }
      case "price": {
        return [...list].sort((a, b) => cur(b) - cur(a));
      }
      case "yearly": {
        return list.filter(item => item.period === "y");
      }
      case "monthly": {
        return list.filter(item => item.period === "m");
      }
      default:
        break;
    }
  };
  const remakedList = remakeList(list, listFilter);

  const sumPrice = _list => {
    let sum = 0;
    for (item of _list) {
      sum += cashify.convert(item.price, {
        from: currencyFormat(item.currency),
        to: "KRW"
      });
    }
    return sum;
  };

  const willFocusEvents = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      if (result) setList(JSON.parse(result));
    });
  };

  const createSummaryItem = (
    title = "title",
    icon,
    color = "#999",
    num = 0,
    pressEvent = () => {}
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
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 30
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 18, fontWeight: "bold", flex: 1 }}
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
            {createSummaryItem(
              "All",
              faLayerGroup,
              "rgb(88, 99, 106)",
              list.length,
              () => setListFilter("all")
            )}
            {createSummaryItem(
              "This month",
              faWonSign,
              "rgb(252, 160, 9)",
              sumPrice(list),
              () => setListFilter("price")
            )}
          </View>

          <View style={styles.summary}>
            {createSummaryItem(
              "Yearly",
              faCalendarAlt,
              "rgb(252, 71, 59)",
              list.filter(item => item.period === "y").length,
              () => setListFilter("yearly")
            )}
            {createSummaryItem(
              "Monthly",
              faCalendarDay,
              "rgb(4, 132, 255)",
              list.filter(item => item.period === "m").length,
              () => setListFilter("monthly")
            )}
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            marginHorizontal: 30,
            marginTop: 20,
            alignSelf: "flex-end"
          }}
        >
          {getFilterStr(listFilter)}
        </Text>
        <ScrollView style={{ marginTop: 5, paddingHorizontal: 25 }}>
          <List list={remakedList} />
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
    marginHorizontal: 5,
    marginVertical: 2.5,
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
