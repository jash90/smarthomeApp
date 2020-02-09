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
import { RootNavigator } from "./src/Navigators/Navigators";
import axios from "./src/Axios";
import Interceptors from "./src/actions/Interceptors";

export default class App extends React.Component {
    componentDidMount() {
        axios.interceptors.request.use(
            request => Interceptors.handleRequest(request),
            error => Interceptors.handleError(error)
        );
        axios.interceptors.response.use(
            response => Interceptors.handleResponse(response),
            error => Interceptors.handleError(error)
        );
    }

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
