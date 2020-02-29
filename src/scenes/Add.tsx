import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import {
    Control,
    ControlText,
    FlatText,
    H2,
    Input,
    SaveContainer,
    SaveText,
    SeparatorHeight,
    SeparatorWidth,
    Title
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Scenes from "../navigation/Scenes";

class Add extends Component {
    render() {
        return (
            <ScreenContainer
                onBackPress={this.onBack}
                onRightPress={this.onSave}>
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
                        renderItem={() => {
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
                    style={{ height: 120, paddingVertical: 10 }}
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
                    style={{ alignSelf: "flex-start" }}
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

    onBack = () => {
        NavigationService.goBack();
    };

    onSave = () => {
        NavigationService.navigate(Scenes.Home);
    };
}
export default inject("authStore", "propsStore")(observer(Add));
