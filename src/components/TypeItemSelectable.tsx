import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ControlView } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../config/Color";

interface Props {
    onPress: any;
    icon: string;
    available: boolean;
}

export const TypeItemSelectable: React.FC<Props> = ({ onPress, icon, available }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{ flexDirection: "row" }}>
                <ControlView>
                    <Icon
                        name={icon}
                        size={40}
                        color={available ? Color.accentColor : Color.primaryColor}
                    />
                </ControlView>
            </View>
        </TouchableOpacity>
    );
};
