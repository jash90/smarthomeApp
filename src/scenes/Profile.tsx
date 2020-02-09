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
    ControlText,
    SeparatorWidth,
    FlatText,
    SaveContainer,
    SaveText
} from "../components/StyledComponent";
import { NotificationBar } from "../components/NotificationBar";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";
import AuthActions from '../actions/AuthActions';

class Profile extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>{`Mr. ${Store.authStore.firstname}`}</PersonText>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    <H2>Flats</H2>
                    <SaveContainer>
                        <SaveText>Save</SaveText>
                    </SaveContainer>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Input
                        style={{ width: 100, alignSelf: "flex-start" }}
                        placeholder="Add new Flat"
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <FlatList
                        horizontal
                        style={{
                            paddingHorizontal: 20,
                            height: 25,
                            flexGrow: 0
                        }}
                        data={[1, 2, 3, 4, 5, 6]}
                        keyExtractor={item => String(item)}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <SeparatorWidth />}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <FlatText>Flat1</FlatText>
                                </>
                            );
                        }}
                    />
                </View>
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
        NavigationService.navigate(Scenes.EditProfile);
    };
    onLogout = () => {
        AuthActions.clearUser();
        NavigationService.navigate(Scenes.Login);
    };
}
export default inject("authStore", "propsStore")(observer(Profile));
