import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {ActivityIndicator, FlatList, TouchableOpacity, View} from "react-native";
import {ScreenContainer} from "../components/SceneContainer";
import {Button, ButtonText, H4, SeparatorHeight} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import AppStore from "../stores/mobxStores/AppStore";
import ValidatedInput from "../components/ValidatedInput";
import ControlActions from "../actions/ControlActions";
import {Control, Group} from "../stores/models";
import Stores from "../stores/mobxStores";
import Toast from "react-native-simple-toast";
import TypeActions from "../actions/TypeActions";
import ControlSlider from "../components/ControlSlider";
import ControlSwitch from "../components/ControlSwitch";
import {LoadingIndicator} from "../components/LoadingIndicator";
import {NoItems} from "../components/NoItems";

interface Props {
    appStore: AppStore;
    control?: Control | undefined;
}

interface State {
    name: string;
    typeId: number;
    value: any;
    roomId: number;
    loading: boolean;
    loadingRemove: boolean;
    loadingControl: boolean;
}

class AddRoom extends Component<Props, State> {
    public nameInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            typeId: 0,
            value: null,
            roomId: 0,
            loading: false,
            loadingRemove: false,
            loadingControl: false
        };
    }

    componentDidMount = async () => {
        console.log(this.props);
        if (!!Stores.propsStore.control) {
            let {name, typeId, value, roomId} = Stores.propsStore.control;
            this.setState({
                name,
                typeId,
                value,
                roomId
            });
        }
    };

    componentWillUnmount = () => {
        Stores.propsStore.setControl(new Control());
    };

    render() {
        return (
                <ScreenContainer onBackPress={this.onBack}>
                    <H4>Name</H4>
                    <ValidatedInput
                            ref={ref => (this.nameInput = ref)}
                            placeholder={"Name"}
                            value={this.state.name}
                            onChangeText={(name: any) => this.setState({name})}
                            error={this.state.name.length == 0}
                            errorText={"Uzupełnił nazwę"}
                    />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <H4>Controls</H4>
                        <TouchableOpacity>
                            <H4
                                    style={{
                                        color: "orange",
                                        fontSize: 24,
                                        marginHorizontal: 5
                                    }}
                            >
                                +
                            </H4>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                            data={Stores.appStore.controls}
                            keyExtractor={(item: any) => String(item.id)}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={this.renderEmpty}
                            renderItem={item => {
                                if (
                                        TypeActions.getGroup(item.item.typeId) ==
                                        Group.slider
                                ) {
                                    return <ControlSlider item={item}/>;
                                } else {
                                    return <ControlSwitch item={item}/>;
                                }
                            }}
                    />
                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                        {Stores.propsStore.control !== null && (
                                <Button onPress={this.onRemove}>
                                    {this.state.loading && (
                                            <ActivityIndicator
                                                    size={"small"}
                                                    color={"#d0dbe6"}
                                            />
                                    )}
                                    <ButtonText>Remove</ButtonText>
                                </Button>
                        )}
                        <Button onPress={this.onSave}>
                            {this.state.loading && (
                                    <ActivityIndicator
                                            size={"small"}
                                            color={"#d0dbe6"}
                                    />
                            )}
                            <ButtonText>Save</ButtonText>
                        </Button>
                    </View>
                </ScreenContainer>
        );
    }

    onBack = () => {
        NavigationService.goBack();
    };

    onSave = async () => {
        this.setState({
            loading: true
        });
        if (!Stores.propsStore.control) {
            await ControlActions.saveControl(this.state);
            Toast.show(`Control ${this.state.name} added.`);
        } else {
            const index = Stores.appStore.controls.findIndex(
                    (c: Control) => c.id == Stores.propsStore.control?.id
            );
            let {name, typeId, value, roomId} = this.state;
            const control: Control = new Control({
                id: Stores.propsStore.control.id,
                name,
                typeId,
                value,
                roomId,
                userId: Stores.authStore.id
            });

            await ControlActions.changeControl(index, control);
            Toast.show(`Control ${control.name} updated.`);
        }
        this.setState({
            loading: false
        });
        if (!!Stores.propsStore.control) this.clear();
    };

    clear = () => {
        this.setState({
            name: "",
            typeId: 0,
            value: null,
            roomId: 0
        });
    };

    onRemove = async () => {
        this.setState({
            loadingRemove: true
        });
        await ControlActions.removeControl(Stores.propsStore.control?.id || 0);
        Toast.show(`Control ${Stores.propsStore.control?.name} removed.`);
        this.setState({
            loadingRemove: false
        });
        this.clear();
    };

    renderSeparator = () => {
        return <SeparatorHeight/>;
    };

    renderEmpty = () => {
        if (this.state.loadingControl) {
            return <LoadingIndicator/>;
        }
        return <NoItems/>;
    };
}

export default inject("appStore")(observer(AddRoom));
