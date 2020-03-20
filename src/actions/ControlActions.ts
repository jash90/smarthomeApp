import Stores from "../stores/mobxStores";
import { Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import ErrorUtil from "../api/ErrorUtil";

export default class ControlActions {
    public static async changeControl(index: number, control: Control) {
        try {
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.updateControl(control);
            control = response.data;
            if (response.status === 200) {
                await Serialize.this(Clazz.controls, control);
                await Stores.appStore.setControl(index, control);
            } else {
                console.log(response);
                await ErrorUtil.errorService(response);
            }

        } catch (error) {
            console.log(error);
        }
    }

    public static async saveControl(value: any) {
        try {
            let control = value;
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.createControl(control);
            let controls = Stores.appStore.controls;
            controls.push(response.data);
            Deserialize.this(Clazz.controls, controls);
            Stores.appStore.setControls(controls);
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
