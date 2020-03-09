import {action, observable} from "mobx";
import {User} from "../models";

export default class AuthStore {
    @observable
    id: number = 0;

    @observable
    token: string = "";

    @observable
    email: string = "";

    @observable
    firstname: string = "";

    @observable
    lastname: string = "";

    @action setToken(token: string) {
        this.token = token;
    }

    @action setEmail(email: string) {
        this.email = email;
    }

    @action setFirstname(firstname: string) {
        this.firstname = firstname;
    }

    @action setLastname(lastname: string) {
        this.lastname = lastname;
    }

    @action setId(id: number) {
        this.id = id;
    }

    @action setUser(user: User) {
        this.firstname = this.firstname || user.firstname;
        this.lastname = this.lastname || user.lastname;
        this.email = this.email || user.email;
        this.token = this.token || user.token;
        this.id = this.id || user.id;
    }

    @action clearUser() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.token = "";
        this.id = 0;
    }
}
