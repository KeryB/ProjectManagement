export const required = values => values ? undefined : "Поле обязательно для заполнения";

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный формат' : undefined;

export const login = value => value && !/^[a-zA-Z][a-zA-Z0-9_]*$/i.test(value)
    ? 'Можно использовать только цифры и буквы латинского алфавита' : undefined;

export const matLength = 15;
export const maxLength = value => value && value.length > matLength ? "Максимальное количество симолов" : undefined;

export const inputName = value => value && !/^[А-аЯ-я]|[A-aZ-z]*$/i.test(value)
    ? "Можно использовать только буквы латинского и русские буквы" : undefined;