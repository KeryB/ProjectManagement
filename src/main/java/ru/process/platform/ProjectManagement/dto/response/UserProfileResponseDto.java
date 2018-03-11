package ru.process.platform.ProjectManagement.dto.response;

import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.jdbcTemplate.Paging;

@Setter
@Getter
public class UserProfileResponseDto {

    private Paging paging;
    private User user;
}
