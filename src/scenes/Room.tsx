import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import { ControlText, ControlView, H4, SeparatorHeight, Title } from "../components/StyledComponent";
import NavigationService from "../navigation/NavigationService";
import Stores from "../stores/mobxStores";
import PropsStore from "../stores/mobxStores/PropsStore";
import AuthStore from "../stores/mobxStores/AuthStore";
import TypeActions from "../actions/TypeActions";
import ControlSlider from "../components/ControlSlider";
import ControlSwitch from "../components/ControlSwitch";
import { Group } from "../stores/models";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { NoItems } from "../components/NoItems";
import Scenes from "../navigation/Scenes";

interface Props {
    authStore: AuthStore;
    propsStore: PropsStore;
}

interface State {
    loadingControl: boolean;
}

class Room extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loadingControl: false,
        };
    }

    render() {
        return (
            <ScreenContainer onBackPress={this.onBack}>
                <Title>{this.props.propsStore.room?.name}</Title>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <H4>Controls</H4>
                    <TouchableOpacity onPress={this.onAddRoom}>
                        <H4
                            style={{
                                color: "orange",
                                fontSize: 24,
                                marginHorizontal: 5
                            }}
                        >
                            +
                            </H4>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.propsStore.room.controls}
                    keyExtractor={(item: any) => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={item => {
                        if (TypeActions.getGroup(item.item.typeId) == Group.slider) {
                            return <ControlSlider item={item} />;
                        } else {
                            return <ControlSwitch item={item} />;
                        }
                    }}
                />
            </ScreenContainer>
        );
    }


    renderSeparator = () => {
        return <SeparatorHeight />;
    };

    renderEmpty = () => {
        if (this.state.loadingControl) {
            return <LoadingIndicator />;
        }
        return <NoItems />;
    };

    onAddRoom = () => {
        NavigationService.navigate(Scenes.AddRoom);
    };

    onBack = () => {
        NavigationService.goBack();
    };
}

export default inject("authStore", "propsStore")(observer(Room));
