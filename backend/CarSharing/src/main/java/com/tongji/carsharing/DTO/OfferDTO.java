package com.tongji.carsharing.DTO;

import com.tongji.carsharing.enums.enums.OfferStatus;
import lombok.*;

import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class OfferDTO {

    private Integer driverId;             // 关联的 Driver ID
    private String startLoc;              // 起始位置
    private String endLoc;                // 终止位置
    private Integer seats;                // 可用座位数
    private OfferStatus status;           // 车池信息的状态
    private Timestamp createdAt;          // 创建时间
    private Timestamp startAt;            // 出发时间
}
