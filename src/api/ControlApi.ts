import axios from "./Axios";

export default class ControlApi {
    public static async getControls() {
        return await axios.get("/controls");
    }

}
