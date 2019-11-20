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
import uuidv4 from "uuid/v4";
import moment from "moment";

import Period from "../Period";
import DateTime from "../DateTime";
import Pay from "../Pay";
import IconSetting from "./IconSetting";

const CustomAdd = ({ navigation }) => {
  const locale = "kr"; // temp
  const { goBack } = navigation;

  const [titleValue, setTitleValue] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [period, setPeriod] = useState("day");
  const [dateValue, setDateValue] = useState("");
  const [payValue, setPayValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("won");
  const [hexValue, setHexValue] = useState("#333");
  const [iconChar, setIconChar] = useState("");

  useEffect(() => {
    setPeriod("m");
    setCurrencyValue("dollar");
  }, []);

  const addSubs = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const item = {
        id: uuidv4(),
        icon: {
          type: "custom",
          iconChar: iconChar !== "" ? iconChar : titleValue[0],
          hex: hexValue
        },
        title: titleValue,
        memo: memoValue,
        period,
        date: dateValue || moment().format("YYYY.MM.DD"),
        price: payValue || 0,
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
              placeholderTextColor={"#666"}
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
              <Period period={period} setPeriod={setPeriod} />
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
                price={0}
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
              <IconSetting
                hexValue={hexValue}
                setHexValue={setHexValue}
                iconChar={iconChar}
                setIconChar={setIconChar}
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

export default CustomAdd;
