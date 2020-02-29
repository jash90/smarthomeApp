import {
    NavigationActions,
    NavigationContainerComponent,
    StackActions
} from "react-navigation";
import { Navigators } from "./navigators/Enum";
import Scenes from "./Scenes";

export default class NavigationService {
    static navigator: NavigationContainerComponent | any;

    public static setTopLevelNavigator(
        navigatorRef: NavigationContainerComponent
    ) {
        this.navigator = navigatorRef;
    }

    public static navigate(
        routeName: Scenes | Navigators,
        params: any | null = null
    ) {
        console.log(
            `[Navigation]: routename: ${routeName} params: ${String(params)}`
        );
        this.navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        );
    }

    public static goBack() {
        console.log(`[Navigation]: back`);
        this.navigator.dispatch(NavigationActions.back());
    }

    public static reset(routeName: Scenes | Navigators) {
        console.log(`[Navigation]: RESET routename: ${routeName}`);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.navigator.dispatch(resetAction);
    }
}
