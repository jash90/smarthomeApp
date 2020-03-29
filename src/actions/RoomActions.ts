import Stores from "../stores/mobxStores";
import { Control, Room } from "../stores/models";
import ControlApi from "../api/ControlApi";
import { Clazz, Deserialize, Serialize } from "../serialize";
import RoomApi from "../api/RoomApi";
import ErrorUtil from "../api/ErrorUtil";
import Toast from "react-native-simple-toast";

export default class RoomActions {
    public static async changeControl(room: Room) {
        try {
            const response = await RoomApi.updateRoom(room);
            room = response.data;
            Stores.propsStore.setRoom(room);
            Stores.appStore.updateRoom(room);
            Toast.show(`Room ${room.name} updated.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async saveRoom(room: Room) {
        try {
            const response = await RoomApi.createRoom(room);
            Stores.appStore.addRoom(response.data);
            Toast.show(`Room ${response.data.name} added.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }

    public static async removeRoom(id: number) {
        try {
            const response = await RoomApi.removeRoom(id);
            Stores.appStore.removeRoom(response.data);
            Toast.show(`Room ${Stores.propsStore.room.name} removed.`);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }
}
