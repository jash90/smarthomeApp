import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "../components/SceneContainer";
import {
    H4,
    HorizontalList,
    PersonText,
    RoomText,
    RoomView,
    SeparatorHeight,
    SeparatorWidth,
    WelcomeText
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Screens from "../navigation/Scenes";
import Store from "../stores/mobxStores";
import ControlApi from "../api/ControlApi";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { NoItems } from "../components/NoItems";
import ErrorUtil from "../api/ErrorUtil";
import RoomsApi from "../api/RoomApi";
import ControlSwitch from "../components/ControlSwitch";
import ControlSlider from "../components/ControlSlider";
import { Clazz, Serialize } from "../serialize/index";
import { Group, Control, Room } from "../stores/models";
import TypeActions from "../actions/TypeActions";
import Stores from "../stores/mobxStores";

interface State {
    loadingControl: boolean;
    loadingRoom: boolean;
    loading: boolean;
}

class HomeScreen extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loadingControl: true,
            loadingRoom: false,
            loading: false
        };
    }

    UNSAFE_componentWillMount = async () => {
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
                    <TouchableOpacity onPress={this.onAddRoom}>
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
                <HorizontalList
                    data={Store.appStore.rooms}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item: any) => String(item.id)}
                    ItemSeparatorComponent={() => <SeparatorWidth />}
                    renderItem={({ item }: any) => {
                        return (
                            <TouchableOpacity onPress={() => this.onRoom(item)}>
                                <RoomView>
                                    <RoomText>{item.name}</RoomText>
                                </RoomView>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <H4>Controls</H4>
                    <TouchableOpacity onPress={this.onAddControl}>
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
                    data={Store.appStore.controls}
                    keyExtractor={(item: any) => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={item => {
                        if (TypeActions.getGroup(item.item.typeId) == Group.slider) {
                            return <ControlSlider item={item} />;
                        } else {
                            return <ControlSwitch item={item} />;
                        }
                    }}
                />
            </ScreenContainer>
        );
    }

    onProfile = () => {
        NavigationService.navigate(Screens.ProfileScreen);
    };

    onRoom = async (room: Room) => {
        await Stores.propsStore.setRoom(room);
        NavigationService.navigate(Screens.RoomScreen);
    };

    onAddControl = () => {
        NavigationService.navigate(Screens.AddControlScreen);
    };

    onAddRoom = () => {
        NavigationService.navigate(Screens.AddRoomScreen);
    };

    getControls = async () => {
        try {
            this.setState({ loadingControl: true });
            const response = await ControlApi.getControls();
            if (response.status === 200) {
                const controls = response.data;
                await Serialize.this(Clazz.controls, controls);
                Store.appStore.setControls(controls);
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
                Store.appStore.setRooms(response.data);
            } else {
                await ErrorUtil.errorService(response);
            }
            this.setState({ loadingRoom: false });
        } catch (error) {
            this.setState({ loadingRoom: false });
            await ErrorUtil.errorService(error);
        }
    };

    changeValueControl(item: any) {
        // setTimeout(() => {
        //     const { controls } = this.state;
        //     controls[item.index].value = !item.item.value;
        //     this.setState({ controls });
        // }, 1000);
    }

    changeValueSlider(item: any, value: any) {
        // const { controls } = this.state;
        // controls[item.index].value = value;
        // this.setState({ controls });
        // try {
        //     this.setState({ loadingRoom: true });
        //     const response = await RoomsApi.getRooms();
        //     if (response.status === 200) {
        //         this.setState({ rooms: response.data });
        //     } else {
        //         await ErrorUtil.errorService(response);
        //     }
        //     this.setState({ loadingRoom: false });
        // } catch (error) {
        //     this.setState({ loadingRoom: false });
        //     await ErrorUtil.errorService(error);
        // }
    }
}

export default inject("authStore", "appStore", "propsStore")(observer(HomeScreen));
