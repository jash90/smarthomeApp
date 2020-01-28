import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import { Logo } from "../components/Logo";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Button,
    ButtonText,
    Title,
    Input,
    FlatButton
} from "../components/StyledComponent";
import { NotificationBar } from "../components/NotificationBar";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";

class Login extends Component {
    render() {
        return (
            <ScreenContainer>
                <Title>Login</Title>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Input
                            placeholder={"Login"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                        <Input
                            placeholder={"Password"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                        <FlatButton onPress={this.onRegister}>
                            <ButtonText>Create account</ButtonText>
                        </FlatButton>
                    </View>
                    <Button onPress={this.onLogin}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }

    onLogin = () => {
        NavigationService.navigate(Scenes.Home);
    };

    onRegister = () => {
        NavigationService.navigate(Scenes.Register);
    };
}
export default inject("authStore", "propsStore")(observer(Login));
