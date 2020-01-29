import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View, ScrollView, Platform } from "react-native";
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

class Register extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Title>Register</Title>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: Platform.OS === "ios" ? 0 : 60
                        }}>
                        <Input
                            placeholder={"Login"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                        <Input
                            placeholder={"Password"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                        <Input
                            placeholder={"Login"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                        <Input
                            placeholder={"Password"}
                            placeholderTextColor={"#D0DBE6"}
                        />
                    </View>
                    <Button onPress={this.onRegister}>
                        <ButtonText>Register</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }
    onBack = () => {
        NavigationService.goBack();
    };

    onRegister = () => {
        NavigationService.navigate(Scenes.Home);
    };
}
export default inject("authStore", "propsStore")(observer(Register));
