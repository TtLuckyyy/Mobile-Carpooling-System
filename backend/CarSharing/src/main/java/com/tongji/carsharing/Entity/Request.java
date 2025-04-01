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
@Table(name = "carpool_request")  // 映射到数据库中的 requests 表
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User passengerUser;

    @Column(name = "start_loc", nullable = false)  // 映射到数据库中的 start_loc 字段
    private String startLoc;

    @Column(name = "end_loc", nullable = false)  // 映射到数据库中的 end_loc 字段
    private String endLoc;

    @Column(name = "distance", nullable = false)  // 映射到数据库中的 distance 字段
    private BigDecimal distance;

    @Column(name = "price", nullable = false)  // 映射到数据库中的 price 字段
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)  // 映射到数据库中的 status 字段
    private enums.OfferStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)  // 映射到数据库中的 created_at 字段
    private Timestamp createdAt;

    @Column(name = "start_at", nullable = false)  // 映射到数据库中的 start_at 字段
    private Timestamp startAt;

    @Column(name = "exclusive", nullable = false)  // 映射到数据库中的 exclusive 字段
    private Boolean exclusive;

    @Column(name = "highway", nullable = false)  // 映射到数据库中的 highway 字段
    private Boolean highway;
}
