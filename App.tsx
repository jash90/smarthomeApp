import { Provider } from "mobx-react";
import React from "react";
import { NavigationContainerComponent } from "react-navigation";
import Interceptors from "./src/actions/InterceptorsActions";
import axios from "./src/api/Axios";
import NavigationService from "./src/navigation/NavigationService";
import { RootNavigator } from "./src/navigation/navigators/Navigators";
import store from "./src/stores/mobxStores";

export default class App extends React.Component {
    componentDidMount() {
        axios.interceptors.request.use(
            request => Interceptors.handleRequest(request),
            error => Interceptors.handleError(error)
        );
        axios.interceptors.response.use(
            response => Interceptors.handleResponse(response),
            error => Interceptors.handleError(error)
        );
    }

    render() {
        return (
            <Provider {...store}>
                <RootNavigator
                    ref={(navigatorRef: NavigationContainerComponent) => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}
