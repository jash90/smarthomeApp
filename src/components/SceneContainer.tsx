import React, { Props } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import Color from "../utils/Color";
import { NotificationBar, NotificationBarProps } from "./NotificationBar";

const SafeView = styled.SafeAreaView`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    margin: 0 20px 20px 20px;
`;

interface ScreenContainerProps extends Props<View>, NotificationBarProps {}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    onBackPress,
    onRightPress,
    icon
}: ScreenContainerProps) => {
    return (
        <LinearGradient
            colors={["#3D4151", "#1C202C", "#141824"]}
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
                flex: 1,
                backgroundColor: Color.primaryColor
            }}>
            <SafeView>
                <NotificationBar
                    icon={icon}
                    onBackPress={onBackPress}
                    onRightPress={onRightPress}
                />
                <Container>{children}</Container>
            </SafeView>
        </LinearGradient>
    );
};
