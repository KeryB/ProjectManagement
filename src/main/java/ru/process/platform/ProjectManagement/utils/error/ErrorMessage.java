package ru.process.platform.ProjectManagement.utils.error;

public class ErrorMessage {
    public static final String EMPTY_FIELD = "Пустое поле";
    public static final String FIELD_CONSTRAINT = "Данное поле должно быть от 2 до 64 символов";
    public static final String EMAIL_OR_PASSWORD_IS_NOT_CORRECT = "Пароль и email некорректны";
    public static String EMAIL_NOT_UNIQUE = "Такой email уже есть";
    public static String INVALID_TOKEN_HEADER = "Получен некорректный токен";
    public static String TOKEN_COULD_NO_BE_REFRESHED_NOW = "Токен не может быть обновлен сейчас";
    public static String REFRESH_TOKEN_REQUIRED_MESSAGE = "Токен должен быть обновлен";
}
