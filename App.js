import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import List from "./src/List";

StatusBar.setBarStyle("lignt-content", true);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: List },
    List: { screen: List },
    Dashboard: { screen: Dashboard }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
