import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { Logo } from "../components/Logo";
import { ScreenContainer } from "../components/SceneContainer";
import { H1, Title } from "../components/StyledComponent";
import Initial from "../initial";
import NavigationService from "../navigation/NavigationService";
import { Navigators } from "../navigation/navigators/Enum";
import Scenes from "../navigation/Scenes";
import Stores from "../stores/mobxStores";

class Loading extends Component {
    componentDidMount = async () => {
        await Initial.AppStore();
        if (Stores.appStore.firstOpen) {
            NavigationService.reset(Scenes.Start);
        } else if (Stores.appStore.logged) {
            NavigationService.reset(Navigators.Account);
        } else {
            NavigationService.reset(Navigators.Auth);
        }
    };

    render() {
        return (
            <ScreenContainer>
                <Title>SmartHome</Title>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Logo />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <ActivityIndicator size={32} />
                        <H1>Loading...</H1>
                    </View>
                </View>
            </ScreenContainer>
        );
    }
}

export default inject("authStore", "propsStore", "appStore")(observer(Loading));
