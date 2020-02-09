import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import AuthActions from "../actions/AuthActions";
import AuthApi from "../api/AuthApi";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Button,
    ButtonText,
    FlatButton,
    Input,
    Title
} from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import { Navigators } from "../Navigators/Enum";
import Scenes from "../Scenes";

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
