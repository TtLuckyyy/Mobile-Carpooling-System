package com.tongji.carsharing.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;
@Table(name = "address")  // 映射到数据库中的表名
@Entity  // 标注为 JPA 实体
@Data  // 自动生成 getter, setter, toString, equals, hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class Address {

    @Id  // 主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Integer addressId;          // 地址ID

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User user;

    @Column(name = "address_detail")
    private String addressDetail;       // 详细地址

    @Column(name = "address_create_time")
    private Timestamp addressCreateTime;   // 创建时间
}
