package com.tongji.carsharing.Entity;

import lombok.*;
import java.sql.Timestamp;

@Data  // 生成 Getter、Setter、toString、equals、hashCode
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class User {
    private Long id;
    private String username;
    private String password;
    private String phone;
    private String role;
    private String avatar;
    private Timestamp createdAt;
    private String homeAddress;
    private String companyAddress;
    private Long totalMileage;
}