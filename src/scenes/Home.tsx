import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {
    FlatList,
    Image,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView
} from "react-native";
import Color from "../Color";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";
import styled from "styled-components/native";
import { ScreenContainer } from "../components/SceneContainer";

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Color.primaryColor};
    margin: 20px;
`;

const Jumbotron = styled.View`
    justify-content: flex-end;
    width: 100%;
    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-radius: 20px;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    margin: 10px 0px;
`;

const Content = styled.Text`
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    margin: 10px 0px;
`;

class Home extends Component<{}, {}> {
    render() {
        return (
            <ScreenContainer>
                <Jumbotron>
                    <Title>Text App</Title>
                    <Text>
                        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                    </Text>
                </Jumbotron>
                <Content>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </Content>
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(Home));
