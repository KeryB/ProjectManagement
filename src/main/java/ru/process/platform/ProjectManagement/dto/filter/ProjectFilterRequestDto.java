package ru.process.platform.ProjectManagement.dto.filter;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectFilterRequestDto {

    public enum FetchTableType {
        available, mine, finished
    }

    private int current;
    private int pageSize;
    private int userId;
    private String projectName;
    private FetchTableType fetchTableType;
}
