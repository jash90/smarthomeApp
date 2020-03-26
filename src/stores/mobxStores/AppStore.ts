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

    @action updateControl(control: Control) {
        let oldcontrol = this.controls.find(c => c.id === control.id);
        oldcontrol = control;
    }

    @action addControl(control: Control) {
        this.controls.push(control);
    }

    @action setRoom(room: Room) {
        let oldroom = this.rooms.find(r => r.id === room.id);
        if (oldroom)
            oldroom.name = room.name;
    }

    @action setRooms(rooms: Room[]) {
        this.rooms = [];
        this.rooms = rooms;
    }

    @action setTypes(types: Type[]) {
        this.types = types;
    }
}
