import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ControlText, ControlView, H4 } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import TypeActions from "../actions/TypeActions";
import ControlActions from "../actions/ControlActions";
import { toJS } from "mobx";
import Stores from "../stores/mobxStores";
import { Control } from "../stores/models";
import Screens from "../navigation/Scenes";
import NavigationService from "../navigation/NavigationService";
import Color from "../config/Color";

interface Props {
    item: any;
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
                <ControlView>
                    <Icon
                        name={
                            TypeActions.getIcon(this.props.item.item.typeId) ||
                            ""
                        }
                        size={40}
                        color={Color.accentColor}
                    />
                </ControlView>

                <View
                    style={{
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "flex-start"
                    }}
                >
                    <ControlText
                        style={{
                            width: "100%",
                            alignSelf: "center",
                            color: Color.primaryColor,
                            textAlign: "center"
                        }}
                    >
                        {this.props.item.item.name}
                    </ControlText>

                    <View style={{ flexDirection: "row" }}>
                        {this.state.loading ? (
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator
                                    size={40}
                                    color={Color.accentColor}
                                />
                            </View>
                        ) : (
                                <Slider
                                    style={{ flex: 1, marginLeft: 20, height: 40 }}
                                    minimumValue={
                                        TypeActions.getMin(
                                            this.props.item.item.typeId
                                        ) || 0
                                    }
                                    maximumValue={
                                        TypeActions.getMax(
                                            this.props.item.item.typeId
                                        ) || 0
                                    }
                                    step={1}
                                    value={this.props.item.item.value}
                                    thumbTintColor={Color.accentColor}
                                    minimumTrackTintColor={Color.accentColor}
                                    maximumTrackTintColor={Color.primaryColor}
                                    onSlidingComplete={(value: any) =>
                                        this.onSlidingComplete(value)
                                    }
                                />
                            )}
                        <H4 style={{ marginHorizontal: 5 }}>
                            {this.props.item.item.value}
                        </H4>
                    </View>
                </View>
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

    onSlidingComplete = async (value: any) => {
        this.setState({ loading: true });
        let { item } = this.props.item;
        let { name, typeId, roomId, id, userId } = item;
        let control = new Control(name, value, typeId, userId, roomId, id);
        await ControlActions.changeControl(toJS(control));
        this.setState({ loading: false });
    };

    onEdit = async () => {
        let control: Control = toJS(this.props.item.item);
        await Stores.propsStore.setControl(control);
        await NavigationService.navigate(Screens.AddControlScreen);
    };
}
