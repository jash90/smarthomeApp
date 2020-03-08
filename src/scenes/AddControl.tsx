import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import {
    ControlView,
    ControlText,
    H4,
    SeparatorHeight,
    Title,
    HorizontalList,
    ButtonText,
    Button
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import AppStore from "../stores/mobxStores/AppStore";
import ValidatedInput from "../components/ValidatedInput";
import TypeUtil from "../utils/TypeUtil";
import ControlActions from "../actions/ControlActions";
import { Control } from "../stores/models";
import Stores from "../stores/mobxStores";

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
}

class AddControl extends Component<Props, State> {
    public nameInput: ValidatedInput | null | undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            typeId: 0,
            value: null,
            roomId: 0,
            loading: false,
            loadingRemove: false
        };
    }

    componentDidMount = async () => {
        console.log(this.props);
        if (!!Stores.propsStore.control) {
            let { name, typeId, value, roomId } = Stores.propsStore.control;
            this.setState({
                name,
                typeId,
                value,
                roomId
            });
        }
    };

    componentWillUnmount = () => {
        Stores.propsStore.setControl(null);
    };

    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <H4>Name</H4>
                <ValidatedInput
                    ref={ref => (this.nameInput = ref)}
                    placeholder={"Name"}
                    value={this.state.name}
                    onChangeText={(name: any) => this.setState({ name })}
                    error={this.state.name.length == 0}
                    errorText={"Uzupełnił nazwę"}
                />
                <H4>Type</H4>
                <HorizontalList
                    data={this.props.appStore.types}
                    keyExtractor={(item: any) => String(item.id)}
                    ItemSeparatorComponent={() => <SeparatorHeight />}
                    renderItem={({ item }: any) => {
                        const color =
                            item.id === this.state.typeId
                                ? "#FF7500"
                                : "#D0DBE8";
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ typeId: item.id })
                                }>
                                <View style={{ flexDirection: "row" }}>
                                    <ControlView>
                                        <Icon
                                            name={item.icon}
                                            size={40}
                                            color={color}
                                        />
                                    </ControlView>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <H4>Value</H4>
                <HorizontalList
                    data={
                        this.props.appStore.types
                            .find(t => t.id == this.state.typeId)
                            ?.values.map((type: any) =>
                                TypeUtil.stringifyValue(type)
                            ) || []
                    }
                    keyExtractor={(item: any) => String(item.id)}
                    ItemSeparatorComponent={() => <SeparatorHeight />}
                    renderItem={({ item }: any) => {
                        const color =
                            item === TypeUtil.stringifyValue(this.state.value)
                                ? "#FF7500"
                                : "#D0DBE8";
                        return (
                            <TouchableOpacity
                                onPress={() => this.setState({ value: item })}>
                                <View style={{ flexDirection: "row" }}>
                                    <ControlView>
                                        <Text
                                            style={{
                                                fontSize: 36,
                                                color: color
                                            }}>
                                            {item}
                                        </Text>
                                    </ControlView>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                {/* <H4>Rooms</H4>
                <HorizontalList
                    data={this.props.appStore.rooms}
                    keyExtractor={(item: any) => String(item.id)}
                    ItemSeparatorComponent={() => <SeparatorHeight />}
                    renderItem={({ item }: any) => {
                        const color =
                            item.id === this.state.roomId
                                ? "#FF7500"
                                : "#D0DBE8";
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({
                                        roomId: this.state.roomId
                                            ? null
                                            : item.id
                                    })
                                }>
                                <View style={{ flexDirection: "row" }}>
                                    <ControlView>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontSize: 14,
                                                color: color,
                                                padding: 10
                                            }}>
                                            {item.name}
                                        </Text>
                                    </ControlView>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                /> */}
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
        } else {
            const index = Stores.appStore.controls.findIndex(
                (c: Control) => c.id == Stores.propsStore.control?.id
            );
            let { name, typeId, value, roomId } = this.state;
            const control: Control = {
                id: Stores.propsStore.control?.id || 0,
                name,
                typeId,
                value,
                roomId
            };

            await ControlActions.changeControl(index, control);
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
        this.setState({
            loadingRemove: false
        });
        this.clear();
    };
}
export default inject("appStore")(observer(AddControl));
