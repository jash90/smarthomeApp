import Stores from "../stores/mobxStores";

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
}
