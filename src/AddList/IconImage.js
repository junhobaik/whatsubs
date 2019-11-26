import React, { useState } from "react";
import { View, Image } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const IconImage = ({ source }) => {
  const [ready, setReady] = useState(false);

  const loadImage = async img => {
    return Asset.loadAsync([img]);
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={() => loadImage(source)}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Image
      style={{
        borderRadius: 3,
        width: 30,
        height: 30
      }}
      source={source}
    />
  );
};

export default IconImage;
