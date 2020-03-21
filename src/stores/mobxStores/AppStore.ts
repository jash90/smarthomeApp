import { action, observable, IObservableArray } from "mobx";
import { Control, Room, Type } from "../models";

export default class AppStore {
    @observable
    rememberEmail: boolean = false;

    @observable
    savedEmail: string = "";

    @observable
    firstOpen: boolean = true;

    @observable
    logged: boolean = false;

    rooms: Room[] = observable([]);

    controls: Control[] = observable([]);

    types: Type[] = observable([]);

    @action setRememberEmail(rememberEmail: boolean) {
        this.rememberEmail = rememberEmail;
    }

    @action setSavedEmail(savedEmail: string) {
        this.savedEmail = savedEmail;
    }

    @action setFirstOpen(firstOpen: boolean) {
        this.firstOpen = firstOpen;
    }

    @action setLogged(logged: boolean) {
        this.logged = logged;
    }

    @action setControls(controls: Control[]) {
        this.controls = controls;
    }

    @action updateControl(index: number, control: Control) {
        this.controls[index] = control;
    }

    @action addControl(control: Control) {
        this.controls.push(control);
    }

    @action setRoom(index: number, room: Room) {
        this.rooms[index] = room;
    }

    @action setRooms(rooms: Room[]) {
        this.rooms = rooms;
    }

    @action setTypes(types: Type[]) {
        this.types = types;
    }
}
