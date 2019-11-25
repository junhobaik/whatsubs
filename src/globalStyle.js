import { Platform, Dimensions } from "react-native";

// const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const isSmall = screenHeight < 720;

export default {
  isSmall,
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : 20,
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
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  goBack: {
    marginBottom: 20,
    marginLeft: 25,
    alignSelf: "flex-start",
    paddingTop: 20,
    paddingRight: 20
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
