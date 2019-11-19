import React, { useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  Linking,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import list from "../List/list";
import Period from "./Period";
import DateTime from "./DateTime";
import Pay from "./Pay";
import moment from "moment";

const Add = ({ navigation }) => {
  const locale = "kr"; // temp
  const { goBack, state } = navigation;

  const [titleValue, setTitleValue] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [period, setPeriod] = useState("day");
  const [periodNum, setPeriodNum] = useState("1");
  const [dateValue, setDateValue] = useState("");
  const [payValue, setPayValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("won");

  const globalTitle = state.params.title;
  const item = list.filter(v => v.title === globalTitle)[0];
  const { local, icon, hex, cycle } = item;

  const data = local[locale] || local[local.default];
  const { url, description, price, currency } = data;
  const title = local[locale] ? local[locale].title : item.title;

  useEffect(() => {
    setTitleValue(title);
    setPeriod(cycle || "m");
    setCurrencyValue(currency || "dollar");
  }, []);

  const addSubs = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const item = {
        icon: {
          type: "include",
          title: globalTitle
        },
        globalTitle,
        title: titleValue,
        memo: memoValue,
        period,
        periodNum,
        date: dateValue || moment().format("YYYY.MM.DD"),
        price: payValue || price,
        currency: currencyValue
      };

      const list = result ? [...JSON.parse(result), item] : [item];

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(list), () => {
        goBack();
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={{
          marginBottom: 20,
          marginLeft: 25,
          alignSelf: "flex-start",
          paddingTop: 20,
          paddingRight: 20
        }}
        onPress={() => {
          goBack();
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>
      <View style={{ padding: 25, paddingTop: 5 }}>
        <View
          style={{
            padding: 10,
            backgroundColor: "#222",
            borderRadius: 7
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                paddingRight: 10,
                fontSize: 18,
                alignSelf: "center"
              }}
            >
              {title}
            </Text>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 3,
                backgroundColor: hex || "transparent",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {icon ? icon : null}
            </View>
          </View>

          {url ? (
            <Text
              style={{ color: "#3b82f6", marginTop: 5 }}
              onPress={() => Linking.openURL(url)}
            >
              {url}
            </Text>
          ) : null}

          {description ? (
            <Text style={{ color: "#ddd", marginTop: 5 }}>{description}</Text>
          ) : null}
        </View>

        <ScrollView style={{ height: "100%" }} keyboardDismissMode={"on-drag"}>
          <View
            style={{
              borderRadius: 5,
              marginTop: 20,
              backgroundColor: "#222"
            }}
          >
            <TextInput
              style={{
                height: 40,
                color: "#fff",
                padding: 5,
                paddingHorizontal: 10,
                fontSize: 18
              }}
              onChangeText={text => setTitleValue(text)}
              value={titleValue}
              placeholder="Title"
            />
            <TextInput
              style={{
                height: 40,
                color: "#fff",
                borderColor: "#333",
                borderTopWidth: 1,
                padding: 5,
                paddingHorizontal: 10,
                fontSize: 18
              }}
              onChangeText={text => setMemoValue(text)}
              value={memoValue}
              placeholder="Memo"
              placeholderTextColor={"#666"}
            />
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#333",
                padding: 5,
                paddingHorizontal: 10
              }}
            >
              <DateTime dateValue={dateValue} setDateValue={setDateValue} />
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#333",
                padding: 5,
                paddingHorizontal: 10
              }}
            >
              <Period
                period={period}
                periodNum={periodNum}
                setPeriod={setPeriod}
                setPeriodNum={setPeriodNum}
              />
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#333",
                padding: 5,
                paddingHorizontal: 10
              }}
            >
              <Pay
                payValue={payValue}
                setPayValue={setPayValue}
                currencyValue={currencyValue}
                setCurrencyValue={setCurrencyValue}
                price={price}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <TouchableOpacity
              onPress={() => {
                addSubs();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#222",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55
                }}
              >
                <Fa icon={faPlus} style={{ color: "#ddd" }} size={35} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#000",
    height: "100%"
  }
});

export default Add;
