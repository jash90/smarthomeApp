export default class Interceptors {
    public static handleRequest(request: any) {
        console.group(`[Network]: Request ${String(request.method).toUpperCase()} => ${request.url}`);
        console.group(`headers:`);
        console.log(request.headers);
        console.groupEnd();
        console.group("data");
        console.log(request.data);
        console.groupEnd();
        console.groupEnd();
        return request;
    }
    public static handleResponse(response: any) {
        console.group(`[Network]: Response ${response.status} ${String(response.config.method).toUpperCase()} => ${response.config.url}`);
        console.group(`headers:`);
        console.log(response.headers);
        console.groupEnd();
        console.group("data");
        console.log(response.data);
        console.groupEnd();
        console.groupEnd();
        return response;
    }
    public static handleError(error: any) {
        console.log({error});
        console.group(`[Network]: Error ${error.status} ${String(error.config.method).toUpperCase()} => ${error.config.url}`);
        console.group(`headers:`);
        console.log(error.config.headers);
        console.groupEnd();
        console.group("data");
        console.log(error.config.data);
        console.groupEnd();
        console.group(`Response ${error.response.status} ${String(error.response.config.method).toUpperCase()} => ${error.response.config.url}`);
        console.group(`headers:`);
        console.log(error.response.headers);
        console.groupEnd();
        console.group("data");
        console.log(error.response.data);
        console.groupEnd();
        console.groupEnd();
        console.groupEnd();
        return error;
    }
}
