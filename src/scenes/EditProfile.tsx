import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, H1, Input } from "../components/StyledComponent";
import NavigationService from "../NavigationService";

class EditProfile extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <H1>Edit Profile</H1>
                    <Input
                        placeholder={"Firstname"}
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <Input
                        placeholder={"Lastname"}
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <Button>
                        <ButtonText>Save Profile</ButtonText>
                    </Button>
                    <H1>Edit Password</H1>
                    <Input
                        placeholder={"Password"}
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <Input
                        placeholder={"Repeat password"}
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <Button>
                        <ButtonText>Save Password</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }
    onBack = () => {
        NavigationService.goBack();
    };
}
export default inject("authStore", "propsStore")(observer(EditProfile));
