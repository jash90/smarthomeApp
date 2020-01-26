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

class Register extends Component {
    render() {
        return (
            <ScreenContainer>
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
                    <Button>
                        <ButtonText>Register</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Register));
