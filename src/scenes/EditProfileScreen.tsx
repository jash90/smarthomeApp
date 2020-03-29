import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import Toast from "react-native-simple-toast";
import AuthActions from "../actions/AuthActions";
import { UserApi } from "../api";
import ErrorUtil from "../api/ErrorUtil";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, H1, Input } from "../components/StyledComponent";
import ValidatedInput from "../components/ValidatedInput";
import NavigationService from "../navigation/NavigationService";
import Store from "../stores/mobxStores";

interface State {
    firstname: string;
    lastname: string;
    password: string;
    repeatPassword: string;
}

class EditProfileScreen extends Component<{}, State> {
    public loginInput: ValidatedInput | null | undefined;
    public passwordInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            firstname: Store.authStore.firstname,
            lastname: Store.authStore.lastname,
            password: "",
            repeatPassword: ""
        };
    }

    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <H1>Edit Profile</H1>
                    <Input
                        placeholder={"Firstname"}
                        value={this.state.firstname}
                        onChangeText={firstname => this.setState({ firstname })}
                    />
                    <Input
                        placeholder={"Lastname"}
                        value={this.state.lastname}
                        onChangeText={lastname => this.setState({ lastname })}
                    />
                    <Button onPress={this.saveProfile}>
                        <ButtonText>Save Profile</ButtonText>
                    </Button>
                    <H1>Edit Password</H1>
                    <Input
                        placeholder={"Password"}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                    <Input
                        placeholder={"Repeat password"}
                        value={this.state.repeatPassword}
                        onChangeText={repeatPassword =>
                            this.setState({ repeatPassword })
                        }
                        secureTextEntry
                    />
                    <Button onPress={this.savePassword}>
                        <ButtonText>Save Password</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }

    onBack = () => {
        NavigationService.goBack();
    };

    saveProfile = async () => {
        try {
            const { firstname, lastname } = this.state;
            const response = await UserApi.edit(firstname, lastname);
            AuthActions.setUser(response.data);
            Toast.show("Profile changes.");
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    };
    savePassword = async () => {
        try {
            const { password, repeatPassword } = this.state;
            const response = await UserApi.editPassword(
                password,
                repeatPassword
            );
            AuthActions.setUser(response.data);
            Toast.show("Password changes.");
            this.setState({ password: "", repeatPassword: "" });
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    };
}

export default inject("authStore", "propsStore")(observer(EditProfileScreen));