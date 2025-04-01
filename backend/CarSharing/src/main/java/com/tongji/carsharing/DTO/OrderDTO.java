package com.tongji.carsharing.DTO;

import com.tongji.carsharing.enums.enums.OfferStatus;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class OrderDTO {

    private Integer driverId;             // 关联的 Driver ID
    private Integer passengerId;          // 关联的 Passenger ID
    private Integer offerId;              // 关联的 Offer ID
    private Integer requestId;            // 关联的 Request ID
    private BigDecimal price;             // 订单价格
    private OfferStatus status;           // 订单状态
    private Timestamp createdAt;          // 创建时间
    private boolean waiting;              // 是否在等待状态
}
