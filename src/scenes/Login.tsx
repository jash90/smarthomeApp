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
                        <FlatButton>
                            <ButtonText>Create account</ButtonText>
                        </FlatButton>
                    </View>
                    <Button>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Login));
