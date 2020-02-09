import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
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
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

class Home extends Component {
    render() {
        return (
            <ScreenContainer icon="account" onRightPress={this.onProfile}>
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>{`Mr. ${Store.authStore.firstname}`}</PersonText>
                <H1>Flat 1</H1>
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
                    data={[1, 2, 3, 4]}
                    style={{ height: 140, flexGrow: 0 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item)}
                    ItemSeparatorComponent={() => <SeparatorWidth />}
                    renderItem={() => {
                        return (
                            <TouchableOpacity onPress={this.onRoom}>
                                <Room>
                                    <RoomText>Room</RoomText>
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
                    data={[
                        { icon: "lightbulb", text: "Lamp 2" },
                        { icon: "power-plug", text: "Plug" },
                        { icon: "door", text: "Door" },
                        { icon: "garage", text: "Garage" },
                        { icon: "water-pump", text: "Garden" },
                        { icon: "oil-temperature", text: "Temperature" }
                    ]}
                    keyExtractor={item => String(item)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <SeparatorHeight />}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: "row" }}>
                                <Control>
                                    <Icon
                                        name={item.icon}
                                        size={40}
                                        color="#D0DBE8"
                                    />
                                </Control>
                                <ControlText style={{ marginLeft: 20 }}>
                                    {item.text}
                                </ControlText>
                            </View>
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
}
export default inject("authStore", "propsStore")(observer(Home));
