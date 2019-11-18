import React, { useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  Linking,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import list from "../List/list";

const Add = ({ navigation }) => {
  const locale = "kr"; // temp
  const [titleValue, setTitleValue] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const { navigate, state } = navigation;
  const item = list.filter(v => v.title === state.params.title)[0];
  const { title, local, icon, hex } = item;
  let { description, url } = item;

  let localTitle;

  if (local) {
    localTitle = local.title ? local.title[locale] || title : title;
    description = local.description
      ? local.description[locale] || description
      : description;
    url = local.url ? local.url[locale] || url : url;
  } else {
    localTitle = title;
  }

  useEffect(() => {
    setTitleValue(local ? local.title[locale] || title : title);
  }, []);

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
          navigate("List");
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
              {localTitle}
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
        <ScrollView>
          <View
            style={{ borderRadius: 5, marginTop: 20, backgroundColor: "#222" }}
          >
            <TextInput
              style={{
                height: 40,
                color: "#fff",
                padding: 5,
                paddingHorizontal: 10
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
                paddingHorizontal: 10
              }}
              onChangeText={text => setMemoValue(text)}
              value={memoValue}
              placeholder="Memo"
              placeholderTextColor={"#666"}
            />
          </View>
          <View>{/* dateTimePicker */}</View>
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
