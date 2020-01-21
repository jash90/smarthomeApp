import { Provider } from "mobx-react";
import React from "react";
import {
    createAppContainer,
    NavigationContainerComponent
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home } from "./src/scenes/index";
import store from "./src/stores";
import NavigationService from "./src/NavigationService";

const AppNavigator = createStackNavigator(
    {
        Home
    },
    {
        //   initialRouteName:"About"
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
