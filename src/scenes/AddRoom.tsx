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

interface Props {
    appStore: AppStore;
}

interface State {
    name: string;
    loading: boolean;
    loadingRemove: boolean;
}

class AddRoom extends Component<Props, State> {
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
        if (!Stores.propsStore.room) {
            await RoomActions.saveRoom(new Room(this.state.name));
            Toast.show(`Room ${this.state.name} added.`);
        } else {
            const index = Stores.appStore.rooms.findIndex(
                (c: Room) => c.id == Stores.propsStore.room?.id
            );
            let { name } = this.state;
            const room: Room = new Room(name);
            await RoomActions.changeControl(index, room);
            Toast.show(`Room ${room.name} updated.`);
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
        await ControlActions.removeControl(Stores.propsStore.control?.id || 0);
        Toast.show(`Control ${Stores.propsStore.control?.name} removed.`);
        this.setState({
            loadingRemove: false
        });
        this.clear();
    };
}

export default inject("appStore")(observer(AddRoom));
