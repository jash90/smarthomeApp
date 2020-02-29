import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, View } from "react-native";
import AuthActions from "../actions/AuthActions";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Button,
    ButtonText,
    FlatText,
    H2,
    Input,
    PersonText,
    SaveContainer,
    SaveText,
    SeparatorWidth,
    WelcomeText
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Scenes from "../navigation/Scenes";
import Store from "../stores/mobxStores";

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
                        renderItem={() => {
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
