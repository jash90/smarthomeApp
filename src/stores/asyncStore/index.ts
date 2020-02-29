import AsyncStorage from "@react-native-community/async-storage";

export default class AsyncStore {
    public static async save(key: string, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log(`Save: key: ${key} value: ${value}`);
    }

    public static async load(key: string) {
        const item = await AsyncStorage.getItem(key);
        console.log(`Load: key: ${key} value: ${item}`);
        if (item !== null) return JSON.parse(item);
        return "";
    }

    public static async remove(key: string) {
        await AsyncStorage.removeItem(key);
        console.log(`Remove key: ${key}`);
    }
}
