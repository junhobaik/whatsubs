import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import List from "./src/List";
import Add from "./src/Add";

StatusBar.setBarStyle("lignt-content", true);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Dashboard },
    Dashboard: { screen: Dashboard },
    List: { screen: List },
    Add: { screen: Add }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
