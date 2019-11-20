import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import AddList from "./src/AddList";
import Add from "./src/Add";
import CustomAdd from "./src/Add/CustomAdd";

StatusBar.setBarStyle("lignt-content", true);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Dashboard },
    Dashboard: { screen: Dashboard },
    AddList: { screen: AddList },
    Add: { screen: Add },
    CustomAdd: { screen: CustomAdd }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
