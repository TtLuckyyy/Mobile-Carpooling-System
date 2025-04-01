package com.tongji.carsharing.Entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data  // 生成 Getter、Setter、toString、equals、hashCode
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor // 生成全参构造方法
@Builder  // 生成 Builder 模式
@Entity
@Table(name = "users")  // 映射到数据库中的 users 表
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer id;

    @Column(name = "username", nullable = false, unique = true)  // 映射到数据库中的 username 字段
    private String username;

    @Column(name = "password", nullable = false)  // 映射到数据库中的 password 字段
    private String password;

    @Column(name = "phone", nullable = false, unique = true)  // 映射到数据库中的 phone 字段
    private String phone;

    @Column(name = "email", nullable = false, unique = true)  // 映射到数据库中的 email 字段
    private String email;

    @Column(name = "role", nullable = false)  // 映射到数据库中的 role 字段
    private String role;

    @Column(name = "avatar")  // 映射到数据库中的 avatar 字段
    private String avatar;

    @Column(name = "created_time", nullable = false, updatable = false)  // 映射到数据库中的 created_time 字段
    private Timestamp createdTime;

    @Column(name = "home_address")  // 映射到数据库中的 home_address 字段
    private String homeAddress;

    @Column(name = "company_address")  // 映射到数据库中的 company_address 字段
    private String companyAddress;

    @Column(name = "total_mileage")  // 映射到数据库中的 total_mileage 字段
    private Integer totalMileage;
}
