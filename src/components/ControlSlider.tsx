import React, { Component } from "react";
import { State, TouchableOpacity } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { Control, ControlText, H4 } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import _ from "underscore";
import { Control as Con } from "../stores/models";
import TypeActions from "../actions/TypeActions";
import ControlActions from "../actions/ControlActions";

interface Props {
    item: Con;
}
interface State {
    loading: boolean;
}

export default class ControlSlider extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Control>
                    <Icon
                        name={TypeActions.getIcon(this.props.item.typeId) || ""}
                        size={40}
                        color={"#FF7500"}
                    />
                </Control>

                <View style={{ flexDirection: "column", flex: 1 }}>
                    <ControlText
                        style={{
                            width: "100%",
                            alignSelf: "center",
                            color: "#D0DBE8",
                            textAlign: "center"
                        }}>
                        {this.props.item.name}
                    </ControlText>

                    <View style={{ flexDirection: "row" }}>
                        {this.state.loading ? (
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator
                                    size={40}
                                    color={"#FF7500"}
                                />
                            </View>
                        ) : (
                            <Slider
                                style={{ flex: 1, height: 40 }}
                                minimumValue={
                                    TypeActions.getMin(
                                        this.props.item.typeId
                                    ) || 0
                                }
                                maximumValue={
                                    TypeActions.getMax(
                                        this.props.item.typeId
                                    ) || 0
                                }
                                step={1}
                                value={this.props.item.value}
                                thumbTintColor="#FF7500"
                                minimumTrackTintColor="#FF7500"
                                maximumTrackTintColor="#D0DBE8"
                                onSlidingComplete={(value: any) =>
                                    this.onSlidingComplete(value)
                                }
                            />
                        )}
                        <H4 style={{ marginHorizontal: 5 }}>
                            {this.props.item.value}
                        </H4>
                    </View>
                </View>
            </View>
        );
    }
    onSlidingComplete = async (value: any) => {
        this.setState({ loading: true });
        await ControlActions.changeControl(this.props.item.id, value);
        this.setState({ loading: false });
    };
}
