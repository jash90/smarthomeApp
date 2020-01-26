import styled from "styled-components/native";

import Color from "../Color";

import Icon from "react-native-vector-icons/MaterialIcons";

export const SeparatorWidth = styled.View({
    width: 15
});

export const SeparatorHeight = styled.View({
    height: 15
});

export const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: white;
    align-self: center;
    padding-top: 10px;
`;

export const WelcomeText = styled(Title)`
    font-weight: normal;
    align-self: flex-start;
`;

export const PersonText = styled(WelcomeText)`
    margin-top: -20px;
    font-weight: bold;
`;

export const H1 = styled.Text`
    color: white;
    font-size: 26px;
    font-weight: bold;
`;

export const H2 = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 20px 0px;
`;

export const Button = styled.TouchableOpacity({
    backgroundColor: "#282C3A",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 50
});

export const ButtonText = styled.Text({
    fontSize: 16,
    alignSelf: "center",
    color: "#d0dbe6"
});

export const FlatButton = styled.TouchableOpacity({
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    width: "100%"
});

export const Room = styled.View({
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#FF7500",
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingBottom: 10
});

export const RoomText = styled(H2)({
    padding: 0
});

export const Control = styled(Room)({
    backgroundColor: "#282C3A",
    width: 70,
    height: 70,
    justifyContent:"center",
    alignItems:"center",
    padding:0
});

export const ControlText = styled(H2)({
    color: "#D0DBE8"
})

export const Input = styled.TextInput({
    width: "100%",
    height: 40,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#686B75",
    paddingHorizontal: 20,
    color: "white",
    fontSize: 18,
    marginVertical: 10
});
