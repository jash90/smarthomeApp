import { action, observable } from "mobx";
import Scenes from "../../navigation/Scenes";
import { Control, Room } from "../models";

export default class PropsStore {
    @observable
    control: Control | null = null;

    @observable
    room: Room | null = null;

    @action setControl(control: Control | null) {
        this.control = control;
    }

    @action setRoom(room: Room) {
        this.room = room;
    }
}
