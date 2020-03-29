import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
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
import AppStore from '../stores/mobxStores/AppStore';
import PropsStore from '../stores/mobxStores/PropsStore';
import styled from "styled-components/native"
interface Props {
    appStore: AppStore;
    propsStore: PropsStore;
}

interface State {
    loadingControl: boolean;
    loadingRoom: boolean;
    loading: boolean;
}
const Container = styled.View`
flex: 1;
margin: 0 40px;
`;

class HomeScreen extends Component<Props, State> {
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
                <ScrollView style={{ marginTop: 10, marginHorizontal: -40 }} showsVerticalScrollIndicator={false}>
                    <Container>
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
                            data={Stores.appStore.rooms}
                            ListEmptyComponent={this.renderEmpty}
                            keyExtractor={(item: any) => String(item.id)}
                            extraData={Stores.propsStore.room}
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
                            data={this.props.appStore.controls.filter(c => c.roomId === null)}
                            keyExtractor={(item: any) => String(item.id)}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            extraData={Stores.propsStore.control}
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
                    </Container>
                </ScrollView>

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
            const controls = response.data;
            await Serialize.this(Clazz.control, controls);
            Store.appStore.setControls(controls);
        } catch (error) {
            await ErrorUtil.errorService(error);
        }
        finally {
            this.setState({ loadingControl: false });
        }
    };

    getRooms = async () => {
        try {
            this.setState({ loadingRoom: true });
            const response = await RoomsApi.getRooms();
            Store.appStore.setRooms(response.data);
        } catch (error) {
            await ErrorUtil.errorService(error);
        }
        finally {
            this.setState({ loadingControl: false });
        }
    };
}

export default inject("authStore", "appStore", "propsStore")(observer(HomeScreen));
