import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import { Logo } from "../components/Logo";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, Title } from "../components/StyledComponent";

class Start extends Component {
    render() {
        return (
            <ScreenContainer>
                <Title>SmartHome</Title>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Logo />
                    </View>
                    <Button>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Start));
