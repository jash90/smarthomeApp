import axios from "./Axios";
import { Room } from "../stores/models";

export default class RoomApi {
    public static async getRooms() {
        return await axios.get("/rooms");
    }

    public static async updateRoom(room: Room) {
        return await axios.put(`/rooms/${room.id}`, room);
    }

    public static async createRoom(room: Room) {
        return await axios.post(`/rooms`, room);
    }

    public static async removeRoom(id: number) {
        return await axios.delete(`/rooms/${id}`);
    }
}