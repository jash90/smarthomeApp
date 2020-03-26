import Config from "../config"
export default class Interceptors {
    public static handleRequest(request: any) {
        if (Config.log == "NONE")
            return;

        // console.group(
        //     `[Network]: Request ${String(request.method).toUpperCase()} => ${
        //     request.url
        //     }`
        // );
        // console.group(`headers:`);
        // console.log(request.headers);
        // console.groupEnd();
        // console.group("data");
        // console.log(request.data);
        // console.groupEnd();
        // console.groupEnd();
        return request;
    }

    public static handleResponse(response: any) {
        if (Config.log == "NONE")
            return;

        // console.group(
        //     `[Network]: Response ${response.status} ${String(
        //         response.config.method
        //     ).toUpperCase()} => ${response.config.url}`
        // );
        // console.group(`headers:`);
        // console.log(response.headers);
        // console.groupEnd();
        // console.group("data");
        // console.log(response.data);
        // console.groupEnd();
        // console.groupEnd();
        return response;
    }

    public static async handleError(error: any) {
        if (Config.log == "NONE")
            return;

        // console.group(
        //     `[Network]: Error ${String(error.config.method).toUpperCase()} => ${
        //     error.config.url
        //     }`
        // );
        // console.group(`headers:`);
        // console.log(error.config.headers);
        // console.groupEnd();
        // console.group("data");
        // console.log(error.config.data);
        // console.groupEnd();
        // console.group(
        //     `Response ${error.response.status} ${String(
        //         error.response.config.method
        //     ).toUpperCase()} => ${error.response.config.url}`
        // );
        // console.group(`headers:`);
        // console.log(error.response.headers);
        // console.groupEnd();
        // console.group("data");
        // console.log(error.response.data);
        // console.groupEnd();
        // console.groupEnd();
        // console.groupEnd();
        const constraints = error.response.data.message[0].constraints;
        throw Error(constraints[Object.keys(constraints)[0]]);
    }
}
