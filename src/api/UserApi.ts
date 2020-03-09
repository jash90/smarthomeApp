import axios from "./Axios";

export default class LoanGameApi {
    public static apiName = "users";

    public static async edit(firstname: string, lastname: string) {
        return await axios.put(`/${this.apiName}/me`, {
            firstname,
            lastname
        });
    }

    public static async editPassword(password: string, repeatPassword: string) {
        return await axios.put(`/${this.apiName}/password`, {
            password,
            repeatPassword
        });
    }

    public static async get(userId: number) {
        return await axios.get(`/${this.apiName}/${userId}`);
    }

    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }

    public static async remove(userId: number) {
        return await axios.delete(`/${this.apiName}/remove/${userId}`);
    }

    public static async search(email: string) {
        return await axios.post(`/${this.apiName}/search`, {email});
    }
}
