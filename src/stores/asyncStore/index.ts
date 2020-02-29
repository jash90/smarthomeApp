import AsyncStorage from "@react-native-community/async-storage";

export default class AsyncStore {
    public static async save(key: string, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log(`Save: key: ${key} value: ${value}`);
    }

    public static async load(key: string) {
        const item = await AsyncStorage.getItem(key);
        let value;
        item != null ? (value = JSON.parse(item)) : (value = "");
        console.log(`Save: key: ${key} value: ${value}`);
        return value;
    }

    public static async remove(key: string) {
        await AsyncStorage.removeItem(key);
        console.log(`Remove key: ${key}`);
    }
}
