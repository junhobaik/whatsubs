import React, { useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";

import list from "../AddList/list";

import moment from "moment";
import { DateTime, Info, Pay, Period, IconSetting } from "./Utils";

const Add = ({ navigation }) => {
  const locale = "kr"; // temp
  const { goBack, state } = navigation;
  const { type, modify } = state.params;

  const [titleValue, setTitleValue] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [period, setPeriod] = useState("day");
  const [dateValue, setDateValue] = useState("");
  const [payValue, setPayValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("won");
  const [hexValue, setHexValue] = useState("#333"); // custom only
  const [iconChar, setIconChar] = useState(""); // custom only
  const [infoData, setInfoData] = useState({}); // modify && include only

  const setInfo = globalTitle => {
    const item = list.filter(v => v.title === globalTitle)[0];
    const { icon, hex, local } = item;
    const localData = local[locale] || local[local.default];
    const { title, url, description } = localData;

    setInfoData({ globalTitle, title, description, url, icon, hex });
  };

  const includeData = () => {
    const itemTitle = state.params.title;
    const item = list.filter(v => v.title === itemTitle)[0];
    const { local, icon, hex, cycle } = item;

    const localData = local[locale] || local[local.default];
    const { title, url, description, price, currency } = localData;

    return {
      itemTitle,
      title,
      url,
      description,
      price,
      currency,
      icon,
      hex,
      cycle
    };
  };

  const setModifyData = () => {
    const { id } = state.params;

    const setValues = item => {
      const { currency, date, memo, period, price, title, icon } = item;

      setTitleValue(title);
      setMemoValue(memo);
      setDateValue(date);
      setPeriod(period);
      setPayValue(price);
      setCurrencyValue(currency);
      setHexValue(icon.hex);
      setIconChar(icon.iconChar);
    };

    const setInfoData = item => {
      setInfo(item.globalTitle);
    };

    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const item = JSON.parse(result).filter(v => v.id === id)[0];
      setValues(item);
      if (item.type === "include") setInfoData(item);
    });
  };

  const isAddInclude = type === "include" && !state.params.modify;
  const data = isAddInclude ? includeData() : {};

  const modifySubs = () => {
    const { id } = state.params;

    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const deletedList = JSON.parse(result).filter(v => v.id !== id);

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(deletedList), () => {
        if (type === "include") {
          addSubs();
        } else {
          addCustomSubs();
        }
      });
    });
  };

  const addSubs = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const item = {
        id: uuidv4(),
        type: "include",
        icon: {
          title: data.itemTitle || infoData.globalTitle
        },
        globalTitle: data.itemTitle || infoData.globalTitle,
        title: titleValue,
        memo: memoValue,
        period,
        date: dateValue || moment().format("YYYY.MM.DD"),
        price: payValue || data.price,
        currency: currencyValue
      };

      const list = result ? [...JSON.parse(result), item] : [item];

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(list), () => {
        goBack();
      });
    });
  };

  const addCustomSubs = () => {
    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const item = {
        id: uuidv4(),
        type: "custom",
        icon: {
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

  // ComponentDidMount
  useEffect(() => {
    if (state.params.modify) {
      setModifyData();
    } else {
      const { title, cycle, currency } = data;

      setTitleValue(title || "");
      setPeriod(cycle || "m");
      setCurrencyValue(currency || "dollar");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* goBack Icon */}
      <TouchableHighlight
        style={styles.goBack}
        onPress={() => {
          goBack();
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={{ color: "#eee" }} />
        </View>
      </TouchableHighlight>

      {/* Content Wrapper */}
      <View style={{ padding: 25, paddingTop: 5 }}>
        {/* Info */}
        {type === "include" ? (
          <Info
            title={modify ? infoData.title : data.title}
            icon={modify ? infoData.icon : data.icon}
            description={modify ? infoData.description : data.description}
            url={modify ? infoData.url : data.url}
            hex={modify ? infoData.hex : data.hex}
          />
        ) : null}

        {/* Content ScrollView */}
        <ScrollView style={{ height: "100%" }} keyboardDismissMode={"on-drag"}>
          {/* Contents */}
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "#222"
            }}
          >
            {/* Title Input */}
            <TextInput
              style={styles.titleInput}
              onChangeText={text => setTitleValue(text)}
              value={titleValue}
              placeholder="Title"
              placeholderTextColor={"#666"}
            />
            {/* Memo Input */}
            <TextInput
              style={styles.memoInput}
              onChangeText={text => setMemoValue(text)}
              value={memoValue}
              placeholder="Memo"
              placeholderTextColor={"#666"}
            />

            {/* DateTime Wrapper */}
            <View style={styles.utilWrapper}>
              <DateTime dateValue={dateValue} setDateValue={setDateValue} />
            </View>

            {/* Period Wrapper */}
            <View style={styles.utilWrapper}>
              <Period period={period} setPeriod={setPeriod} />
            </View>

            {/* Pay Wrapper */}
            <View style={styles.utilWrapper}>
              <Pay
                payValue={payValue}
                setPayValue={setPayValue}
                currencyValue={currencyValue}
                setCurrencyValue={setCurrencyValue}
                price={data.price || "0"}
              />
            </View>

            {type === "custom" ? (
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
            ) : null}
          </View>

          {/* Add Buttom Wrapper */}
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <TouchableOpacity
              onPress={() => {
                if (modify) {
                  modifySubs();
                } else {
                  if (type === "include") {
                    addSubs();
                  } else {
                    addCustomSubs();
                  }
                }
              }}
            >
              <View style={styles.addButton}>
                <Fa
                  icon={modify ? faCheck : faPlus}
                  style={{ color: "#ddd" }}
                  size={35}
                />
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
  },
  utilWrapper: {
    borderTopWidth: 1,
    borderColor: "#333",
    padding: 5,
    paddingHorizontal: 10
  },
  titleInput: {
    height: 40,
    color: "#fff",
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 18
  },
  memoInput: {
    height: 40,
    color: "#fff",
    borderColor: "#333",
    borderTopWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 18
  },
  goBack: {
    marginBottom: 20,
    marginLeft: 25,
    alignSelf: "flex-start",
    paddingTop: 20,
    paddingRight: 20
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55
  }
});

export default Add;
