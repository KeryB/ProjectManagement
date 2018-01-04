package ru.process.platform.ProjectManagement.entity.jwt;


import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.utils.ErrorMessage;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class JwtAuthenticationRequest {

    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String email;

    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String password;
}
