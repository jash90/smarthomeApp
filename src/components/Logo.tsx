import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../config/Color";

const ContainerLogo = styled.View({
    width: 200,
    height: 200,
    backgroundColor: Color.secondaryColor,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
});

export const Logo: React.FC = () => {
    return (
        <ContainerLogo>
            <Icon name="home-assistant" size={100} color={Color.accentColor} />
        </ContainerLogo>
    );
};
