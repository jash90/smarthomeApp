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
        }
    }

    @action addControl(control: Control) {
        const controls: Control[] = [control, ...this.controls];
        this.controls = [];
        this.controls = controls;
    }

    @action removeControl(control: Control) {
        const index = this.controls.findIndex(c => c.id === control.id)
        const controls: Control[] = this.controls;
        controls.splice(index, 1);
        this.controls = [];
        this.controls = controls;
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
