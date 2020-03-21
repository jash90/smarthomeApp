import Stores from "../stores/mobxStores";
import { Control, Room } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import RoomApi from "../api/RoomApi";
import ErrorUtil from "../api/ErrorUtil";

export default class RoomActions {
    public static async changeControl(index: number, room: Room) {
        try {
            const response = await RoomApi.updateRoom(room);
            if (response.data.status == 200) {
                room = response.data;
            } else {
                ErrorUtil.errorService(response.data);
            }
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
