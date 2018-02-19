export const getStorageItem = (key) => {
    return window.localStorage.getItem(key);
};

export const putStorageItem = (key, item) => {
    return window.localStorage.setItem(key, item);
};

export const removeToken = (key) => {
    return window.localStorage.removeItem(key);
};