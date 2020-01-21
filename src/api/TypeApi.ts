import axios from "../Axios";
export default class TypeApi {
    public static apiName = "type";
    public static async add(name: string) {
        return await axios.post(`/${this.apiName}/add`, {
            name
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(typeId: number) {
        return await axios.get(`/${this.apiName}/${typeId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(name: string, typeId: number) {
        return await axios.post(`/${this.apiName}/edit/`, {
            name,
            typeId
        });
    }
    public static async remove(typeId: number) {
        return await axios.delete(`/${this.apiName}/remove/${typeId}`);
    }
}
