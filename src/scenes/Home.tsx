import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Control,
    ControlText,
    H1,
    H2,
    H4,
    PersonText,
    Room,
    RoomText,
    SeparatorHeight,
    SeparatorWidth,
    WelcomeText
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Scenes from "../navigation/Scenes";
import Store from "../stores/mobxStores";
import ControlApi from "../api/ControlApi";
import Loading from "./Loading";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { NoItems } from "../components/NoItems";
import ErrorUtil from "../api/ErrorUtil";
import RoomsApi from "../api/RoomsApi";
import ControlSwitch from "../components/ControlSwitch";
import ControlSlider from "../components/ControlSlider";

interface State {
    controls: any[];
    loadingControl: boolean;
    rooms: any[];
    loadingRoom: boolean;
}

class Home extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            controls: [],
            rooms: [],
            loadingControl: true,
            loadingRoom: false
        };
    }

    componentWillMount = async () => {
        this.getControls();
        this.getRooms();
    };

    renderSeparator = () => {
        return <SeparatorHeight />;
    };

    renderEmpty = () => {
        if (this.state.loadingControl) {
            return <LoadingIndicator />;
        }
        return <NoItems />;
    };

    render() {
        return (
            <ScreenContainer icon="account" onRightPress={this.onProfile}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>{`Mr. ${Store.authStore.firstname}`}</PersonText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <H4>Rooms</H4>
                    <TouchableOpacity onPress={this.onAdd}>
                        <H4
                            style={{
                                color: "orange",
                                fontSize: 24,
                                marginHorizontal: 5
                            }}>
                            +
                        </H4>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={this.state.rooms}
                    style={{
                        height: 140,

                        flexGrow: 0,
                        marginHorizontal: -20
                    }}
                    contentContainerStyle={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: "100%"
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={item => String(item)}
                    ItemSeparatorComponent={() => <SeparatorWidth />}
                    renderItem={item => {
                        return (
                            <TouchableOpacity onPress={this.onRoom}>
                                <Room>
                                    <RoomText>{`Room ${item.index +
                                        1}`}</RoomText>
                                </Room>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <H4>Controls</H4>
                    <TouchableOpacity onPress={this.onAdd}>
                        <H4
                            style={{
                                color: "orange",
                                fontSize: 24,
                                marginHorizontal: 5
                            }}>
                            +
                        </H4>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.controls}
                    keyExtractor={item => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={item => {
                        if (item.item.type) {
                            return (
                                <ControlSlider
                                    name={item.item.name}
                                    icon={item.item.icon}
                                    value={item.item.value}
                                    min={item.item.min}
                                    max={item.item.max}
                                    onValueChange={(value: any) =>
                                        this.changeValue(item, value)
                                    }
                                />
                            );
                        } else {
                            return (
                                <ControlSwitch
                                    name={item.item.name}
                                    icon={item.item.icon}
                                    value={item.item.value}
                                />
                            );
                        }
                    }}
                />
            </ScreenContainer>
        );
    }

    onProfile = () => {
        NavigationService.navigate(Scenes.Profile);
    };

    onRoom = () => {
        NavigationService.navigate(Scenes.Room);
    };

    onAdd = () => {
        NavigationService.navigate(Scenes.Room);
    };

    getControls = async () => {
        try {
            this.setState({ loadingControl: true });
            const response = await ControlApi.getControls();
            if (response.status === 200) {
                const controls = [
                    {
                        id: 1,
                        icon: "oil-temperature",
                        name: "Temperature",
                        value: 25,
                        type: "slider",
                        min: 16,
                        max: 35
                    },
                    { id: 2, icon: "lightbulb", name: "Lamp 2", value: false },
                    { id: 3, icon: "power-plug", name: "Plug", value: true },
                    { id: 4, icon: "door", name: "Door", value: true },
                    { id: 5, icon: "garage", name: "Garage", value: false },
                    { id: 6, icon: "water-pump", name: "Garden", value: true }
                ];
                this.setState({ controls });
            } else {
                await ErrorUtil.errorService(response);
            }
            this.setState({ loadingControl: false });
        } catch (error) {
            this.setState({ loadingControl: false });
            await ErrorUtil.errorService(error);
        }
    };

    getRooms = async () => {
        try {
            this.setState({ loadingRoom: true });
            const response = await RoomsApi.getRooms();
            if (response.status === 200) {
                this.setState({ rooms: response.data });
            } else {
                await ErrorUtil.errorService(response);
            }
            this.setState({ loadingRoom: false });
        } catch (error) {
            this.setState({ loadingRoom: false });
            await ErrorUtil.errorService(error);
        }
    };

    changeValue(item: any, value: any) {
        const { controls } = this.state;
        controls[item.index].value = value;
        this.setState({ controls });
    }
}
export default inject("authStore", "propsStore")(observer(Home));
