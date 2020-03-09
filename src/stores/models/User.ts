export default class User {
    id: number = 0;
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    token: string = "";

    constructor(options?: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        token: string;
    }) {
        this.id = options?.id || 0;
        this.firstname = options?.firstname || "";
        this.lastname = options?.lastname || "";
        this.email = options?.email || "";
        this.token = options?.token || "";
    }
}
