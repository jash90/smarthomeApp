import React, { Component } from "react";
import { State, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { Control, ControlText } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    icon: string;
    name: string;
    value: boolean;
    onPress?: () => {};
}

export default class ControlSwitch extends Component<Props> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress}>
                <View style={{ flexDirection: "row" }}>
                    <Control>
                        <Icon
                            name={this.props.icon}
                            size={40}
                            color={this.props.value ? "#FF7500" : "#D0DBE8"}
                        />
                    </Control>
                    <ControlText
                        style={{
                            alignSelf:"center",
                            marginLeft: 20,
                            color: this.props.value ? "#FF7500" : "#D0DBE8"
                        }}>
                        {this.props.name}
                    </ControlText>
                </View>
            </TouchableOpacity>
        );
    }
}
