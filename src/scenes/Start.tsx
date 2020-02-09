import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import { Logo } from "../components/Logo";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, Title } from "../components/StyledComponent";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import { Navigators } from "../Navigators";

class Start extends Component {
    render() {
        return (
            <ScreenContainer>
                <Title>SmartHome</Title>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Logo />
                    </View>
                    <Button onPress={this.onLogin}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }

    onLogin = () => {
        NavigationService.navigate(Navigators.Auth);
    };
}
export default inject("authStore", "propsStore")(observer(Start));
