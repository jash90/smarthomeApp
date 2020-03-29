import React from "react";
import { ButtonText, H4 } from "./StyledComponent";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import Color from "../config/Color";

interface Props {
    children: string;
    onAddPress: any;
}

export const AddTitle: React.FC<Props> = ({ children, onAddPress }: Props) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <H4>{children}</H4>
            <TouchableOpacity onPress={onAddPress}>
                <H4
                    style={{
                        color: Color.accentColor,
                        fontSize: 24,
                        marginHorizontal: 5
                    }}
                >
                    +
                </H4>
            </TouchableOpacity>
        </View>
    )
};
