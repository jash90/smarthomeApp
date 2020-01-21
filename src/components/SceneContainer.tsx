import React from "react";
import Color from "../Color";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    background-color: ${Color.primaryColor};
    margin: 20px;
`;

const SafeView = styled.SafeAreaView`
    flex: 1;
    background-color: ${Color.primaryColor};
`;

export const ScreenContainer: React.FC = ({children}) => {
    return (
        <SafeView>
            <Container>
                {children}
            </Container>
        </SafeView>
    );
};
