package ru.process.platform.ProjectManagement.dto.filter;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectFilterRequestDto {

    private int pageNumber;
    private String projectName;
}
