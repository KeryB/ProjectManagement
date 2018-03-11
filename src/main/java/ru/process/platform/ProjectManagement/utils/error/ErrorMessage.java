package ru.process.platform.ProjectManagement.utils.error;

public class ErrorMessage {
    public static final String EMPTY_FIELD = "Пустое поле";
    public static final String FIELD_CONSTRAINT = "Данное поле должно быть от 2 до 64 символов";
    public static final String EMAIL_OR_PASSWORD_IS_NOT_CORRECT = "Пароль и email некорректны";
    public static final String EMAIL_NOT_UNIQUE = "Пользователь с таким email уже есть";
    public static final String INVALID_TOKEN_HEADER = "Получен некорректный токен";
    public static final String TOKEN_COULD_NO_BE_REFRESHED_NOW = "Токен не может быть обновлен сейчас";
    public static final String REFRESH_TOKEN_REQUIRED_MESSAGE = "Токен должен быть обновлен";
    public static final String INVALID_PROJECT_ID = "Нет доступа к проекту или такого проекта нет!";

}
