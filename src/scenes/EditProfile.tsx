import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Title,
    Input,
    FlatButton,
    ButtonText,
    Button,
    H1
} from "../components/StyledComponent";
import { View } from "react-native";

class EditProfile extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={true}>
                <View style={{ flex: 1, alignItems:"center" }}>
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
}
export default inject("authStore", "propsStore")(observer(EditProfile));
