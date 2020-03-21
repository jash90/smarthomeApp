import Stores from "../stores/mobxStores";
import { Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import ErrorUtil from "../api/ErrorUtil";

export default class ControlActions {
    public static async changeControl(index: number, control: Control) {
        try {
            let response: any = await ControlApi.updateControl(control);
            if (!response.statusCode) {
                Stores.appStore.updateControl(index, response.data);
            } else {
                ErrorUtil.errorService(response);
            }
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async saveControl(control: any) {
        try {
            await Deserialize.this(Clazz.controls, control);
            const response = await ControlApi.createControl(control);
            console.log(response);
            if (response?.status == 200) {
                await Serialize.this(Clazz.controls, response.data);
                Stores.appStore.addControl(response.data);
            } else {
                ErrorUtil.errorService(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async removeControl(id: number) {
        try {
            const response = await ControlApi.removeControl(id);
            if (response.status == 200) {
                const index = Stores.appStore.controls.findIndex(
                    (c: any) => c.id == id
                );
                Stores.appStore.controls.splice(index, 1);
            } else {
                ErrorUtil.errorService(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
