import { Group } from ".";

export default class Type {
    id: number = 0;
    icon: string = "";
    name: string = "";
    values: any = null;
    group: Group = Group.switch;
    min?: number = 0;
    max?: number = 0;
    userId?: number = 0;
    constructor(options?: {
        id: number;
        icon: string;
        name: string;
        values: any;
        group: Group;
        min?: number;
        max?: number;
        userId?: number;
    }) {
        this.id = options?.id || 0;
        this.name = options?.name || "";
        this.icon = options?.icon || "";
        this.values = options?.values || null;
        this.group = options?.group || Group.switch;
        this.min = options?.min || 0;
        this.max = options?.max || 0;
        this.userId = options?.userId || 0;
    }
}
