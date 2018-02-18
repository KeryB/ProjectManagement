package ru.process.platform.ProjectManagement.dto.request;


import lombok.*;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestDto {

    @Size(min = 2, max = 64, message = ErrorMessage.FIELD_CONSTRAINT)
    @NotNull
    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
    private String email;

    @Size(min = 2, max = 64, message = ErrorMessage.FIELD_CONSTRAINT)
    @NotNull
    @Pattern(regexp = "(\\w|\\D)+")
    private String password;

    @Size(min = 3,max = 64, message = ErrorMessage.FIELD_CONSTRAINT)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String firstName;

    @Size(min = 3,max = 64, message = ErrorMessage.FIELD_CONSTRAINT)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String secondName;

    @Size(min = 3,max = 64, message = ErrorMessage.FIELD_CONSTRAINT)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String nickname;
}
