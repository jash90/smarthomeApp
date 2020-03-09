import React, {Component} from "react";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {ControlText, ControlView} from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ControlActions from "../actions/ControlActions";
import TypeActions from "../actions/TypeActions";
import NavigationService from "../navigation/NavigationService";
import Scenes from "../navigation/Scenes";
import {Control} from "../stores/models";
import {toJS} from "mobx";
import Stores from "../stores/mobxStores";

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
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity
                            onPress={this.onPress}
                            style={{flex: 1, flexDirection: "row"}}
                    >
                        <ControlView>
                            {this.state.loading ? (
                                    <ActivityIndicator size={40} color={"#D0DBE8"}/>
                            ) : (
                                    <Icon
                                            name={
                                                TypeActions.getIcon(
                                                        this.props.item.item.id
                                                ) || ""
                                            }
                                            size={40}
                                            color={
                                                this.props.item.item.value
                                                        ? "#FF7500"
                                                        : "#D0DBE8"
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
                                            ? "#FF7500"
                                            : "#D0DBE8"
                                }}
                        >
                            {this.props.item.item.name}
                        </ControlText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onEdit} style={{width: 40}}>
                        <Icon
                                style={{paddingTop: 6}}
                                name={"square-edit-outline"}
                                size={34}
                                color={"#D0DBE8"}
                        />
                    </TouchableOpacity>
                </View>
        );
    }

    onPress = async () => {
        this.setState({loading: true});
        let {index, item} = this.props.item;
        let control = item;
        control.value = !item.value;
        await ControlActions.changeControl(index, control);
        this.setState({loading: false});
    };

    onEdit = async () => {
        let control: Control = toJS(this.props.item.item);
        await Stores.propsStore.setControl(control);
        await NavigationService.navigate(Scenes.AddControl);
    };
}
