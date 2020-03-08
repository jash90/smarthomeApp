interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
}

interface Room {
    id: number;
    name: string;
    userId: number;
}

interface Control {
    id: number;
    name: string;
    value: any;
    typeId: number;
    userId?: string;
    roomId?: number | null;
}

interface Type {
    id: number;
    icon: string;
    name: string;
    values: any;
    group: Group;
    min?: number;
    max?: number;
    userId?: string;
}

enum Group {
    switch = "switch",
    slider = "slider"
}

export { User, Room, Control, Type, Group };
