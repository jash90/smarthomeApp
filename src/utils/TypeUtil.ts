export default class TypeUtil {
    public static stringifyValue(value: any) {
        if (value == undefined) return value;

        if (String(value) === "true") {
            value = "ON";
        }
        if (String(value) === "false") {
            value = "OFF";
        }
        return value;
    }

    public static parseValues(value: any) {
        if (value == undefined) return value;

        if (value === "ON") {
            value = true;
        }
        if (value === "OFF") {
            value = false;
        }
        return value;
    }
}
