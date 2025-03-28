package com.tongji.carsharing.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    private Long id;              // 订单唯一ID
    private Long driverId;        // 车主ID
    private Long passengerId;     // 乘客ID
    private Long offerId;         // 关联的拼车邀请ID
    private Long requestId;       // 关联的拼车需求ID
    private BigDecimal price;     // 订单费用
    private String status;        // 订单状态（ongoing, completed, canceled）
    private Timestamp createdAt;  // 订单创建时间


}
