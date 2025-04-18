package com.tongji.carsharing.Entity;

import com.tongji.carsharing.enums.enums;
import com.tongji.carsharing.enums.enums.PDStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "carpool_order")  // 映射到数据库中的 orders 表
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer id;

    @Column(name = "driver_id", nullable = false)  // 映射到数据库中的 start_loc 字段
    private Integer driverId;

    @Column(name = "passenger_id", nullable = false)  // 映射到数据库中的 start_loc 字段
    private Integer passengerId;

    @Column(name = "offer_id", nullable = false)  // 映射到数据库中的 start_loc 字段
    private Integer offerId;

    @Column(name = "request_id", nullable = false)  // 映射到数据库中的 start_loc 字段
    private Integer requestId;

    @Column(name = "price", nullable = false)  // 映射到数据库中的 price 字段
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)  // 映射到数据库中的 status 字段
    private PDStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)  // 映射到数据库中的 created_at 字段
    private Timestamp createdAt;

}
