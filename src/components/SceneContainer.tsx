import React, { Props } from "react";
import { StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import Color from "../config/Color";
import { NotificationBar, NotificationBarProps } from "./NotificationBar";

const SafeView = styled.SafeAreaView`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    margin: 0px 20px 20px 20px;
`;

interface ScreenContainerProps extends Props<View>, NotificationBarProps {
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    onBackPress,
    onRightPress,
    icon
}: ScreenContainerProps) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Color.secondaryColor + "EE"
            }}
        >
            <StatusBar barStyle="light-content" backgroundColor={Color.secondaryColor} />
            <SafeView>
                <NotificationBar
                    icon={icon}
                    onBackPress={onBackPress}
                    onRightPress={onRightPress}
                />
                <Container>{children}</Container>
            </SafeView>
        </View>
    );
};
