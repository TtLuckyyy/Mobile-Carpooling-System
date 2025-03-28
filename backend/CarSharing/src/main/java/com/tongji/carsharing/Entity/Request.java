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
public class Request {

    private Long id;              // 需求唯一ID
    private Long passengerId;     // 乘客ID
    private String startLoc;      // 起点
    private String endLoc;        // 终点
    private BigDecimal price;     // 费用
    private String status;        // 需求状态（pending, matched, completed, canceled）
    private Timestamp createdAt;  // 发布时间
    private Timestamp startAt;    // 出发时间
    private Boolean exclusive;    // 是否独享
    private Boolean highway;      // 是否协商高速费

}
