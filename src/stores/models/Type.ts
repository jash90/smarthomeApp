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

    constructor(
        icon: string = "",
        name: string = "",
        values: any = "",
        group: Group = Group.switch,
        min?: number,
        max?: number,
        userId?: number,
        id?: number,
    ) {
        this.id = id || 0;
        this.name = name;
        this.icon = icon;
        this.values = values;
        this.group = group;
        this.min = min || 0;
        this.max = max || 0;
        this.userId = userId || 0;
    }
}
