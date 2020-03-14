import { Group } from ".";
import { observable } from "mobx";

export default class Type {
    @observable
    id: number = 0;

    @observable
    icon: string = "";
    
    @observable
    name: string = "";
    
    @observable
    values: any = null;
    
    @observable
    group: Group = Group.switch;
    
    @observable
    min?: number = 0;
    
    @observable
    max?: number = 0;

    @observable
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
