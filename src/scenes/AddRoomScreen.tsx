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
import { LoadingText } from "../components/LoadingText";

interface Props {
    appStore: AppStore;
}

interface State {
    name: string;
    loadingEdit: boolean;
    loadingRemove: boolean;
}

class AddRoomScreen extends Component<Props, State> {
    public nameInput: ValidatedInput | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            loadingEdit: false,
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
                            <LoadingText loading={this.state.loadingRemove} >
                                {"Remove"}
                            </LoadingText>
                        </Button>
                    )}
                    <Button onPress={this.onSave}>
                        <LoadingText loading={this.state.loadingEdit} >
                            {"Save"}
                        </LoadingText>
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
        if (Stores.propsStore.room.id <= 0) {
            await RoomActions.saveRoom(new Room(this.state.name));
        } else {
            let { name } = this.state;
            let { userId, id } = Stores.propsStore.room;
            let room: Room = new Room(name, userId, id);
            await RoomActions.changeControl(room);
        }
        this.setState({
            loadingEdit: false
        });
        if (Number(Stores.propsStore.room.id) <= 0) this.clear();
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
