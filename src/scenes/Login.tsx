import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
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
import ErrorUtil from "../ErrorUtil";
import Store from "../stores";
import AuthActions from "../actions/AuthActions";
import { Navigators } from "../Navigators/Enum";

interface State {
    login: string;
    password: string;
}

class Login extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }
    render() {
        return (
            <ScreenContainer>
                <Title>Login</Title>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Input
                            placeholder={"Login"}
                            placeholderTextColor={"#D0DBE6"}
                            value={this.state.login}
                            onChangeText={login => this.setState({ login })}
                        />
                        <Input
                            placeholder={"Password"}
                            placeholderTextColor={"#D0DBE6"}
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={password =>
                                this.setState({ password })
                            }
                        />
                        <FlatButton onPress={this.onRegister}>
                            <ButtonText>Create account</ButtonText>
                        </FlatButton>
                    </View>
                    <Button onPress={this.onLogin}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScreenContainer>
        );
    }

    onLogin = async () => {
        try {
            const { login, password } = this.state;
            const response = await AuthApi.login(login, password);
            if (!!response.data?.token) {
                AuthActions.setUser(response.data);
                NavigationService.navigate(Navigators.Account);
            }
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    };

    onRegister = () => {
        NavigationService.navigate(Scenes.Register);
    };
}
export default inject("authStore", "propsStore")(observer(Login));
