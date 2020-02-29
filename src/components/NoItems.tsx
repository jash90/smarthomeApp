import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { H1 } from "./StyledComponent";

const Text = styled(H1)`
    text-align: center;
`;

const Container = styled.View`
    width: 100%;
`;

export const NoItems: React.FC = () => {
    return (
        <Container>
            <Text> No items</Text>
        </Container>
    );
};
