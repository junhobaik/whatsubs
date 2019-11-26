import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import gs from "../globalStyle";

const Information = ({ navigation }) => {
  const { navigate, goBack } = navigation;

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

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            flex: 1
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70
            }}
            source={require("../../assets/icon.png")}
          />

          <Text
            style={[
              { fontWeight: "bold", marginTop: 10 },
              gs.normalFont,
              gs.fontSize1
            ]}
          >
            WhatSubs
          </Text>

          <Text style={{ marginTop: 15 }}>Junho Baik</Text>
          <Text>junhobaik@gmail.com</Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigate("License");
            }}
          >
            <Text style={{ textDecorationLine: "underline", marginBottom: 10 }}>
              오픈소스 라이선스
            </Text>
          </TouchableOpacity>
          <Text>{`Copyright© 2019. Junho Baik. All rights reserved.`}</Text>
        </View>
        {/* end wrapper */}
      </View>
    </SafeAreaView>
  );
};

export default Information;
