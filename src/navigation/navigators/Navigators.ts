import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
    AddRoom,
    EditProfile,
    Home,
    Loading,
    Login,
    Profile,
    Register,
    Room,
    Start,
    AddControl
} from "../../scenes/index";
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
        AddRoom,
        AddControl,
        EditProfile,
        Profile
    },
    {
        headerMode: "none"
    }
);

const AppNavigator = createStackNavigator(
    {
        Loading,
        Start,
        [Navigators.Auth]: AuthNavigator,
        [Navigators.Account]: AccountNavigator
    },
    {
        headerMode: "none"
    }
);

const RootNavigator = createAppContainer(AppNavigator);

export { RootNavigator };
