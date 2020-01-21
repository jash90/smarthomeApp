import axios from "../Axios";
export default class AuthApi {
    public static async login(email: string, password: string) {
        return await axios.post("/login", {
            email: email,
            password: password
        });
    }
    public static async register(
        email: string,
        password: string,
        firstname: string,
        lastname: string
    ) {
        return await axios.post("/register", {
            email,
            password,
            firstname,
            lastname
        });
    }
    public static async changePrivilege(userId: number, privilegeId: number) {
        return await axios.post("/changePrivilege", {
            userId,
            privilegeId
        });
    }
    public static async changePassword(userId: number, password: string) {
        return await axios.post("/changePassword", {
            userId,
            password
        });
    }
    public static async logout() {
        return await axios.get("/logout");
    }
}
