import { Control } from ".";

export default class Room {
    id: number = 0;
    name: string = "";
    userId: number = 0;
    controls: Control[] = [];

    constructor(name: string = "", userId?: number, controls?: Control[], id?: number) {
        this.id = id || 0;
        this.name = name;
        this.userId = userId || 0;
        this.controls = controls || [];
    }
}
