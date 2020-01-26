import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Title,
    ButtonText,
    Button,
    WelcomeText,
    PersonText,
    H1,
    H2,
    Room,
    RoomText,
    Control,
    ControlText,
    SeparatorWidth,
    SeparatorHeight
} from "../components/StyledComponent";
import { View, FlatList, ScrollView } from "react-native";
import { Logo } from "../components/Logo";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Home extends Component {
    render() {
        return (
            <ScreenContainer icon="account">
                <WelcomeText>Hello,</WelcomeText>
                <PersonText>Mr. Karol</PersonText>
                <H1>Flat 1</H1>
                <H2>Rooms</H2>
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
                            <Room>
                                <RoomText>Room</RoomText>
                            </Room>
                        );
                    }}
                />
                <H2>Controls</H2>
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
}
export default inject("authStore", "propsStore")(observer(Home));
