import axios from "./Axios";

export default class RoomsApi {
    public static async getRooms() {
        return await axios.get("/rooms");
    }

}
