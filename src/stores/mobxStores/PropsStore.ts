import { action, observable } from "mobx";
import Scenes from "../../navigation/Scenes";

export default class PropsStore {
    @observable
    code: string = "";
    @observable
    routeName: Scenes = Scenes.Home;

    @action setCode(code: string) {
        this.code = code;
    }

    @action setRouteName(routeName: Scenes) {
        this.routeName = routeName;
    }
}
