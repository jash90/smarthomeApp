import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../components/SceneContainer";
import { ControlText, ControlView, H4, SeparatorHeight, Title, VerticalList } from '../components/StyledComponent';
import NavigationService from "../navigation/NavigationService";
import Stores from "../stores/mobxStores";
import PropsStore from "../stores/mobxStores/PropsStore";
import AuthStore from "../stores/mobxStores/AuthStore";
import TypeActions from "../actions/TypeActions";
import ControlSlider from "../components/ControlSlider";
import ControlSwitch from "../components/ControlSwitch";
import { Group, Room } from "../stores/models";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { NoItems } from "../components/NoItems";
import Screens from "../navigation/Scenes";
import { AddTitle } from "../components/AddTitle";

interface Props {
    authStore: AuthStore;
    propsStore: PropsStore;
}

interface State {
    loadingControl: boolean;
}

class RoomScreen extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loadingControl: false,
        };
    }

    render() {
        return (
            <ScreenContainer onBackPress={this.onBack} icon={"square-edit-outline"} onRightPress={this.onEdit}>
                <Title>{this.props.propsStore.room.name}</Title>
                <AddTitle onAddPress={this.onAddControl}>
                    {"Controls"}
                </AddTitle>
                <VerticalList
                    data={Stores.appStore.controls.filter(c => c.roomId == this.props.propsStore.room.id)}
                    extraData={Stores.propsStore.control}
                    ListEmptyComponent={this.renderEmpty}
                    renderItem={(item: any) => {
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

    onAddControl = () => {
        Stores.propsStore.control.roomId = Stores.propsStore.room.id;
        NavigationService.navigate(Screens.AddControlScreen);
    };

    onBack = () => {
        Stores.propsStore.setRoom(new Room());
        NavigationService.goBack();
    };

    onEdit = () => {
        NavigationService.navigate(Screens.AddRoomScreen);
    };
}

export default inject("authStore", "propsStore")(observer(RoomScreen));
