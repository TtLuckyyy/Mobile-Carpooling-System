package com.tongji.carsharing.DTO;

import lombok.*;

import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class UserDTO {

    private String username;               // 用户名
    private String phone;                  // 手机号
    private String email;                  // 邮箱
    private String role;                   // 角色
    private String avatar;                 // 头像
    private Timestamp createdTime;         // 创建时间
    private String homeAddress;            // 家庭地址
    private String companyAddress;         // 公司地址
    private Integer totalMileage;          // 总里程
}
