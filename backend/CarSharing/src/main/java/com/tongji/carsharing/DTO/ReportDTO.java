package com.tongji.carsharing.DTO;

import com.tongji.carsharing.enums.enums.AdminStatus;
import lombok.*;

import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class ReportDTO {

    private Integer adminId;              // 关联的 Admin ID
    private Integer reportedId;           // 关联的 被举报人 ID
    private Integer reporterId;           // 关联的 举报人 ID
    private Integer orderId;              // 关联的 Order ID
    private String reason;                // 举报原因
    private AdminStatus status;           // 举报状态
    private Timestamp createdAt;          // 创建时间
}
