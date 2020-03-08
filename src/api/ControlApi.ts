import axios from "./Axios";
import { Control } from "../stores/models";

export default class ControlApi {
    public static async getControls() {
        return await axios.get("/controls");
    }

    public static async updateControl(control: Control) {
        return await axios.put(`/controls/${control.id}`, control);
    }
}
