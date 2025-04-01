package com.tongji.carsharing.Entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor // 生成全参构造方法
@Builder  // 生成 Builder 模式
@Entity
@Table(name = "verification")  // 映射到数据库中的 verification 表
public class Verification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 主键自增
    private Integer verificationId;              // 认证ID

    @ManyToOne
    @JoinColumn(name = "verification_user_id", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User verificationUser;                // 用户ID (外键，关联到 user 表)

    @Column(name = "verification_license_number", nullable = false)
    private String verificationLicenseNumber; // 车主驾驶证号

    @Column(name = "verification_car_plate", nullable = false)
    private String verificationCarPlate;     // 车主车牌号

    @Column(name = "verification_ar_model", nullable = false)
    private String verificationArModel;      // 车主车型

    @Column(name = "verification_state", nullable = false)
    private String verificationState;         // 认证状态（待审核、已通过、已拒绝）

    @Column(name = "verification_submit_time", nullable = false)
    private Timestamp verificationSubmitTime; // 提交时间

    @Column(name = "verification_checked_time")
    private Timestamp verificationCheckedTime; // 审核时间

    @ManyToOne
    @JoinColumn(name = "verification_administrator", referencedColumnName = "id", nullable = false)  // 外键，关联到 user 表
    private User verificationAdministrator;   // 审核人ID (外键，关联到 user 表)

    @Column(name = "real_name", nullable = false)
    private String realName;                  // 真实姓名

    @Column(name = "verification_color", nullable = false)
    private String verificationColor;         // 车主车辆颜色

    @Column(name = "rating", nullable = false)
    private String rating;                    // 车主评分
}
