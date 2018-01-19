package ru.process.platform.ProjectManagement.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import ru.process.platform.ProjectManagement.entity.RestResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HttpUtils {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void writeError(HttpServletResponse response, int statusCode, String message) {
        if (!response.isCommitted()) {
            response.setStatus(200);
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
            try {
                String value = MAPPER.writeValueAsString(RestResponse.error(statusCode, message));
                response.getWriter().write(value);
            } catch (IOException ignored) {

            }
        }
    }
}
