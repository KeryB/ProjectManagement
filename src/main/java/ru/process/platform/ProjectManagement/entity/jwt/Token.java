package ru.process.platform.ProjectManagement.entity.jwt;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Token {

    private Integer id;
    private Date expiration;
    private Date creationDate;
}
