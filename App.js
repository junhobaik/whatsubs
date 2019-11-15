import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "./src/Dashboard";
import List from "./src/List";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Dashboard },
    List: { screen: List }
  },
  { headerMode: "none" }
);

const App = createAppContainer(MainNavigator);

export default App;
