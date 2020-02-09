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
    Title
} from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import { Navigators } from "../Navigators/Enum";
import Scenes from "../Scenes";
import ValidatedInput from "../components/ValidatedInput";
import Toast from "react-native-simple-toast";

interface State {
    login: string;
    password: string;
}

class Login extends Component<{}, State> {
    public loginInput: ValidatedInput | null | undefined;
    public passwordInput: ValidatedInput | null | undefined;

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
                        <ValidatedInput
                            ref={ref => (this.loginInput = ref)}
                            placeholder={"Login"}
                            value={this.state.login}
                            error={this.state.login.length === 0}
                            errorText={"Uzupełnij login"}
                            onChangeText={login => this.setState({ login })}
                        />
                        <ValidatedInput
                            ref={ref => (this.passwordInput = ref)}
                            placeholder={"Password"}
                            value={this.state.password}
                            error={this.state.password.length === 0}
                            errorText={"Uzupełnij hasło"}
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
            if (!ValidatedInput.validate([this.loginInput, this.passwordInput])){
                return;
            }
            const response = await AuthApi.login(login, password);
            if (response.status === 200 && !!response.data?.token) {
                AuthActions.setUser(response.data);
                NavigationService.navigate(Navigators.Account);
            } else {
                ErrorUtil.errorService(response);
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
