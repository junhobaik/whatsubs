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
  faPlus,
  faInfo,
  faInfoCircle
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
    type = "all",
    title = "title",
    icon,
    color = "#999",
    num = 0,
    pressEvent = () => {}
  ) => {
    const isIos = Platform.OS === "ios";
    const isActive = listFilter === type;
    const activeStyle = Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: isActive ? 0 : 3
        },
        shadowOpacity: isActive ? 0.35 : 0.1,
        shadowRadius: isActive ? 2.5 : 5,
        elevation: 3
      },
      android: {
        borderWidth: 2,
        borderColor: isActive ? "#4880ee" : "transparent"
      }
    });

    return (
      <TouchableHighlight
        onPress={pressEvent}
        style={[styles.summaryItem, activeStyle, isIos ? {} : { elevation: 7 }]}
        underlayColor="#dfdfdf"
      >
        <View>
          <View
            style={{
              flexDirection: "row",
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
                  height: gs.isSmall ? 20 : 27,
                  width: gs.isSmall ? 20 : 27,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Fa
                  icon={icon}
                  style={{ color: "#fff", margin: 0 }}
                  size={gs.isSmall ? 10 : 14}
                />
              </View>
            </View>
            <Text style={[styles.summaryNum, gs.normalFont, gs.fontSize2]}>
              {num}
            </Text>
          </View>
          <Text style={[styles.summaryTitle, gs.fontSize5]}>{title}</Text>
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
            paddingVertical: gs.isSmall ? 5 : 10,
            paddingHorizontal: 3,
            alignItems: "center",
            justifyContent: "center"
          }}
          underlayColor="transparent"
          onPress={() => {
            setSortMethod(sort);
          }}
        >
          <Text style={gs.fontSize5}>{titleText}</Text>
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
            justifyContent: "center",
            paddingLeft: 27.5
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
              onPress={() => {
                navigate("Information");
              }}
            >
              <Text
                style={[{ fontSize: 18, fontWeight: "bold" }, gs.normalFont]}
              >
                WhatSubs
              </Text>
              <Fa
                icon={faInfoCircle}
                style={{
                  opacity: 0.3,
                  marginTop: 1,
                  marginLeft: 2,
                  color: "#3c82f6"
                }}
                size={12}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigate("AddList");
            }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 12
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
              "all",
              "모든 항목",
              faLayerGroup,
              "rgb(88, 99, 106)",
              list.length,
              () => setListFilter("all")
            )}
            {createSummaryItem(
              "month",
              "이번 달 항목",
              faWonSign,
              "rgb(252, 160, 9)",
              sumPrice(list),
              () => setListFilter("month")
            )}
          </View>

          <View style={styles.summary}>
            {createSummaryItem(
              "yearly",
              "연 구독 항목",
              faCalendarAlt,
              "rgb(252, 71, 59)",
              list.filter(item => item.period === "y").length,
              () => setListFilter("yearly")
            )}
            {createSummaryItem(
              "monthly",
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
            marginTop: gs.isSmall ? 14 : 20,
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
    paddingHorizontal: 20
  },
  summaryItem: {
    paddingVertical: gs.isSmall ? 5 : 7,
    paddingHorizontal: gs.isSmall ? 10 : 14,
    marginHorizontal: 5,
    marginVertical: 2.5,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  summaryTitle: {
    fontWeight: "bold",
    color: "#333"
  },
  summaryNum: {
    fontWeight: "bold"
  }
});

Dashboard.navigationOptions = {
  title: "WhatSubs"
};

export default Dashboard;
