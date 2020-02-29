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
            rooms: [
                { value: false },
                { value: false },
                { value: true },
                { value: false },
                { value: false },
                { value: false },
                { value: false }
            ],
            loadingControl: true,
            loadingRoom: false
        };
    }

    componentWillMount = () => {
        this.setState({ loadingControl: true });

        const controls = [
            { icon: "lightbulb", text: "Lamp 2", value: false },
            { icon: "power-plug", text: "Plug", value: true },
            { icon: "door", text: "Door", value: true },
            { icon: "garage", text: "Garage", value: false },
            { icon: "water-pump", text: "Garden", value: true },
            {
                icon: "oil-temperature",
                text: "Temperature",
                value: false
            }
        ];
        setTimeout(
            () => this.setState({ controls, loadingControl: false }),
            5000
        );
    };

    renderSeparator = () => {
        return <SeparatorHeight />;
    };

    renderEmpty = () => {
        if (this.state.loadingControl) {
            return (
                <View>
                    <ActivityIndicator />
                    <Text>Loading</Text>
                </View>
            );
        }
        return (
            <View>
                <Text> No items</Text>
            </View>
        );
    };

    render() {
        return (
            <ScreenContainer icon="account" onRightPress={this.onProfile}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>{`Mr. ${Store.authStore.firstname}`}</PersonText>
                <TouchableOpacity onPress={this.onProfile}>
                    <H1>Flat 1</H1>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <H2>Rooms</H2>
                    <TouchableOpacity onPress={this.onAdd}>
                        <H2
                            style={{
                                color: "orange",
                                fontSize: 24,
                                marginHorizontal: 5
                            }}>
                            +
                        </H2>
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
                        paddingRight: 20
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
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
                    <H2>Controls</H2>
                    <TouchableOpacity onPress={this.onAdd}>
                        <H2
                            style={{
                                color: "orange",
                                fontSize: 24,
                                marginHorizontal: 5
                            }}>
                            +
                        </H2>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.controls}
                    keyExtractor={item => String(item)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={item => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.changeValue(item)}>
                                <View style={{ flexDirection: "row" }}>
                                    <Control>
                                        <Icon
                                            name={item.item.icon}
                                            size={40}
                                            color={
                                                item.item.value
                                                    ? "#FF7500"
                                                    : "#D0DBE8"
                                            }
                                        />
                                    </Control>
                                    <ControlText
                                        style={{
                                            marginLeft: 20,
                                            color: item.item.value
                                                ? "#FF7500"
                                                : "#D0DBE8"
                                        }}>
                                        {item.item.text}
                                    </ControlText>
                                </View>
                            </TouchableOpacity>
                        );
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
        NavigationService.navigate(Scenes.Add);
    };

    changeValue = (item: any) => {
        const { controls } = this.state;
        controls[item.index].value = !item.item.value;
        this.setState({ controls });
    };
}
export default inject("authStore", "propsStore")(observer(Home));
