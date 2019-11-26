import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-navigation";

import list from "./list";
import gs from "../globalStyle";

const List = ({ navigation }) => {
  const { navigate, goBack } = navigation;
  const [value, onChangeText] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const locale = "kr"; // temp

  useEffect(() => {
    setFilteredList(list);
  }, []);

  const onChangeSearchText = text => {
    onChangeText(text);

    if (text === "") {
      setFilteredList(list);
    } else {
      setFilteredList(
        list.filter(item => {
          const { title, local } = item;
          const lowerText = text.toLocaleLowerCase();
          const lowerTitle = title.toLocaleLowerCase();

          if (lowerTitle.indexOf(lowerText) > -1) return true;
          if (
            (local[locale] || local[local.default]).title
              .toLocaleLowerCase()
              .indexOf(lowerText) > -1
          )
            return true;
        })
      );
    }
  };

  const Item = ({ item }) => {
    const { icon, hex, local } = item;
    const globalTitle = item.title;

    const title = local[locale] ? local[locale].title : globalTitle;

    let iconElement;
    if (!icon) {
      iconElement = (
        <View
          style={{
            height: 25,
            width: 25,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", opacity: 0.8, color: "#333" }}>
            {title[0]}
          </Text>
        </View>
      );
    } else {
      iconElement = icon;
    }

    return (
      <View
        style={[
          {
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 5,
            marginHorizontal: 25
          },
          gs.normalShadow
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigate("Add", { title: globalTitle, type: "include" });
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 7,
              padding: 10
            }}
          >
            <View
              style={[
                {
                  backgroundColor: hex || "transparent",
                  borderRadius: 3,
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center"
                },
                !icon
                  ? {
                      borderWidth: 1,
                      borderColor: "#333",
                      borderStyle: "dotted"
                    }
                  : null
              ]}
            >
              {iconElement}
            </View>
            <Text style={[{ fontSize: 18 }, gs.normalFont]}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={gs.container}>
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

      <View
        style={[
          {
            backgroundColor: "#fff",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            marginHorizontal: 25,
            marginBottom: 1
          },
          gs.normalShadow
        ]}
      >
        <Fa icon={faSearch} style={{ color: "rgb(140, 143, 151)" }} />
        <TextInput
          style={[
            {
              flex: 1,
              height: 40,
              paddingLeft: 10,
              paddingRight: 10
            },
            gs.normalFont
          ]}
          onChangeText={text => onChangeSearchText(text)}
          value={value}
          placeholder="Search"
          placeholderTextColor={"#666"}
        />
      </View>

      <ScrollView keyboardDismissMode={"on-drag"}>
        <FlatList
          style={{ paddingVertical: 20 }}
          data={filteredList}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.title}
        />
        <TouchableOpacity
          onPress={() => {
            navigate("Add", { type: "custom" });
          }}
        >
          <View
            style={[
              {
                backgroundColor: "#fff",
                borderColor: "#ddd",
                borderWidth: 2,
                borderStyle: "dotted",
                marginBottom: 50,
                borderRadius: 7,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginHorizontal: 25
              },
              gs.normalShadow
            ]}
          >
            <View style={{ marginRight: 5 }}>
              <Fa icon={faPlusCircle} style={{ color: "#666" }} />
            </View>
            <Text style={[{ fontSize: 16 }, gs.normalFont]}>
              기타 항목 추가
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default List;
