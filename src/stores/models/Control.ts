export default class Control {
    id: number = 0;
    name: string = "";
    value: any = null;
    typeId: number = 0;
    userId: number = 0;
    roomId: number = 0;

    constructor(options?: {
        id: number;
        name: string;
        value: any;
        typeId: number;
        userId: number;
        roomId: number;
    }) {
        this.id = options?.id || 0;
        this.name = options?.name || "";
        this.typeId = options?.typeId || 0;
        this.userId = options?.userId || 0;
        this.roomId = options?.roomId || 0;
    }
}
