import React, { Component } from "react";
import { State, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { Control, ControlText, H4 } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";

interface Props {
    icon: string;
    name: string;
    value: number;
    min: number;
    max: number;
    onValueChange?: any;
}

export default class ControlSlider extends Component<Props> {
    render() {
        return (
            <View style={{ flexDirection: "row", alignItems:"center" }}>
                <Control>
                    <Icon name={this.props.icon} size={40} color={"#D0DBE8"} />
                </Control>

                <View style={{flexDirection:"column", flex:1}}>
                    <ControlText
                        style={{
                           width:"100%",
                            alignSelf: "center",
                            color: "#D0DBE8",
                            textAlign:"center"
                        }}>
                        {this.props.name}
                    </ControlText>

                    <View style={{ flexDirection: "row" }}>
                        <Slider
                            style={{ flex: 1, height: 40 }}
                            minimumValue={this.props.min}
                            maximumValue={this.props.max}
                            step={1}
                            value={this.props.value}
                            thumbTintColor="#FF7500"
                            minimumTrackTintColor="#FF7500"
                            maximumTrackTintColor="#D0DBE8"
                            onValueChange={this.props.onValueChange}
                        />
                        <H4 style={{ marginHorizontal: 5 }}>
                            {this.props.value}
                        </H4>
                    </View>
                </View>
            </View>
        );
    }
}
