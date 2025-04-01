package com.tongji.carsharing.DTO;

import com.tongji.carsharing.enums.enums.OfferStatus;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class RequestDTO {

    private Integer passengerId;          // 关联的 Passenger ID
    private String startLoc;              // 起始位置
    private String endLoc;                // 终止位置
    private BigDecimal distance;          // 距离
    private BigDecimal price;             // 价格
    private OfferStatus status;           // 请求状态
    private Timestamp createdAt;          // 创建时间
    private Timestamp startAt;            // 预定开始时间
    private Boolean exclusive;            // 是否专享
    private Boolean highway;              // 是否高速
}
