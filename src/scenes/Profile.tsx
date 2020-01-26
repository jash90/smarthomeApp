import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Logo } from "../components/Logo";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Button,
    ButtonText,
    Title,
    Input,
    FlatButton,
    WelcomeText,
    PersonText,
    H2,
    SeparatorHeight,
    Control,
    ControlText
} from "../components/StyledComponent";
import { NotificationBar } from "../components/NotificationBar";

class Profile extends Component {
    render() {
        return (
            <ScreenContainer onRightPress={true}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>Mr. Karol</PersonText>
                <H2>Controls</H2>
                
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Profile));
