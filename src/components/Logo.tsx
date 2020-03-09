import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ContainerLogo = styled.View({
    width: 200,
    height: 200,
    backgroundColor: "#282C3A",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
});

export const Logo: React.FC = () => {
    return (
            <ContainerLogo>
                <Icon name="home-assistant" size={100} color={"#FF7500"}/>
            </ContainerLogo>
    );
};
