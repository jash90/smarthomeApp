import styled from "styled-components/native";

import Color from "../Color";

import Icon from "react-native-vector-icons/MaterialIcons";

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Color.primaryColor};
    margin: 20px;
`;

const Jumbotron = styled.View`
    justify-content: flex-end;
    width: 100%;
    /* background-color: white;
    border-style: solid;
    border-width: 1px;
    border-radius: 20px; */
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: white;
    align-self:center;
    padding-top:60px;
`;


const LightTitle = styled(Title)`
    font-weight:normal;
`;


const Content = styled.Text`
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 10px 0px;
`;

export const Button = styled.TouchableOpacity({
    backgroundColor:"#282C3A",
    borderRadius:15,
    alignSelf:"center",
    justifyContent:"center",
    width: "90%",
    height:50
});

export const ButtonText = styled.Text({
    fontSize:14,
    alignSelf:"center",
    color:"#d0dbe6"
});

const AccentButton = styled.TouchableOpacity({
    width: 100
});

const AccentButtonText = styled.Text({
    fontWeight: "bold",
    fontSize: 20
});

const MyIcon = styled(Icon)({
});