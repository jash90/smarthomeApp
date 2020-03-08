import axios from "axios";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import AsyncStore from "../stores/asyncStore/index";
import Stores from "../stores/mobxStores";
import { User, Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Deserialize, Clazz, Serialize } from "../serialize";

export default class ControlActions {
    public static async changeControl(id: number, value: any) {
        try {
            let controls: Control[] = await Stores.appStore.controls;
            const index = controls.findIndex(control => control.id == id);
            let control = JSON.parse(JSON.stringify(controls[index]));
            control.value = value;
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.updateControl(control);
            control = response.data;
            await Serialize.this(Clazz.controls, control);
            Stores.appStore.controls[index].value = value;
        } catch (error) {
            console.log(error);
        }
    }
}
