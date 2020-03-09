export default class Room {
    id: number = 0;
    name: string = "";
    userId: number = 0;
    constructor(options?: { id: number; name: string; userId: number }) {
        this.id = options?.id || 0;
        this.name = options?.name || "";
        this.userId = options?.userId || 0;
    }
}
