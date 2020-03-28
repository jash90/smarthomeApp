import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "../components/SceneContainer";
import { Button, ButtonText, H4, SeparatorHeight } from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import AppStore from "../stores/mobxStores/AppStore";
import ValidatedInput from "../components/ValidatedInput";
import ControlActions from "../actions/ControlActions";
import { Control, Group, Room } from "../stores/models";
import Stores from "../stores/mobxStores";
import Toast from "react-native-simple-toast";
import TypeActions from "../actions/TypeActions";
import ControlSlider from "../components/ControlSlider";
import ControlSwitch from "../components/ControlSwitch";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { NoItems } from "../components/NoItems";
import RoomActions from '../actions/RoomActions';
import { Navigators } from "../navigation/navigators/Enum";
import { toJS } from "mobx";

interface Props {
    appStore: AppStore;
}

interface State {
    name: string;
    loading: boolean;
    loadingRemove: boolean;
}

class AddRoomScreen extends Component<Props, State> {
    public nameInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            loading: false,
            loadingRemove: false,
        };
    }

    componentDidMount = async () => {
        if (!!Stores.propsStore.room) {
            let { name, } = Stores.propsStore.room;
            this.setState({
                name
            });
        }
    };

    componentWillUnmount = async () => {
        if (Number(Stores.propsStore.room.id) <= 0)
            await Stores.propsStore.setRoom(new Room());
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
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {Stores.propsStore.room.id > 0 && (
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
        if (Stores.propsStore.room.id <= 0) {
            await RoomActions.saveRoom(new Room(this.state.name));
        } else {
            const index = Stores.appStore.rooms.findIndex(
                (c: Room) => c.id == Stores.propsStore.room?.id
            );
            let { name } = this.state;
            let { userId, controls, id } = Stores.propsStore.room;
            let room: Room = new Room(name, userId, controls, id);
            await RoomActions.changeControl(index, room);
        }
        this.setState({
            loading: false
        });
        if (!!Stores.propsStore.control) this.clear();
    };

    clear = () => {
        this.setState({
            name: ""
        });
    };

    onRemove = async () => {
        this.setState({
            loadingRemove: true
        });
        await RoomActions.removeRoom(Stores.propsStore.room.id);

        this.setState({
            loadingRemove: false
        });
        this.clear();
        await Stores.propsStore.setRoom(new Room());
        await NavigationService.reset(Navigators.Account);
    };
}

export default inject("appStore")(observer(AddRoomScreen));
