import { NavigationActions, StackActions } from "react-navigation";
import {
    NavigationContainerComponent,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation";
import Scenes from "./Scenes";

export default class NavigationService {
    static navigator: NavigationContainerComponent | any;

    public static setTopLevelNavigator(
        navigatorRef: NavigationContainerComponent
    ) {
        this.navigator = navigatorRef;
    }

    public static navigate(routeName: Scenes, params: any | null = null) {
        this.navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        );
    }

    public static goBack() {
        this.navigator.dispatch(NavigationActions.back());
    }

    public static reset(routeName: Scenes) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.navigator.dispatch(resetAction);
    }
}
