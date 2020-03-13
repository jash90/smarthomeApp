import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import AuthActions from "../actions/AuthActions";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, PersonText, WelcomeText } from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Screens from "../navigation/Scenes";
import Store from "../stores/mobxStores";

class ProfileScreen extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>{`Mr. ${Store.authStore.firstname}`}</PersonText>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button onPress={this.onEditProfile}>
                        <ButtonText>Edit Profile</ButtonText>
                    </Button>
                    <Button onPress={this.onLogout}>
                        <ButtonText>Logout</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }

    onBack = () => {
        NavigationService.goBack();
    };
    onEditProfile = () => {
        NavigationService.navigate(Screens.EditProfileScreen);
    };
    onLogout = () => {
        AuthActions.clearUser();
        NavigationService.navigate(Screens.LoginScreen);
    };
}

export default inject("authStore", "propsStore")(observer(ProfileScreen));
