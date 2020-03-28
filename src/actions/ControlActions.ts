import Stores from "../stores/mobxStores";
import { Control } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import ErrorUtil from "../api/ErrorUtil";
import Toast from "react-native-simple-toast";

export default class ControlActions {
    public static async changeControl(oldcontrol: Control) {
        try {
            console.log({ oldcontrol });
            await Deserialize.this(Clazz.control, oldcontrol);
            console.log({ oldcontrol });
            let response: any = await ControlApi.updateControl(oldcontrol);
            const newcontrol: Control = response.data;
            await Serialize.this(Clazz.control, newcontrol);
            Stores.appStore.updateControl(response.data);
            Toast.show(`Control ${response.data.name} updated.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async saveControl(control: any) {
        try {
            await Deserialize.this(Clazz.control, control);
            const response = await ControlApi.createControl(control);
            await Serialize.this(Clazz.control, response.data);
            Stores.appStore.addControl(response.data);
            Toast.show(`Control ${response.data.name} added.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async removeControl(id: number) {
        try {
            const response = await ControlApi.removeControl(id);
            await Serialize.this(Clazz.control, response.data);
            Stores.appStore.removeControl(response.data);
            Toast.show(`Control ${Stores.propsStore.control.name} removed.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }
}
