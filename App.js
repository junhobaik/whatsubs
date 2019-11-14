import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import Add from "./src/Add";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Dashboard },
    Add: { screen: Add }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
