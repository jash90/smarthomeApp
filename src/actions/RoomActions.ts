import Stores from "../stores/mobxStores";
import { Control, Room } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import RoomApi from "../api/RoomApi";

export default class RoomActions {
    public static async changeControl(index: number, room: Room) {
        try {
            const response = await RoomApi.updateRoom(room);
            room = response.data;
            Stores.appStore.setRoom(index, room);
        } catch (error) {
            console.log(error);
        }
    }

    public static async saveRoom(room: Room) {
        try {
            const response = await RoomApi.createRoom(room);
            let rooms = Stores.appStore.rooms;
            rooms.push(response.data);
            Stores.appStore.setRooms(rooms);
        } catch (error) {
            console.log(error);
        }
    }

    public static async removeRoom(id: number) {
        try {
            const response = await RoomApi.removeRoom(id);
            const index = Stores.appStore.rooms.findIndex(
                (c: any) => c.id == id
            );
            Stores.appStore.rooms.splice(index, 1);
        } catch (error) {
            console.log(error);
        }
    }
}
