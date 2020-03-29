import styled from "styled-components/native";
import { FlatList } from "react-native";
import React from "react";
import Color from "../config/Color";

export const SeparatorWidth = styled.View({
    width: 15
});

export const SeparatorHeight = styled.View({
    height: 15
});

export const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${Color.textColor};
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
    margin-bottom: 10px;
`;

export const H1 = styled.Text`
    color: ${Color.textColor};
    font-size: 26px;
    font-weight: bold;
    padding: 10px 0;
`;

export const H2 = styled(H1)`
    font-size: 24px;
`;

export const H3 = styled(H1)`
    font-size: 22px;
`;

export const H4 = styled(H1)`
    font-size: 20px;
`;

export const Button = styled.TouchableOpacity({
    flexDirection: "row",
    backgroundColor: Color.secondaryColor,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    marginVertical: 10
});

export const ButtonText = styled.Text({
    fontSize: 16,
    alignSelf: "center",
    color: Color.primaryColor
});

export const FlatButton = styled.TouchableOpacity({
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    height: 50
});

export const RoomView = styled.View({
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: Color.accentColor,
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingBottom: 10
});

export const RoomText = styled(H4)({
    padding: 0
});

export const ControlView = styled(RoomView)({
    backgroundColor: Color.secondaryColor,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
});

export const ControlText = styled(H4)({
    color: Color.primaryColor,
    padding: 0
});

export const Input = styled.TextInput({
    width: "100%",
    height: 40,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: Color.primaryColor + "20",
    paddingHorizontal: 15,
    color: Color.textColor,
    fontSize: 18,
    marginVertical: 10
});

Input.defaultProps = {
    autoCapitalize: "none",
    placeholderTextColor: Color.primaryColor
};

export const FlatText = styled(H4)({
    padding: 0
});

export const SaveContainer = styled.View({
    width: 70,
    height: 30,
    backgroundColor: "transparent",
    borderRadius: 20,
    borderColor: Color.primaryColor,
    borderWidth: 1,
    justifyContent: "center"
});

export const SaveText = styled.Text({
    color: Color.primaryColor,
    fontSize: 12,
    alignSelf: "center"
});

export const VerticalList = styled(FlatList).attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    keyExtractor: (item: any) => String(item.id),
    ItemSeparatorComponent: () => <SeparatorHeight />,
})`
    margin-right: -15px;
`;

export const HorizontalList = styled(VerticalList).attrs({
    horizontal: true,
    ItemSeparatorComponent: () => <SeparatorWidth />,
    contentContainerStyle: {
        paddingHorizontal: 20,
    }
})`
    flex-grow: 0;
    margin: 0px -20px;
`;

