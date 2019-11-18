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
import { faChevronLeft, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import list from "../List/list";
import { TouchableOpacity } from "react-native-gesture-handler";

const Add = ({ navigation }) => {
  const locale = "kr"; // temp
  const [titleValue, setTitleValue] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [period, setPeriod] = useState("day");
  const [periodNum, setPeriodNum] = useState("1");
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
    setPeriod("m");
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
                  <TextInput
                    placeholder=""
                    style={{
                      color: "#fff",
                      backgroundColor: "#333",
                      width: 40,
                      height: 40,
                      fontSize: 20,
                      textAlign: "center",
                      borderRadius: 5,
                      marginRight: 5
                    }}
                    keyboardType="number-pad"
                    value={periodNum}
                    onChangeText={num => setPeriodNum(num)}
                    placeholderTextColor={"#666"}
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
                        setPeriod("d");
                      }}
                    >
                      <View style={styles.periodItemView}>
                        <Text
                          style={[
                            styles.periodItemText,
                            {
                              opacity: period === "d" ? 1 : 0.2,
                              fontWeight: period === "d" ? "bold" : "normal"
                            }
                          ]}
                        >
                          Day
                        </Text>
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
                          setPeriod("m");
                        }}
                      >
                        <View style={styles.periodItemView}>
                          <Text
                            style={[
                              styles.periodItemText,
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
                      onPress={() => {
                        setPeriod("y");
                      }}
                    >
                      <View style={styles.periodItemView}>
                        <Text
                          style={[
                            styles.periodItemText,
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
            </View>
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
  periodItemView: {
    height: 40,
    width: 70,
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

export default Add;
