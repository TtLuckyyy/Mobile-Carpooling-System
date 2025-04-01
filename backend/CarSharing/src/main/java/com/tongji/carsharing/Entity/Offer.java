package com.tongji.carsharing.Entity;

import lombok.*;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "carpool_offer")  // 映射到数据库中的 carpool_offer 表
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer id;

    @Column(name = "driver_id", nullable = false)  // 映射到数据库中的 driver_id 字段
    private Integer driverId;

    @Column(name = "start_loc", nullable = false)  // 映射到数据库中的 start_loc 字段
    private String startLoc;

    @Column(name = "end_loc", nullable = false)  // 映射到数据库中的 end_loc 字段
    private String endLoc;

    @Column(name = "seats", nullable = false)  // 映射到数据库中的 seats 字段
    private Integer seats;

    @Column(name = "status", nullable = false)  // 映射到数据库中的 status 字段
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false)  // 映射到数据库中的 created_at 字段
    private Timestamp createdAt;

    @Column(name = "start_at", nullable = false)  // 映射到数据库中的 start_at 字段
    private Timestamp startAt;
}