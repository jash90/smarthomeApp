import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import Color from "../config/Color";

const ContainerNotification = styled.View({
    width: "100%",
    height: 40,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginTop: 10
});

export interface NotificationBarProps {
    onBackPress?: () => void;
    onRightPress?: () => void;
    icon?: string;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({
    onBackPress,
    onRightPress,
    icon
}) => {
    return (
        <ContainerNotification>
            <TouchableOpacity style={{ padding: 5 }} onPress={onBackPress}>
                {onBackPress && (
                    <Icon name="arrow-left" size={35} color={Color.textColor} />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                onPress={onRightPress}
            >
                {onRightPress && !icon && (
                    <Icon name={"content-save"} size={35} color={Color.textColor} />
                )}
                {icon && <Icon name={`${icon}`} size={35} color={Color.textColor} />}
            </TouchableOpacity>
        </ContainerNotification>
    );
};
