import { action, observable, IObservableArray, toJS } from "mobx";
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
        if (oldcontrol) {
            oldcontrol.id = control.id;
            oldcontrol.name = control.name;
            oldcontrol.value = control.value;
            oldcontrol.roomId = control.roomId;
            oldcontrol.typeId = control.typeId;
            oldcontrol.userId = control.userId;
        }
    }

    @action addControl(control: Control) {
        this.controls = [control, ...this.controls];
    }

    @action removeControl(control: Control) {
        const index = this.controls.findIndex(c => c.id === control.id)
        this.controls.splice(index, 1);
    }

    @action updateRoom(room: Room) {
        let oldroom = this.rooms.find(r => r.id === room.id);
        if (oldroom) {
            oldroom.id = room.id;
            oldroom.name = room.name;
            oldroom.userId = oldroom.userId;
        }
    }

    @action addRoom(room: Room) {
        this.rooms = [room, ...this.rooms];
    }

    @action removeRoom(room: Room) {
        const index = this.rooms.findIndex(r => r.id === room.id)
        this.rooms.splice(index, 1);
    }

    @action setRooms(rooms: Room[]) {
        this.rooms = [];
        this.rooms = rooms;
    }

    @action setTypes(types: Type[]) {
        this.types = types;
    }
}
