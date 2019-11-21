import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
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

const List = ({ navigation }) => {
  const { navigate, goBack } = navigation;
  const [value, onChangeText] = useState("");

  const locale = "kr"; // temp

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
          <Text style={{ fontWeight: "bold", opacity: 0.8, color: "#ddd" }}>
            {title[0]}
          </Text>
        </View>
      );
    } else {
      iconElement = icon;
    }

    return (
      <TouchableOpacity
        style={{ borderRadius: 5 }}
        onPress={() => {
          navigate("Add", { title: globalTitle, type: "include" });
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            backgroundColor: "#111",
            borderRadius: 7,
            padding: 10
          }}
        >
          <View
            style={[
              {
                height: 100,
                backgroundColor: hex || "transparent",
                borderRadius: 3,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center"
              },
              !icon
                ? { borderWidth: 1, borderColor: "#ddd", borderStyle: "dotted" }
                : null
            ]}
          >
            {iconElement}
          </View>
          <Text style={{ color: "#fff", fontSize: 18 }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
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
      <View
        style={{
          backgroundColor: "rgb(26, 27, 29)",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
          marginHorizontal: 25,
          marginBottom: 5
        }}
      >
        <Fa icon={faSearch} style={{ color: "rgb(140, 143, 151)" }} />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            color: "#fff",
            paddingLeft: 10,
            paddingRight: 10
          }}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="Search"
          placeholderTextColor={"#666"}
        />
      </View>

      <ScrollView style={{ padding: 25 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.title}
        />
        <TouchableOpacity
          onPress={() => {
            navigate("Add", { type: "custom" });
          }}
        >
          <View
            style={{
              backgroundColor: "#111",
              borderColor: "#444",
              borderWidth: 2,
              borderStyle: "dotted",
              marginBottom: 50,
              borderRadius: 7,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Fa icon={faPlusCircle} style={{ color: "#ddd" }} />
            </View>
            <Text style={{ color: "#ddd", fontSize: 16 }}>기타 항목 추가</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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

export default List;
