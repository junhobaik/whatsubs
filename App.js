import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import AddList from "./src/AddList";
import Add from "./src/Add";
import Information from "./src/Information";
import License from './src/Information/License';

StatusBar.setBarStyle("dark-content", true);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Dashboard },
    Dashboard: { screen: Dashboard },
    AddList: { screen: AddList },
    Add: { screen: Add },
    Information: { screen: Information },
    License: { screen: License }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
