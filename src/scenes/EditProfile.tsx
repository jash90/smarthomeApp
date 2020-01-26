import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ScreenContainer } from "../components/SceneContainer";


class EditProfile extends Component {
    render() {
        return (
            <ScreenContainer>
            </ScreenContainer>
        );
    }
}
export default inject("authStore", "propsStore")(observer(EditProfile));
