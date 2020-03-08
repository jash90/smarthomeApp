import axios from "axios";
import AsyncStoreKeys from "../stores/asyncStore/AsyncStoreKeys";
import AsyncStore from "../stores/asyncStore/index";
import Stores from "../stores/mobxStores";
import { User, Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Deserialize, Clazz, Serialize } from "../serialize";

export default class ControlActions {
    public static async changeControl(index: number, control: Control) {
        try {
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.updateControl(control);
            control = response.data;
            await Serialize.this(Clazz.controls, control);
            Stores.appStore.setControl(index, control);
        } catch (error) {
            console.log(error);
        }
    }

    public static async saveControl(value: any) {
        try {
            let control = value;
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.createControl(control);
            Stores.appStore.controls.push(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    public static async removeControl(id: number) {
        try {
            const response = await ControlApi.removeControl(id);
            const index = Stores.appStore.controls.findIndex(
                (c: any) => c.id == id
            );
            Stores.appStore.controls.splice(index, 1);
        } catch (error) {
            console.log(error);
        }
    }
}
