import { observable } from "mobx";

export default class User {
    @observable
    id: number = 0;

    @observable
    firstname: string = "";
    
    @observable
    lastname: string = "";
    
    @observable
    email: string = "";
    
    @observable
    token: string = "";

    constructor(id: number = 0, firstname: string = "", lastname: string = "", email: string = "", token: string = "") {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.token = token;
    }
}
