package ru.process.platform.ProjectManagement.entity;

import java.util.ArrayList;
import java.util.List;

public class RestResponse<T> {

    private int status = 200;
    private String message = "";
    private List<T> result = new ArrayList<>();

    private RestResponse(T result) {
        this.result.add(result);
    }

    private RestResponse(List<T> result) {
        this.result = result;
    }

    private RestResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public RestResponse(int status, String message, List<T> result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }

    public RestResponse(int status, String message, T result) {
        this.status = status;
        this.message = message;
        this.result.add(result);
    }

    public static <T> RestResponse<T> ok(T result) {
        return new RestResponse<>(result);
    }

    public static <T> RestResponse<T> ok(List<T> results) {
        return new RestResponse<>(results);
    }

    public static RestResponse error(int code, String message) {
        return new RestResponse(code, message);
    }
}
