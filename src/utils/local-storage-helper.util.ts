const PREFIX = 'game-generator-';

export const setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
};

export const getLocalStorage = (key: string): any => {
    const value = localStorage.getItem(`${PREFIX}${key}`);
    return value && JSON.parse(value);
};

export const deleteLocalStorage = (key: string): void => {
    localStorage.removeItem(`${PREFIX}${key}`);
};