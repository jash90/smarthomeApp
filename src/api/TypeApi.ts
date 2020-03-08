import axios from "./Axios";

export default class TypeApi {
    public static async getTypes() {
        return await axios.get("/types");
    }
}
