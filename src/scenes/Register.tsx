import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Platform, View} from "react-native";
import AuthActions from "../actions/AuthActions";
import AuthApi from "../api/AuthApi";
import ErrorUtil from "../api/ErrorUtil";
import {ScreenContainer} from "../components/SceneContainer";
import {Button, ButtonText, Title} from "../components/StyledComponent";
import ValidatedInput from "../components/ValidatedInput";
import NavigationService from "../navigation/NavigationService";
import {Navigators} from "../navigation/navigators/Enum";
import {regexEmail} from "../utils/Const";

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
                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                        <Title>Register</Title>
                        <View
                                style={{
                                    flex: 1,
                                    paddingTop: Platform.OS === "ios" ? 0 : 60
                                }}
                        >
                            <ValidatedInput
                                    ref={ref => (this.firstnameInput = ref)}
                                    placeholder={"Firstname"}
                                    value={this.state.firstname}
                                    onChangeText={firstname =>
                                            this.setState({firstname})
                                    }
                                    error={this.state.firstname.length === 0}
                                    errorText={"Uzupełnił firstname"}
                            />
                            <ValidatedInput
                                    ref={ref => (this.lastnameInput = ref)}
                                    placeholder={"Lastname"}
                                    value={this.state.lastname}
                                    onChangeText={lastname =>
                                            this.setState({lastname})
                                    }
                                    error={this.state.lastname.length === 0}
                                    errorText={"Uzupełnił lastname"}
                            />
                            <ValidatedInput
                                    ref={ref => (this.loginInput = ref)}
                                    placeholder={"Email"}
                                    value={this.state.login}
                                    onChangeText={login => this.setState({login})}
                                    error={
                                        !regexEmail.test(this.state.login) &&
                                        this.state.login.length === 0
                                    }
                                    errorText={"Nieprawidłowy format email"}
                            />
                            <ValidatedInput
                                    ref={ref => (this.passwordInput = ref)}
                                    placeholder={"Password"}
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={password =>
                                            this.setState({password})
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

    onRegister = async () => {
        try {
            const {login, password, firstname, lastname} = this.state;
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
            if (!!response.data?.token) {
                await AuthActions.setUser(response.data);
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
