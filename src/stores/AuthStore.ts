import { observable, action } from "mobx";

export default class AuthStore {
    @observable
    id: number = 0;
    @observable
    token: string = "";
    @observable
    email: string = "";
    @observable
    tokenExpired: Date = new Date();
    @observable
    privilegeId: number = 0;
    @observable
    firstname: string = "";
    @observable
    lastname: string = "";
    @observable
    city: string = "";
    @observable
    age: number = 0;

    @action setToken(token: string) {
        this.token = token;
    }

    @action setTokenExpired(tokenExpired: Date) {
        this.tokenExpired = tokenExpired;
    }

    @action setEmail(email: string) {
        this.email = email;
    }

    @action setPrivilegeId(privilegeId: number) {
        this.privilegeId = privilegeId;
    }

    @action setAge(age: number) {
        this.age = age;
    }

    @action setCity(city: string) {
        this.city = city;
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

    @action clearUser() {
        this.firstname = "";
        this.lastname = "";
        this.age = 0;
        this.city = "";
        this.email = "";
        this.token = "";
        this.tokenExpired = new Date();
        this.privilegeId = 0;
        this.id = 0;
    }
}
