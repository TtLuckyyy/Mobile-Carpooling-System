package com.tongji.carsharing.Entity;

import com.tongji.carsharing.enums.enums;
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

    @ManyToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User driverUser;

    @ManyToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User passengerUser;

    @ManyToOne
    @JoinColumn(name = "offer_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "request_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private Request request;

    @Column(name = "price", nullable = false)  // 映射到数据库中的 price 字段
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)  // 映射到数据库中的 status 字段
    private enums.OfferStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)  // 映射到数据库中的 created_at 字段
    private Timestamp createdAt;

    @Column(name = "waiting", nullable = false)  // 映射到数据库中的 waiting 字段
    private boolean waiting;
}
