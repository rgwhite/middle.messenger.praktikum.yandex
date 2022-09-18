export enum METHOD_TYPES {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
};

type HTTPOptions = {
    method: METHOD_TYPES;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    timeout?: number;
};

function queryStringify(query: Record<string, any>) {
    const keys = Object.keys(query);
    return keys.reduce(
        (result, key, index) => {
            return `${result}${key}=${query[key]}${index < keys.length - 1 ? "&" : ""}`
        },
        "?"
    );
}

export class HTTPTransport {
    public get = (url: string, options: HTTPOptions = { method: METHOD_TYPES.GET }) => {
        this.request(url, { ...options, method: METHOD_TYPES.GET });
    };

    public put = (url: string, options: HTTPOptions = { method: METHOD_TYPES.GET }) => {
        this.request(url, { ...options, method: METHOD_TYPES.PUT });
    };

    public post = (url: string, options: HTTPOptions = { method: METHOD_TYPES.GET }) => {
        this.request(url, { ...options, method: METHOD_TYPES.POST });
    };

    public delete = (url: string, options: HTTPOptions = { method: METHOD_TYPES.GET }) => {
        this.request(url, { ...options, method: METHOD_TYPES.DELETE });
    };

    public request = (url: string, options: HTTPOptions, query: Record<string, any> = {}) => {
        const { data, method, timeout, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let urlQuery = url;

            if (method === METHOD_TYPES.GET && query) {
                urlQuery = `${url}${queryStringify(query)}`;
            }

            xhr.open(method, urlQuery);

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

            if (method === METHOD_TYPES.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}