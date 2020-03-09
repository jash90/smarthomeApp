import { action, observable } from "mobx";
import Scenes from "../../navigation/Scenes";
import { Control, Room } from "../models";

export default class PropsStore {
    @observable
    control: Control = new Control();

    @observable
    room: Room = new Room();

    @action setControl(control: Control) {
        this.control = control;
    }

    @action setRoom(room: Room) {
        this.room = room;
    }
}
