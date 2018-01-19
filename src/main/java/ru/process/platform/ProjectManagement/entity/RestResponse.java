package ru.process.platform.ProjectManagement.entity;

import java.util.ArrayList;
import java.util.List;

public class RestResponse<T> {

    private int status = 200;
    private String message = "";
    private List<T> result = new ArrayList<>();

    public RestResponse(T result) {
        this.result.add(result);
    }

    public RestResponse(List<T> result) {
        this.result = result;
    }

    public RestResponse(int status, String message) {
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

    public List<T> getResult() {
        return result;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void addResult(T result) {
        this.result.add(result);
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
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
