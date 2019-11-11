import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from "./components/AppTabNavigator/HomeTab";
import SearchTab from "./components/AppTabNavigator/SearchTab";
import AddMediaTab from "./components/AppTabNavigator/AddMediaTab";
import LikesTab from "./components/AppTabNavigator/LikesTab";
import ProfileTab from "./components/AppTabNavigator/ProfileTab";

// 하단 탭 네비게이터 생성
const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomeTab: { screen: HomeTab },
    SearchTab: { screen: SearchTab },
    AddMediaTab: { screen: AddMediaTab },
    LikesTab: { screen: LikesTab },
    ProfileTab: { screen: ProfileTab }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        backgroundColor: "white"
      },
      iconStyle: { height: 30 },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true
    }
  }
);

const AppTabContainer = createAppContainer(AppTabNavigator);

const App = () => {
  return <AppTabContainer />;
};

App.navigationOptions = {
  header: null
};

export default App;
