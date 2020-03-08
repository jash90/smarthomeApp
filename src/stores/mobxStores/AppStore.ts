import { action, observable } from "mobx";
import { Room, Control, Type } from "../models";
export default class AppStore {
    @observable
    rememberEmail: boolean = false;

    @observable
    savedEmail: string = "";

    @observable
    firstOpen: boolean = true;

    @observable
    logged: boolean = false;

    @observable
    rooms: Room[] = [];

    @observable
    controls: Control[] = [];

    @observable
    types: Type[] = [];

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

    @action setRooms(rooms: Room[]) {
        this.rooms = rooms;
    }

    @action setTypes(types: Type[]) {
        this.types = types;
    }
}
