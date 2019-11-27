import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Text
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faCheck,
  faTrash,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";
import moment from "moment";
import { StackActions } from "react-navigation";

import { DateTime, Info, Pay, Period, IconSetting } from "./Utils";
import list from "../AddList/list";
import gs from "../globalStyle";

const Add = ({ navigation }) => {
  const locale = "kr"; // temp
  const { goBack, state, reset, navigate } = navigation;
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
  const [verification, setVerification] = useState({
    date: true,
    title: true,
    messages: []
  });

  const goHome = () => {
    StackActions.reset({
      index: 0,
      actions: [navigate("Home")]
    });
  };

  const verifySubmit = () => {
    const splitDate = dateValue.split(".");
    const month = parseInt(splitDate[1], 10);
    const day = parseInt(splitDate[2], 10);

    const checkDot = splitDate.length === 3 || dateValue === "";
    const checkMonth = (month < 13 && month > 0) || dateValue === "";
    const checkDay = (day < 32 && day > 0) || dateValue === "";
    const checkTitle = titleValue !== "";

    const messages = [];
    if (!checkTitle) messages.push("제목(Title)을 입력하세요");
    if (!checkDot) messages.push("날짜를 모두 입력했는지 확인하세요");
    if (!checkDay && checkDot) messages.push("날짜의 일(Day)이 잘못되었어요");
    if (!checkMonth && checkDot)
      messages.push("날짜의 월(Month)이 잘못되었어요");

    setVerification({
      date: checkDot && checkDay && checkMonth,
      title: checkTitle,
      messages
    });

    return checkTitle && checkDot && checkDay && checkMonth;
  };

  const createErrorMessage = () => {
    let result = null;

    if (verification.messages) {
      result = verification.messages.map(msg => {
        return (
          <Text
            key={msg}
            style={[{ color: "#d75a46", textAlign: "center" }, gs.fontSize5]}
          >
            {msg}
          </Text>
        );
      });
    }

    return result;
  };

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

  const dateFormater = date => {
    const addFrontZero = index => {
      if (dateArr[index].length === 1) {
        dateArr[index] = `0${dateArr[index]}`;
      }
    };
    const dateArr = date.split(".");
    addFrontZero(1);
    addFrontZero(2);
    return dateArr.join(".");
  };

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

  const deleteSubs = () => {
    const { id } = state.params;

    AsyncStorage.getItem("whatsubs_list", (err, result) => {
      const deletedList = JSON.parse(result).filter(v => v.id !== id);

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(deletedList), () => {
        goBack();
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
        date: dateFormater(dateValue || moment().format("YYYY.MM.DD")),
        price: payValue || data.price,
        currency: currencyValue
      };

      const list = result ? [...JSON.parse(result), item] : [item];

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(list), () => {
        goHome();
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
        date: dateFormater(dateValue || moment().format("YYYY.MM.DD")),
        price: payValue || 0,
        currency: currencyValue
      };

      const list = result ? [...JSON.parse(result), item] : [item];

      AsyncStorage.setItem("whatsubs_list", JSON.stringify(list), () => {
        goHome();
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
    <SafeAreaView style={gs.container}>
      {/* goBack Icon */}
      <TouchableOpacity
        style={gs.goBack}
        onPress={() => {
          goBack();
        }}
      >
        <View>
          <Fa icon={faChevronLeft} size={20} style={gs.goBackColor} />
        </View>
      </TouchableOpacity>

      {/* Content Wrapper */}
      <ScrollView stlye={{ flex: 1 }} keyboardDismissMode={"on-drag"}>
        {/* Info */}
        {type === "include" ? (
          <View style={[{ marginHorizontal: 25 }]}>
            <Info
              title={modify ? infoData.title : data.title}
              icon={modify ? infoData.icon : data.icon}
              description={modify ? infoData.description : data.description}
              url={modify ? infoData.url : data.url}
              hex={modify ? infoData.hex : data.hex}
            />
          </View>
        ) : null}

        {/* Content ScrollView */}
        <View style={{ height: "100%" }} keyboardDismissMode={"on-drag"}>
          {/* Contents */}
          <View
            style={[
              {
                borderRadius: 5,
                backgroundColor: "#fff",
                marginHorizontal: 25
              },
              gs.normalShadow
            ]}
          >
            {/* Title Input */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.titleInput, gs.normalFont, gs.fontSize3]}
                onChangeText={text => setTitleValue(text)}
                value={titleValue}
                placeholder="Title"
                placeholderTextColor={"#bbb"}
              />

              {!verification.title ? (
                <Fa
                  icon={faExclamationCircle}
                  style={{ color: "#d75a46", marginRight: 10 }}
                  size={14}
                />
              ) : null}
            </View>

            {/* Memo Input */}
            <TextInput
              style={[styles.memoInput, gs.normalFont, gs.fontSize3]}
              onChangeText={text => setMemoValue(text)}
              value={memoValue}
              placeholder="Memo"
              placeholderTextColor={"#bbb"}
            />

            {/* DateTime Wrapper */}
            <View style={styles.utilWrapper}>
              <DateTime
                dateValue={dateValue}
                setDateValue={setDateValue}
                isError={!verification.date}
              />
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
              <View style={styles.utilWrapper}>
                <IconSetting
                  hexValue={hexValue}
                  setHexValue={setHexValue}
                  iconChar={iconChar}
                  setIconChar={setIconChar}
                />
              </View>
            ) : null}
          </View>

          {/* error messages */}
          <View style={{ marginTop: 20 }}>{createErrorMessage()}</View>

          {/* Add Buttom Wrapper */}
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 30
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (verifySubmit()) {
                  if (modify) {
                    modifySubs();
                  } else {
                    if (type === "include") {
                      addSubs();
                    } else {
                      addCustomSubs();
                    }
                  }
                }
              }}
            >
              <View style={[styles.addButton, gs.normalShadow]}>
                <Fa
                  icon={modify ? faCheck : faPlus}
                  style={{ color: "#3b82f6" }}
                  size={22}
                />
              </View>
            </TouchableOpacity>
            {modify ? (
              <TouchableOpacity
                onPress={() => {
                  deleteSubs();
                }}
              >
                <View style={[styles.addButton, gs.normalShadow]}>
                  <Fa icon={faTrash} style={{ color: "#e84f3d" }} size={22} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  utilWrapper: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 7,
    paddingHorizontal: 10
  },
  titleInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: gs.isSmall ? 10 : 15
  },
  memoInput: {
    borderColor: "#eee",
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: gs.isSmall ? 10 : 15
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 40
  }
});

export default Add;
