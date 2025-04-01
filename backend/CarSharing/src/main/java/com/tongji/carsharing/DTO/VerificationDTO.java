package com.tongji.carsharing.DTO;

import com.tongji.carsharing.enums.enums.AdminStatus;
import lombok.*;

import java.sql.Timestamp;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class VerificationDTO {

    private Integer userId;                             // 用户 ID
    private String verificationLicenseNumber;           // 驾驶证号
    private String verificationCarPlate;               // 车牌号
    private String verificationCarModel;               // 车型
    private AdminStatus status;                         // 认证状态
    private Timestamp verificationSubmitTime;          // 提交时间
    private Timestamp verificationCheckedTime;          // 审核时间
    private Integer adminUserId;                       // 审核人 ID
    private String realName;                            // 真实姓名
    private String verificationColor;                  // 车辆颜色
    private String rating;                              // 车主评分
}
