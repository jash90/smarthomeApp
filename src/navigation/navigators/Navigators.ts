import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
    AddControlScreen,
    AddRoomScreen,
    EditProfileScreen,
    HomeScreen,
    LoadingScreen,
    LoginScreen,
    ProfileScreen,
    RegisterScreen,
    RoomScreen,
    StartScreen
} from "../../scenes/index";
import { Navigators } from "./Enum";

const AuthNavigator = createStackNavigator(
    {
        LoginScreen,
        RegisterScreen
    },
    {
        headerMode: "none"
    }
);

const AccountNavigator = createStackNavigator(
    {
        HomeScreen,
        RoomScreen,
        AddRoomScreen,
        AddControlScreen,
        EditProfileScreen,
        ProfileScreen
    },
    {
        headerMode: "none"
    }
);

const AppNavigator = createStackNavigator(
    {
        LoadingScreen,
        StartScreen,
        [Navigators.Auth]: AuthNavigator,
        [Navigators.Account]: AccountNavigator
    },
    {
        headerMode: "none"
    }
);

const RootNavigator = createAppContainer(AppNavigator);

export { RootNavigator };
