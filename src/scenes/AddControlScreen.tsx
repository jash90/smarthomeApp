import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, ControlView, H4, HorizontalList, SeparatorHeight } from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import AppStore from "../stores/mobxStores/AppStore";
import ValidatedInput from "../components/ValidatedInput";
import TypeUtil from "../utils/TypeUtil";
import ControlActions from "../actions/ControlActions";
import { Control, Type } from "../stores/models";
import Stores from "../stores/mobxStores";
import Toast from "react-native-simple-toast";
import PropsStore from "../stores/mobxStores/PropsStore";
import Screens from "../navigation/Scenes";
import { Navigators } from "../navigation/navigators/Enum";
import { toJS } from "mobx";

interface Props {
    appStore: AppStore;
    propsStore: PropsStore;
    control?: Control;
}

interface State {
    name: string;
    typeId: number;
    roomId: number | null;
    loadingEdit: boolean;
    loadingRemove: boolean;
}

class AddControlScreen extends Component<Props, State> {
    public nameInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            typeId: 0,
            roomId: null,
            loadingEdit: false,
            loadingRemove: false
        };
    }

    componentDidMount = async () => {
        if (!!Stores.propsStore.control) {
            let { name, typeId, roomId } = Stores.propsStore.control;
            this.setState({
                name,
                typeId,
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
                                }
                            >
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
                <H4>Rooms</H4>
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
                                }
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <ControlView>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontSize: 14,
                                                color: color,
                                                padding: 10
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </ControlView>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {Stores.propsStore.control.id > 0 && (
                        <Button onPress={this.onRemove}>
                            {this.state.loadingRemove && (
                                <ActivityIndicator
                                    size={"small"}
                                    color={"#d0dbe6"}
                                />
                            )}
                            <ButtonText>Remove</ButtonText>
                        </Button>
                    )}
                    <Button onPress={this.onSave}>
                        {this.state.loadingEdit && (
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
            loadingEdit: true
        });
        if (Stores.propsStore.control.id == 0) {
            const { name, typeId, roomId } = this.state;
            const type = Stores.appStore.types.find(t => t.id == this.state.typeId);
            if (type) {
                let value = type.values[0];
                var item = { name, value, typeId, roomId };
                await ControlActions.saveControl(toJS(item));
            }
            else {
                this.setState({
                    loadingEdit: false
                });
                Toast.show("Incorrect Type", Toast.LONG);
                return;
            }
        } else {
            let { name, typeId, roomId } = this.state;
            let userId = Stores.authStore.id;
            let { value, id } = Stores.propsStore.control;
            if (typeId != Stores.propsStore.control.typeId) {
                const type = Stores.appStore.types.find(t => t.id == this.state.typeId);
                if (type) {
                    value = type.values[0];
                }
                else {
                    this.setState({
                        loadingEdit: false
                    });
                    Toast.show("Incorrect Type", Toast.LONG);
                    return;
                }
            }
            var item = { name, value, typeId, roomId };
            const control: Control = new Control(name, value, typeId, userId, roomId, id);
            await ControlActions.changeControl(toJS(control));
        }
        this.setState({
            loadingEdit: false
        });
        if (Number(Stores.propsStore.control.id) <= 0) this.clear();
    };

    clear = () => {
        this.setState({
            name: "",
            typeId: 0,
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
        await NavigationService.goBack();
    };
}

export default inject("appStore", "propsStore")(observer(AddControlScreen));
