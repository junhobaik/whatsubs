import { Platform, Dimensions, StatusBar } from "react-native";

const { width, height, scale } = Dimensions.get("window");

const isSmall = width * scale <= 1080 && height / width < 1.8;

const containerPaddingTop = (() => {
  if (Platform.OS === "android") {
    const statusbarHeight = StatusBar.currentHeight;
    const vw = width * scale;

    if (vw >= 1440) return statusbarHeight + 13;
    return statusbarHeight + 5;
  }
  return 0;
})();

export default {
  isSmall,
  container: {
    paddingTop: containerPaddingTop,
    backgroundColor: "#fafafa",
    height: "100%"
  },
  normalFont: {
    color: "#2b2c2e"
  },
  inputFont: {
    color: "#444"
  },
  normalShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3
  },
  goBack: {
    alignSelf: "flex-start",
    paddingVertical: isSmall ? 10 : 15,
    paddingHorizontal: 22.5
  },
  goBackColor: {
    color: "#333"
  },

  fontSize1: {
    fontSize: isSmall ? 18 : 22
  },
  fontSize2: {
    fontSize: isSmall ? 16 : 20
  },
  fontSize3: {
    fontSize: isSmall ? 14 : 18
  },
  fontSize4: {
    fontSize: isSmall ? 13 : 16
  },
  fontSize5: {
    fontSize: isSmall ? 12 : 14
  }
};
