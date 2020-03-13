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

    rooms: IObservableArray<Room> = observable([]);

    controls: IObservableArray<Control> = observable([]);

    types: IObservableArray<Type> = observable([]);

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
        this.controls.clear();
        this.controls.push(...controls);
    }

    @action setControl(index: number, control: Control) {
        let find = this.controls.find(c => c.id === control.id);
        find = control;
    }

    @action setRoom(index: number, room: Room) {
        this.rooms[index] = room;
    }

    @action setRooms(rooms: Room[]) {
        this.rooms.clear();
        this.rooms.push(...rooms);
    }

    @action setTypes(types: Type[]) {
        this.types.clear();
        this.types.push(...types);
    }
}
