import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { Control, ControlText } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "underscore";
import Stores from "../stores/mobxStores";
import ControlActions from "../actions/ControlActions";
import TypeActions from "../actions/TypeActions";
import { Type, Control as Con } from "../stores/models";

interface Props {
    item: Con;
}
interface State {
    loading: boolean;
}

export default class ControlSwitch extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{ flexDirection: "row" }}>
                    <Control>
                        {this.state.loading ? (
                            <ActivityIndicator size={40} color={"#D0DBE8"} />
                        ) : (
                            <Icon
                                name={
                                    TypeActions.getIcon(this.props.item.id) ||
                                    ""
                                }
                                size={40}
                                color={
                                    this.props.item.value
                                        ? "#FF7500"
                                        : "#D0DBE8"
                                }
                            />
                        )}
                    </Control>
                    <ControlText
                        style={{
                            alignSelf: "center",
                            marginLeft: 20,
                            color: this.props.item.value ? "#FF7500" : "#D0DBE8"
                        }}>
                        {this.props.item.name}
                    </ControlText>
                </View>
            </TouchableOpacity>
        );
    }
    onPress = async () => {
        this.setState({ loading: true });
        await ControlActions.changeControl(
            this.props.item.id,
            !this.props.item.value
        );
        this.setState({ loading: false });
    };
}
