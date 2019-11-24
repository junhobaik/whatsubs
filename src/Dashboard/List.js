import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
import gs from "../globalStyle";

const List = ({ navigate, list, filter, sort, cashify, currencyFormat }) => {
  const getNextDate = item => {
    const { date, period } = item;
    const splitDate = date.split(".");

    const now = {
      date: parseInt(moment().format("YYYYMMDD"), 10),
      d: parseInt(moment().format("DD"), 10),
      m: parseInt(moment().format("MM"), 10),
      y: parseInt(moment().format("YYYY"), 10),
      lastDay: parseInt(
        moment()
          .endOf("month")
          .format("DD"),
        10
      ),
      nextLastDay: parseInt(
        moment()
          .add(1, "month")
          .endOf("month")
          .format("DD"),
        10
      )
    };

    const sub = {
      date: parseInt(splitDate.join(""), 10),
      y: parseInt(splitDate[0], 10),
      m: parseInt(splitDate[1], 10),
      d: parseInt(splitDate[2], 10)
    };

    let resultYear = now.y;
    let resultMonth = now.m;
    let resultDay = sub.d;

    if (period === "m") {
      if (sub.d > now.lastDay) resultDay = now.lastDay;

      if (now.d > sub.d) {
        if (sub.d > now.nextLastDay) resultDay = now.nextLastDay;

        if (now.m === 12) {
          resultMonth = 1;
          resultYear += 1;
        } else {
          resultMonth = now.m + 1;
        }
      }
    }

    if (period === "y") {
      resultMonth = sub.m;

      if (parseInt(`${now.m}${now.d}`, 10) > parseInt(`${sub.m}${sub.d}`, 10)) {
        resultYear += 1;
      }
    }

    const result = {
      y: resultYear.toString(),
      m:
        resultMonth.toString().length === 1
          ? `0${resultMonth}`
          : resultMonth.toString(),
      d:
        resultDay.toString().length === 1
          ? `0${resultDay}`
          : resultDay.toString()
    };

    return {
      y: `${result.y}`,
      m: `${result.m}`,
      d: `${result.d}`,
      num: parseInt(`${result.y}${result.m}${result.d}`, 10)
    };
  };

  const sortList = (list, sort) => {
    const price = (a, b) => {
      const cur = item => {
        return parseInt(
          cashify.convert(item.price, {
            from: currencyFormat(item.currency),
            to: "KRW"
          }),
          10
        );
      };

      return cur(b) - cur(a);
    };

    const title = (a, b) => {
      const x = a.title.toLocaleLowerCase();
      const y = b.title.toLocaleLowerCase();
      if (x > y) {
        return 1;
      }
      if (y > x) {
        return -1;
      }
      return 0;
    };

    const pay = (a, b) => getNextDate(a).num - getNextDate(b).num;

    switch (sort) {
      case "title":
        return list.sort(title);
      case "price":
        return list.sort(price);
      case "pay":
        return list.sort(pay);
      default:
        return list.sort(title);
    }
  };

  const filterList = (list, filter) => {
    switch (filter) {
      case "all": {
        return list;
      }
      case "month": {
        const splitNowDate = moment()
          .format("YYYY.MM.DD")
          .split(".");

        const now = {
          y: parseInt(splitNowDate[0], 10),
          m: parseInt(splitNowDate[1], 10),
          d: parseInt(splitNowDate[2], 10)
        };

        return list.filter(v => {
          const splitSubDate = v.date.split(".");
          const { y, m, d, num } = getNextDate(v);

          const sub = {
            y: parseInt(splitSubDate[0], 10),
            m: parseInt(splitSubDate[1], 10),
            d: parseInt(splitSubDate[2], 10),
            num
          };

          const next = {
            y: parseInt(y, 10),
            m: parseInt(m, 10),
            d: parseInt(d, 10),
            num: parseInt(splitSubDate.join(""), 10)
          };

          if (v.period === "m") return true;

          if (
            v.period === "y" &&
            sub.m === now.m &&
            sub.y <= now.y &&
            next.y >= now.y
          ) {
            return true;
          }
        });
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

  const remakedList = sortList(filterList(list, filter), sort);

  const listMap = remakedList.map(v => {
    const { y, m, d } = getNextDate(v);

    let dateStr = `${y.substr(2, 2)}.${m}.${d}`;

    if (v.period === "m") {
      dateStr = `${m}.${d}`;
    }

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

      return <Fa icon={icon} style={{ color: "#9b9b9b" }} size={12} />;
    };

    const makedIcon = makeIcon(v.type);
    const makedCurrencyIcon = makeCurrencyIcon(v.currency);

    return (
      <TouchableOpacity
        key={v.id}
        style={[
          {
            backgroundColor: "#fff",
            marginBottom: 10,
            borderRadius: 7,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10
          },
          gs.normalShadow
        ]}
        onPress={() => {
          navigate("Add", { id: v.id, type: v.type, modify: true });
        }}
      >
        <View>
          <Text style={[{ fontSize: 18, fontWeight: "bold" }, gs.normalFont]}>
            {v.title}
          </Text>
          <View style={{ marginTop: 10 }}>{makedIcon}</View>
        </View>
        <View
          style={{ alignItems: "flex-end", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 2 }}>{makedCurrencyIcon}</View>
            <Text style={[{ fontSize: 16 }, gs.normalFont]}>{v.price}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#666", fontSize: 16 }}>{dateStr}</Text>
            <View
              style={{
                backgroundColor:
                  v.period === "m" ? "rgb(4, 132, 255)" : "rgb(252, 71, 59)",
                borderRadius: 100,
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

  return (
    <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
      {listMap}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10
  }
});

export default List;
