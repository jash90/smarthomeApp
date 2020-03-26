import Stores from "../stores/mobxStores";
import { Control, Room } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import RoomApi from "../api/RoomApi";
import ErrorUtil from "../api/ErrorUtil";
import Toast from "react-native-simple-toast";

export default class RoomActions {
    public static async changeControl(index: number, room: Room) {
        try {
            const response = await RoomApi.updateRoom(room);
            room = response.data;
            Stores.propsStore.setRoom(room);
            Stores.appStore.setRoom(room);
            Toast.show(`Room ${room.name} updated.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async saveRoom(room: Room) {
        try {
            const response = await RoomApi.createRoom(room);
            Stores.appStore.setRooms([response.data, ...Stores.appStore.rooms]);
            Toast.show(`Room ${response.data.name} added.`);
        } catch (error) {
            ErrorUtil.errorService(error);
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
            ErrorUtil.errorService(error);
        }
    }
}
