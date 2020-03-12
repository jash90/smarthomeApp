export default class Control {
    id: number = 0;
    name: string = "";
    value: any = null;
    typeId: number = 0;
    userId: number = 0;
    roomId: number = 0;

    constructor(name: string = "", value: any = "", typeId: number = 0, userId: number = 0, roomId: number = 0, id: number = 0) {
        this.id = id || 0;
        this.name = name
        this.typeId = typeId;
        this.userId = userId;
        this.roomId = roomId;
    }
}
