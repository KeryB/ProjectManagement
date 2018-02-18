package ru.process.platform.ProjectManagement.dto.request;


import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AuthenticationRequestDto {

    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String email;

    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String password;
}
