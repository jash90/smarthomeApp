import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthActions from "../actions/AuthActions";
import AuthApi from "../api/AuthApi";
import axios from "../api/Axios";
import ErrorUtil from "../api/ErrorUtil";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, FlatButton, Title } from "../components/StyledComponent";
import ValidatedInput from "../components/ValidatedInput";
import NavigationService from "../navigation/NavigationService";
import { Navigators } from "../navigation/navigators/Enum";
import Screens from "../navigation/Scenes";
import AsyncStore from "../stores/asyncStore";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import Stores from "../stores/mobxStores";
import TypeActions from '../actions/TypeActions';
import Color from "../config/Color";
interface State {
    login: string;
    password: string;
}

class LoginScreen extends Component<{}, State> {
    public loginInput: ValidatedInput | null | undefined;
    public passwordInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            login: Stores.appStore.savedEmail,
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
                            placeholder={"Email"}
                            value={this.state.login}
                            error={this.state.login.length === 0}
                            errorText={"Uzupełnij login"}
                            onChangeText={login => {
                                this.setState({ login });
                            }}
                        />
                        <ValidatedInput
                            ref={ref => (this.passwordInput = ref)}
                            placeholder={"Password"}
                            value={this.state.password}
                            error={this.state.password.length === 0}
                            errorText={"Uzupełnij hasło"}
                            secureTextEntry
                            onChangeText={password => this.setState({ password })}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <FlatButton onPress={this.rememberEmail}>
                                <Icon
                                    name={
                                        Stores.appStore.rememberEmail ? "check-box-outline" : "checkbox-blank-outline"
                                    }
                                    size={24}
                                    color={Color.primaryColor}
                                    style={{ alignSelf: "center" }}
                                />
                                <ButtonText>Save email</ButtonText>
                            </FlatButton>
                            <FlatButton onPress={this.onRegister}>
                                <ButtonText>Create account</ButtonText>
                            </FlatButton>
                        </View>
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
            if (!ValidatedInput.validate([this.loginInput, this.passwordInput])) {
                return;
            }
            const response = await AuthApi.login(login, password);
            await AuthActions.setUser(response.data);
            await TypeActions.dowloadTypes();
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            if (Stores.appStore.rememberEmail) {
                Stores.appStore.setSavedEmail(this.state.login);
                await AsyncStore.save(AsyncStoreKeys.savedEmail, this.state.login);
            }
            NavigationService.reset(Navigators.Account);
        } catch (error) {
            await ErrorUtil.errorService(error);
        }
    };
    rememberEmail = async () => {
        if (Stores.appStore.rememberEmail) {
            Stores.appStore.setRememberEmail(false);
            Stores.appStore.setSavedEmail("");
            await AsyncStore.save(AsyncStoreKeys.savedEmail, "");
            await AsyncStore.save(AsyncStoreKeys.rememberEmail, false);
        } else {
            Stores.appStore.setRememberEmail(true);
            Stores.appStore.setSavedEmail(this.state.login);
            await AsyncStore.save(AsyncStoreKeys.savedEmail, this.state.login);
            await AsyncStore.save(AsyncStoreKeys.rememberEmail, true);
        }
    };

    onRegister = () => {
        NavigationService.navigate(Screens.RegisterScreen);
    };
}

export default inject("authStore", "propsStore", "appStore")(observer(LoginScreen));
