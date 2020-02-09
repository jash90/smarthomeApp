import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Platform, View } from "react-native";
import AuthActions from "../actions/AuthActions";
import AuthApi from "../api/AuthApi";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Button,
    ButtonText,
    Input,
    Title
} from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import { Navigators } from "../Navigators/Enum";
import ValidatedInput from "../components/ValidatedInput";

interface State {
    login: string;
    password: string;
    firstname: string;
    lastname: string;
}

class Register extends Component<{}, State> {
    public loginInput: ValidatedInput | null | undefined;
    public passwordInput: ValidatedInput | null | undefined;
    public firstnameInput: ValidatedInput | null | undefined;
    public lastnameInput: ValidatedInput | null | undefined;

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
                        <ValidatedInput
                            ref={ref => (this.firstnameInput = ref)}
                            placeholder={"Firstname"}
                            value={this.state.firstname}
                            onChangeText={firstname =>
                                this.setState({ firstname })
                            }
                            error={this.state.firstname.length === 0}
                            errorText={"Uzupełnił firstname"}
                        />
                        <ValidatedInput
                            ref={ref => (this.lastnameInput = ref)}
                            placeholder={"Lastname"}
                            value={this.state.lastname}
                            onChangeText={lastname =>
                                this.setState({ lastname })
                            }
                            error={this.state.lastname.length === 0}
                            errorText={"Uzupełnił lastname"}
                        />
                        <ValidatedInput
                            ref={ref => (this.loginInput = ref)}
                            placeholder={"Login"}
                            value={this.state.login}
                            onChangeText={login => this.setState({ login })}
                            error={Boolean(() => this.validateEmail())}
                            errorText={"Nieprawidłowy format login"}
                        />
                        <ValidatedInput
                            ref={ref => (this.passwordInput = ref)}
                            placeholder={"Password"}
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={password =>
                                this.setState({ password })
                            }
                            error={this.state.password.length <= 4}
                            errorText={"Uzupełnił password"}
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

    validateEmail = () => {
        const validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.state.login
        );
        return !validate && this.state.login.length === 0;
    };

    onRegister = async () => {
        try {
            const { login, password, firstname, lastname } = this.state;
            if (
                !ValidatedInput.validate([
                    this.firstnameInput,
                    this.lastnameInput,
                    this.loginInput,
                    this.passwordInput
                ])
            ) {
                return;
            }
            const response = await AuthApi.register(
                login,
                password,
                firstname,
                lastname
            );
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
}
export default inject("authStore", "propsStore")(observer(Register));
