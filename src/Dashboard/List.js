import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faDollarSign,
  faYenSign,
  faWonSign,
  faCalendarDay,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import addListData from "../AddList/list";

const List = ({ navigate, list }) => {
  const thisMonth = moment().format("MM");
  const thisDay = moment().format("DD");

  const allList = list.map(v => {
    const splitedDate = v.date.split(".");
    const subMonth = splitedDate[1];
    const subDay = splitedDate[2];

    let resultMonth = thisMonth;
    if (parseInt(thisDay, 10) > parseInt(subDay, 10)) {
      resultMonth = parseInt(thisMonth) + 1;
    }
    if (v.period === "y") resultMonth = subMonth;
    let dateStr = `${resultMonth}.${subDay}`;

    const makeIcon = iconType => {
      if (iconType === "include") {
        const itemData = addListData.filter(a => a.title === v.icon.title)[0];
        icon = itemData.icon;
        hex = itemData.hex || "transparent";

        return (
          <View
            style={{
              backgroundColor: hex,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3
            }}
          >
            {icon}
          </View>
        );
      }
      if (iconType === "custom") {
        return (
          <View
            style={{
              backgroundColor: v.icon.hex,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3
            }}
          >
            <Text style={{ color: "#ddd", fontSize: 20, fontWeight: "bold" }}>
              {v.icon.iconChar}
            </Text>
          </View>
        );
      }
    };

    const makeCurrencyIcon = currency => {
      let icon;
      switch (currency) {
        case "dollar":
          icon = faDollarSign;
          break;
        case "won":
          icon = faWonSign;
          break;
        case "yen":
          icon = faYenSign;
          break;
        default:
          icon = faDollarSign;
          break;
      }

      return <Fa icon={icon} style={{ color: "#ddd" }} size={14} />;
    };

    const makedIcon = makeIcon(v.type);
    const makedCurrencyIcon = makeCurrencyIcon(v.currency);

    return (
      <TouchableOpacity
        key={v.id}
        style={{
          backgroundColor: "rgb(26, 27, 29)",
          marginBottom: 10,
          borderRadius: 7,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10
        }}
        onPress={() => {
          console.log(`> Modify: ${v.title}`);
          navigate("Add", { id: v.id, type: v.type, modify: true });
        }}
      >
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {v.title}
          </Text>
          <View style={{ marginTop: 10 }}>{makedIcon}</View>
        </View>
        <View
          style={{ alignItems: "flex-end", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 2 }}>{makedCurrencyIcon}</View>
            <Text style={{ color: "#fff", fontSize: 16 }}>{v.price}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#bbb", fontSize: 16 }}>{dateStr}</Text>
            <View
              style={{
                backgroundColor:
                  v.period === "m" ? "rgb(4, 132, 255)" : "rgb(252, 71, 59)",
                borderRadius: "100%",
                height: 16,
                width: 16,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 3,
                opacity: 0.7
              }}
            >
              <Fa
                icon={v.period === "m" ? faCalendarDay : faCalendarAlt}
                style={{ color: "#fff", margin: 0 }}
                size={10}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return <View>{allList}</View>;
};

export default List;
