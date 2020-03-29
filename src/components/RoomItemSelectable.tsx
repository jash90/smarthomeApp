import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ControlView } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    onPress: any;
    name: string;
    available: boolean;
}

export const RoomItemSelectable: React.FC<Props> = ({ onPress, available, name }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{ flexDirection: "row" }}>
                <ControlView>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: 14,
                            color: available ? "#FF7500" : "#D0DBE8",
                            padding: 10
                        }}
                    >
                        {name}
                    </Text>
                </ControlView>
            </View>
        </TouchableOpacity>
    )
};
