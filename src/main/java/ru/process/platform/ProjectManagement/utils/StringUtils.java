package ru.process.platform.ProjectManagement.utils;

public class StringUtils {

    public static boolean isNumber(String string){
        return string.matches("-?\\d+");
    }

    public static boolean isNotBlank(String value) {
        return value != null && !value.isEmpty();
    }
}
