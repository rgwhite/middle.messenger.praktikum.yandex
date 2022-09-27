import { queryStringify } from "./queryStringify";

export enum MethodTypes {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
};

type HTTPOptions = {
    method: MethodTypes;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    timeout?: number;
};

export class HTTPTransport {
    public get = (url: string, options: HTTPOptions = { method: MethodTypes.GET }) => {
        let data = options.data;
        if (data) {
            url = `${url}${queryStringify(data)}`;
        }
        this.request(url, { ...options, method: MethodTypes.GET });
    };

    public put = (url: string, options: HTTPOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.PUT });
    };

    public post = (url: string, options: HTTPOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.POST });
    };

    public delete = (url: string, options: HTTPOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.DELETE });
    };

    public request = (url: string, options: HTTPOptions) => {
        const { data, method, timeout, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            if (timeout) {
                xhr.timeout = timeout;
            }

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = resolve;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === MethodTypes.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}