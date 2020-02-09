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
import AuthApi from "../api/AuthApi";
import AuthActions from "../actions/AuthActions";
import ErrorUtil from "../ErrorUtil";
import { Navigators } from "../Navigators";

interface State {
    login: string;
    password: string;
    firstname: string;
    lastname: string;
}

class Register extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: "",
            password: "",
            firstname: "",
            lastname: ""
        };
    }

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
                            placeholder={"Firstname"}
                            placeholderTextColor={"#D0DBE6"}
                            value={this.state.firstname}
                            onChangeText={firstname =>
                                this.setState({ firstname })
                            }
                        />
                        <Input
                            placeholder={"Lastname"}
                            placeholderTextColor={"#D0DBE6"}
                            value={this.state.lastname}
                            onChangeText={lastname =>
                                this.setState({ lastname })
                            }
                        />
                        <Input
                            placeholder={"Login"}
                            placeholderTextColor={"#D0DBE6"}
                            value={this.state.login}
                            onChangeText={login => this.setState({ login })}
                        />
                        <Input
                            placeholder={"Password"}
                            placeholderTextColor={"#D0DBE6"}
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={password =>
                                this.setState({ password })
                            }
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

    onRegister = async () => {
        try {
            const { login, password, firstname, lastname } = this.state;
            const response = await AuthApi.register(login, password, firstname, lastname);
            AuthActions.setUser(response.data);    
            NavigationService.navigate(Navigators.Account);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    };
}
export default inject("authStore", "propsStore")(observer(Register));
