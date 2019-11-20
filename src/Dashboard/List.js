import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import addListData from "../AddList/list";

const List = ({ list }) => {
  const allList = list.map(v => {
    const splitedDate = v.date.split(".");

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
    };

    const makedIcon = makeIcon(v.icon.type);

    return (
      <TouchableOpacity
        key={v.id}
        style={{ backgroundColor: "#222", marginBottom: 10, borderRadius: 7 }}
      >
        <View>
          <Text
            style={{ color: "#ddd" }}
          >{`${splitedDate[1]}.${splitedDate[2]}`}</Text>
          <Text style={{ color: "white" }}>{v.title}</Text>
          <View>{makedIcon}</View>
        </View>
      </TouchableOpacity>
    );
  });

  return <View>{allList}</View>;
};

export default List;
