import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarAlt,
  faMoneyCheckAlt,
  faWonSign,
  faDollarSign,
  faYenSign,
  faRedoAlt
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const DateTime = ({ dateValue, setDateValue }) => {
  const [max, setMax] = useState(10);
  const now = moment().format("YYYY.MM.DD");

  const changeValue = text => {
    if (dateValue.length < text.length) {
      if (text.length === 4) text += ".";
      if (text.length === 6 && parseInt(text[5], 10) > 1) {
        setMax(9);
        text += ".";
      }
      if (text.length === 7 && text[6] !== ".") {
        setMax(10);
        text += ".";
      }
      if (text.length - 1 < max) setDateValue(text);
    } else {
      setDateValue(text);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Fa icon={faCalendarAlt} style={{ color: "#ddd" }} size={20} />
      <View>
        <TextInput
          style={{
            backgroundColor: "#333",
            width: 150,
            height: 40,
            color: "#fff",
            padding: 5,
            paddingHorizontal: 10,
            fontSize: 18,
            borderRadius: 5,
            fontWeight: "bold",
            textAlign: "right"
          }}
          onChangeText={text => changeValue(text)}
          value={dateValue}
          placeholder={now}
          placeholderTextColor={"#666"}
          keyboardType="number-pad"
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};

export const Info = ({ title, icon, url, description }) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#222",
        borderRadius: 7
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
  );
};

export const Pay = ({
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
            <View style={styles.payItemView}>
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
              <View style={styles.payItemView}>
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
            <View style={styles.payItemView}>
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

export const Period = ({ period, setPeriod }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Fa icon={faRedoAlt} style={{ color: "#ddd" }} size={20} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 5,
            backgroundColor: "#333",
            width: 150
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: "#444",
              width: "50%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPeriod("m");
              }}
            >
              <View style={periodStyles.periodItemView}>
                <Text
                  style={[
                    periodStyles.periodItemText,
                    {
                      opacity: period === "m" ? 1 : 0.2,
                      fontWeight: period === "m" ? "bold" : "normal"
                    }
                  ]}
                >
                  Month
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: "50%"
            }}
            onPress={() => {
              setPeriod("y");
            }}
          >
            <View style={periodStyles.periodItemView}>
              <Text
                style={[
                  periodStyles.periodItemText,
                  {
                    opacity: period === "y" ? 1 : 0.2,
                    fontWeight: period === "y" ? "bold" : "normal"
                  }
                ]}
              >
                Year
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  payItemView: {
    height: 40,
    width: 45,
    paddingHorizontal: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  payItemText: {
    color: "#fff",
    fontSize: 16,
    margin: 0,
    borderRadius: 3
  },
  icon: {
    color: "#666"
  }
});

const periodStyles = StyleSheet.create({
  periodItemView: {
    height: 40,
    paddingHorizontal: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  periodItemText: {
    color: "#fff",
    fontSize: 16,
    margin: 0,
    borderRadius: 3
  }
});

export const IconSetting = ({
  hexValue,
  setHexValue,
  iconChar,
  setIconChar
}) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View
            style={{
              backgroundColor: "#d8d8d8",
              height: 20,
              width: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>{`i`}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginTop: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setHexValue("#dd5471");
              }}
              style={{
                backgroundColor: "#dd5471",
                flexGrow: 1,
                width: 40,
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#eea341");
              }}
              style={{ backgroundColor: "#eea341", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#42803c");
              }}
              style={{ backgroundColor: "#42803c", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#4388ae");
              }}
              style={{ backgroundColor: "#4388ae", flexGrow: 1, width: 40 }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHexValue("#193a4a");
              }}
              style={{
                backgroundColor: "#193a4a",
                flexGrow: 1,
                width: 40,
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3
              }}
            ></TouchableOpacity>
          </View>
        </View>

        <View>
          <TextInput
            style={{
              borderRadius: 10,
              width: 70,
              height: 70,
              backgroundColor: hexValue,
              textAlign: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: "#ddd"
            }}
            onChangeText={text => {
              if (text.length < 2) setIconChar(text);
            }}
            value={iconChar}
          />
        </View>
      </View>
    </View>
  );
};
