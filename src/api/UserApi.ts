import axios from "../Axios";
export default class LoanGameApi {
    public static apiName = "user";
    public static async edit(
        firstname: string,
        lastname: string,
        city: string,
        age: number,
        userId: number
    ) {
        return await axios.post(`/${this.apiName}/edit`, {
            firstname,
            lastname,
            city,
            age,
            userId
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
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
        return await axios.post(`/${this.apiName}/search`, { email });
    }
}
