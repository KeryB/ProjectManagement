package ru.process.platform.ProjectManagement.utils.time;

import java.util.Date;

public class TimeUtils {

    public static Date generateExpirationDate(long expiration){
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }
}
