import React from "react";
import styled from "styled-components/native";
import { H2 } from "./StyledComponent";

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const Indicator = styled.ActivityIndicator`
    margin-right: 10;
    height: 50px;
    align-items: center;
`;

export const LoadingIndicator: React.FC = () => {
    return (
        <Container>
            <Indicator />
            <H2>Loading...</H2>
        </Container>
    );
};
