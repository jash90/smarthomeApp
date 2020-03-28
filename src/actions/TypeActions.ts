import Stores from "../stores/mobxStores";
import TypeApi from "../api/TypeApi";
import { Serialize, Clazz } from "../serialize";

export default class TypeActions {
    public static getIcon(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.icon;
    }

    public static getMin(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.min;
    }

    public static getMax(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.max;
    }

    public static getGroup(id: number) {
        return Stores.appStore.types.find(type => type.id == id)?.group;
    }

    public static async dowloadTypes() {
        const response = await TypeApi.getTypes();
        const types = response.data;
        await Serialize.this(Clazz.type, types);
        Stores.appStore.setTypes(types);
    }
}
