import React from "react";
import { ButtonText } from "./StyledComponent";
import { ActivityIndicator, View } from "react-native";
import Color from "../config/Color";

interface Props {
    children: string;
    loading: boolean;
}

export const LoadingText: React.FC<Props> = ({ children, loading }: Props) => {
    return (
        <>
            {loading &&
                (<ActivityIndicator
                    size={"small"}
                    color={Color.primaryColor}
                    style={{ marginRight: 10 }}
                />)
            }
            <ButtonText>{children}</ButtonText>
        </>
    )
};
