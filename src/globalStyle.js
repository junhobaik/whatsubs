import { Platform } from "react-native";

export default {
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
  }
};
