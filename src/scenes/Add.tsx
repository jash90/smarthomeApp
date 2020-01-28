import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ScreenContainer } from "../components/SceneContainer";
import { View, FlatList } from "react-native";
import {
    H1,
    Input,
    ButtonText,
    Button,
    Title,
    H2,
    SaveContainer,
    SaveText,
    SeparatorWidth,
    FlatText,
    SeparatorHeight,
    Control,
    ControlText
} from "../components/StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Add extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={true} onRightPress={true}>
                <Title>Flat 1</Title>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    <H2>Rooms</H2>
                    <SaveContainer>
                        <SaveText>Save</SaveText>
                    </SaveContainer>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Input
                        style={{ width: 100, alignSelf: "flex-start" }}
                        placeholder="Add new Room"
                        placeholderTextColor={"#D0DBE6"}
                    />
                    <FlatList
                        horizontal
                        style={{
                            paddingHorizontal: 20,
                            height: 25,
                            flexGrow: 0
                        }}
                        data={[1, 2, 3, 4, 5, 6]}
                        keyExtractor={item => String(item)}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <SeparatorWidth />}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <FlatText>Room 1</FlatText>
                                </>
                            );
                        }}
                    />
                </View>
                <Title>Room 1</Title>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    <H2>Controls</H2>
                    <SaveContainer>
                        <SaveText>Save</SaveText>
                    </SaveContainer>
                </View>
                <FlatList
                    horizontal
                    style={{ height: 110, paddingVertical: 10 }}
                    data={[
                        { icon: "lightbulb" },
                        { icon: "power-plug" },
                        { icon: "door" },
                        { icon: "garage" },
                        { icon: "water-pump" },
                        { icon: "oil-temperature" }
                    ]}
                    keyExtractor={item => String(item)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <SeparatorHeight />}
                    renderItem={({ item }) => {
                        return (
                            <Control>
                                <Icon
                                    name={item.icon}
                                    size={40}
                                    color="#D0DBE8"
                                />
                            </Control>
                        );
                    }}
                />
                  <Input
                        style={{alignSelf: "flex-start" }}
                        placeholder="Add Control"
                        placeholderTextColor={"#D0DBE6"}
                    />
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
                                <ControlText>{item.text}</ControlText>
                            </View>
                        );
                    }}
                />
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Add));
