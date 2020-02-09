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
} from "../scenes/index";
import store from "../stores";
import NavigationService from "../NavigationService";
import { GradientHeader } from "../components/GradientHeader";
import Scenes from "../Scenes";
import { Navigators } from "./Enum";

const AuthNavigator = createStackNavigator(
    {
        Login,
        Register
    },
    {
        headerMode: "none"
    }
);

const AccountNavigator = createStackNavigator(
    {
        Home,
        Room,
        Add,
        EditProfile,
        Profile
    },
    {
        headerMode: "none"
    }
);

const AppNavigator = createStackNavigator(
    {
        Start,
        AuthNavigator,
        AccountNavigator
    },
    {
        headerMode: "none"
    }
);

const RootNavigator = createAppContainer(AppNavigator);

export { RootNavigator };
