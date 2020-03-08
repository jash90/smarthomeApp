import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import {
    ControlView,
    ControlText,
    H4,
    SeparatorHeight,
    Title
} from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";

class Room extends Component {
    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <Title>Kitchen</Title>
                <H4>Controls</H4>
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
                                <ControlView>
                                    <Icon
                                        name={item.icon}
                                        size={40}
                                        color="#D0DBE8"
                                    />
                                </ControlView>
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
}
export default inject("authStore", "propsStore")(observer(Room));
