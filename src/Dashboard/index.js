import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faLayerGroup,
  faCalendarAlt,
  faCalendarDay,
  faWonSign,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Cashify } from "cashify";
import moment from "moment";

import List from "./List";
import gs from "../globalStyle";

const Dashboard = ({ navigation }) => {
  const { navigate } = navigation;
  const [list, setList] = useState([]);
  const [listFilter, setListFilter] = useState("all"); // all, month, yearly, monthly
  const [sortMethod, setSortMethod] = useState("title"); // title, price, pay
  const rates = {
    USD: 1,
    KRW: 1200,
    JPY: 110
  };
  const cashify = new Cashify({ base: "USD", rates });

  useEffect(() => {
    // AsyncStorage.clear(); // temp
  }, []);

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

  const sumPrice = _list => {
    let sum = 0;
    const now = moment()
      .format("YYYY.MM.DD")
      .split(".");

    const filteredList = _list.filter(v => {
      const subMonth = parseInt(v.date.split(".")[1], 10);
      const nowMonth = parseInt(now[1], 10);

      if (v.period === "m") return true;
      if (v.period === "y" && subMonth === nowMonth) return true;
    });

    for (item of filteredList) {
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
        style={[styles.summaryItem, gs.normalShadow]}
        underlayColor="#dfdfdf"
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
                  borderRadius: 100,
                  height: 27,
                  width: 27,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Fa icon={icon} style={{ color: "#fff", margin: 0 }} />
              </View>
            </View>
            <Text style={[styles.summaryNum, gs.normalFont]}>{num}</Text>
          </View>
          <Text style={styles.summaryTitle}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const createSortItem = (sort = "title") => {
    let titleText = sort;

    switch (sort) {
      case "title":
        titleText = "이름 순";
        break;
      case "price":
        titleText = "가격 순";
        break;
      case "pay":
        titleText = "다음 결제일 순";
        break;

      default:
        break;
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
          underlayColor="transparent"
          onPress={() => {
            setSortMethod(sort);
          }}
        >
          <Text style={{ fontSize: 14 }}>{titleText}</Text>
        </TouchableHighlight>
        <View
          style={{
            height: 3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              height: sortMethod === sort ? 2 : 1.5,
              backgroundColor: sortMethod === sort ? "#4880ee" : "#ebebeb"
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <NavigationEvents
        onWillFocus={payload => {
          willFocusEvents();
        }}
      />

      <SafeAreaView style={gs.container}>
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
            style={[
              { fontSize: 18, fontWeight: "bold", flex: 1 },
              gs.normalFont
            ]}
          >
            WhatSubs
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("AddList");
            }}
          >
            <View>
              <Fa icon={faPlus} size={20} style={gs.normalFont} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.summary}>
            {createSummaryItem(
              "모든 항목",
              faLayerGroup,
              "rgb(88, 99, 106)",
              list.length,
              () => setListFilter("all")
            )}
            {createSummaryItem(
              "이번 달 항목",
              faWonSign,
              "rgb(252, 160, 9)",
              sumPrice(list),
              () => setListFilter("month")
            )}
          </View>

          <View style={styles.summary}>
            {createSummaryItem(
              "연 구독 항목",
              faCalendarAlt,
              "rgb(252, 71, 59)",
              list.filter(item => item.period === "y").length,
              () => setListFilter("yearly")
            )}
            {createSummaryItem(
              "월 구독 항목",
              faCalendarDay,
              "rgb(4, 132, 255)",
              list.filter(item => item.period === "m").length,
              () => setListFilter("monthly")
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 25,
            marginBottom: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {createSortItem("pay")}
          {createSortItem("price")}
          {createSortItem("title")}
        </View>
        <ScrollView>
          <List
            navigate={navigate}
            list={list}
            filter={listFilter}
            sort={sortMethod}
            cashify={cashify}
            currencyFormat={currencyFormat}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  summaryNum: {
    fontSize: 22,
    fontWeight: "bold"
  }
});

Dashboard.navigationOptions = {
  title: "WhatSubs"
};

export default Dashboard;
