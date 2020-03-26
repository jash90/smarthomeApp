import Stores from "../stores/mobxStores";
import { Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import ErrorUtil from "../api/ErrorUtil";

export default class ControlActions {
    public static async changeControl(index: number, control: Control) {
        try {
            await Deserialize.this(Clazz.controls, control);
            let response: any = await ControlApi.updateControl(control);
            await Serialize.this(Clazz.controls, response.data);
            Stores.appStore.updateControl(response.data);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async saveControl(control: any) {
        try {
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.createControl(control);
            await Serialize.this(Clazz.controls, response.data);
            Stores.appStore.setControls(response.data);
        } catch (error) {
            ErrorUtil.errorService(error);
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
            ErrorUtil.errorService(error);
        }
    }
}
