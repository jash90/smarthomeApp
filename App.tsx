import { Provider } from "mobx-react";
import React from "react";
import {
    createAppContainer,
    NavigationContainerComponent
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
    Home,
    Start,
    Add,
    EditProfile,
    Login,
    Profile,
    Register,
    Room
} from "./src/scenes/index";
import store from "./src/stores";
import NavigationService from "./src/NavigationService";
import { GradientHeader } from "./src/components/GradientHeader";
import Scenes from "./src/Scenes";

const AppNavigator = createStackNavigator(
    {
        Home,
        Start,
        Add,
        EditProfile,
        Login,
        Profile,
        Register,
        Room
    },
    {
        // defaultNavigationOptions: {
        //     headerTitle: <GradientHeader />
        // }
        initialRouteName: Scenes.Start,
        headerMode: "none"
    }
);

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider {...store}>
                <RootNavigator
                    ref={(navigatorRef: NavigationContainerComponent) => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}
