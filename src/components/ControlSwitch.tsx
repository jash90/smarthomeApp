import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ControlText, ControlView } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ControlActions from "../actions/ControlActions";
import TypeActions from "../actions/TypeActions";
import NavigationService from "../navigation/NavigationService";
import Screens from "../navigation/Scenes";
import { Control } from "../stores/models";
import { toJS } from "mobx";
import Stores from "../stores/mobxStores";
import Color from "../config/Color";

interface Props {
    item: any;
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{ flex: 1, flexDirection: "row" }}
                >
                    <ControlView>
                        {this.state.loading ? (
                            <ActivityIndicator size={40} color={Color.primaryColor} />
                        ) : (
                                <Icon
                                    name={
                                        TypeActions.getIcon(
                                            this.props.item.item.typeId
                                        ) || ""
                                    }
                                    size={40}
                                    color={
                                        this.props.item.item.value
                                            ? Color.accentColor
                                            : Color.primaryColor
                                    }
                                />
                            )}
                    </ControlView>
                    <ControlText
                        style={{
                            flex: 1,
                            alignSelf: "center",
                            marginLeft: 20,
                            color: this.props.item.item.value
                                ? Color.accentColor
                                : Color.primaryColor
                        }}
                    >
                        {this.props.item.item.name}
                    </ControlText>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onEdit} style={{ width: 40 }}>
                    <Icon
                        style={{ paddingTop: 6 }}
                        name={"square-edit-outline"}
                        size={34}
                        color={Color.primaryColor}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    onPress = async () => {
        this.setState({ loading: true });
        let { item } = this.props.item;
        let { name, value, typeId, roomId, id, userId } = item;
        let control = new Control(name, !value, typeId, userId, roomId, id);
        await ControlActions.changeControl(toJS(control));
        this.setState({ loading: false });
    };

    onEdit = async () => {
        let control: Control = toJS(this.props.item.item);
        await Stores.propsStore.setControl(control);
        await NavigationService.navigate(Screens.AddControlScreen);
    };
}
