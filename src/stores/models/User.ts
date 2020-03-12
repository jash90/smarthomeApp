export default class User {
    id: number = 0;
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    token: string = "";

    constructor(id: number = 0, firstname: string = "", lastname: string = "", email: string = "", token: string = "") {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.token = token;
    }
}
