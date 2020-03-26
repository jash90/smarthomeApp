export default class StringUtil {
    public static capitalize(text: String) {
        return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    }
}