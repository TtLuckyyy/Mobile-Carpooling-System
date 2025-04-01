package com.tongji.carsharing.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//违规记录表
public class Report {

    private Integer id;              // 违规记录唯一ID
    private Integer adminId;         // 管理者用户ID
    private Integer reportedId;      // 被举报用户ID
    private Integer reporterId;      // 举报人ID
    private Integer orderId;         // 关联的订单ID
    private String reason;        // 违规原因描述
    private String status;        // 处理状态（pending, reviewed, resolved）
    private Timestamp createdAt;  // 举报时间


}
