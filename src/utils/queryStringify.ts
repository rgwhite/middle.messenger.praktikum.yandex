export function queryStringify(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    return keys.reduce(
        (result, key, index) => {
            return `${result}${key}=${obj[key]}${index < keys.length - 1 ? "&" : ""}`
        },
        "?"
    );
}