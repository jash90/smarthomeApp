import React from "react";
import Color from "../Color";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
const Container = styled.View`
    flex: 1;
    margin: 20px;
`;

const SafeView = styled.SafeAreaView`
    flex: 1;
`;

export const ScreenContainer: React.FC = ({ children }) => {
    return (
        <LinearGradient
            colors={["#3D4151", "#1C202C", "#141824"]}
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
                flex: 1,
                backgroundColor: Color.primaryColor,
                padding: 20
            }}>
            <SafeView>{children}</SafeView>
        </LinearGradient>
    );
};
