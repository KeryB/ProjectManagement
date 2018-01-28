
export const required = values => values ? undefined : "Поле обязательно для заполнения";

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный формат' : undefined;