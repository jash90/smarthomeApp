import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Add, EditProfile, Home, Login, Profile, Register, Room, Start } from "../scenes/index";

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

