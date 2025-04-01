package com.tongji.carsharing.Entity;

import com.tongji.carsharing.enums.enums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "carpool_report")  // 映射到数据库中的 reports 表
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User adminUser;

    @ManyToOne
    @JoinColumn(name = "reported_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User reportedUser;

    @ManyToOne
    @JoinColumn(name = "reporter_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User reporterUser;

    @Column(name = "order_id", nullable = false)  // 映射到数据库中的 order_id 字段
    private Integer orderId;

    @Column(name = "reason", nullable = false)  // 映射到数据库中的 reason 字段
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)  // 映射到数据库中的 status 字段
    private enums.AdminStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)  // 映射到数据库中的 created_at 字段
    private Timestamp createdAt;
}
