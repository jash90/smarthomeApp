import { observable } from "mobx";

export default class Control {
    @observable
    id: number = 0;

    @observable
    name: string = "";

    @observable
    value: any = null;

    @observable
    typeId: number = 0;

    @observable
    userId: number = 0;

    @observable
    roomId: number = 0;

    constructor(name: string = "", value: any = "", typeId: number = 0, userId: number = 0, roomId: number = 0, id: number = 0) {
        this.id = id || 0;
        this.name = name
        this.value = value;
        this.typeId = typeId;
        this.userId = userId;
        this.roomId = roomId;
    }
}
