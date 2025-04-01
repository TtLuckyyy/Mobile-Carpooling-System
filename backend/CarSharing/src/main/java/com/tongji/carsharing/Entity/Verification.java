package com.tongji.carsharing.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class Verification {

    private Integer verificationId;              // 认证ID
    private Integer verificationUserId;          // 用户ID (外键，关联到 user 表)
    private String verificationLicenseNumber; // 车主驾驶证号
    private String verificationCarPlate;     // 车主车牌号
    private String verificationArModel;      // 车主车型
    private String verificationState;         // 认证状态（待审核、已通过、已拒绝）
    private Timestamp verificationSubmitTime; // 提交时间
    private Timestamp verificationCheckedTime; // 审核时间
    private Integer verificationAdministrator;   // 审核人ID (外键，关联到 user 表)
    private String realName;                  // 真实姓名
    private String verificationColor;         // 车主车辆颜色
    private String rating;                    // 车主评分
}
