import { Control } from ".";
import { observable } from "mobx";

export default class Room {
    @observable
    id: number = 0;

    @observable
    name: string = "";

    @observable
    userId: number = 0;

    constructor(name: string = "", userId?: number, id?: number) {
        this.id = id || 0;
        this.name = name;
        this.userId = userId || 0;
    }
}
