export interface Cache {

    // Set a value to be cached based on the provided key
    set (key: string, value);

    // Returns the cached value
    fetch(key: string, callback);
}