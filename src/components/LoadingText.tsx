import React from "react";
import { ButtonText } from "./StyledComponent";
import { ActivityIndicator, View } from "react-native";


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
                    color={"#d0dbe6"}
                    style={{ marginRight: 10 }}
                />)
            }
            <ButtonText>{children}</ButtonText>
        </>
    )
};
