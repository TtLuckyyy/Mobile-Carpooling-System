package com.tongji.carsharing.DTO;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // 自动生成 getter、setter、toString、equals 和 hashCode 方法
@NoArgsConstructor  // 生成无参构造方法
@AllArgsConstructor  // 生成全参构造方法
@Builder  // 生成 Builder 模式
public class AddressDTO {

    private Integer addressId;            // 地址ID
    private Integer userId;               // 关联的 User ID
    private String addressDetail;         // 详细地址
    private Timestamp addressCreateTime;  // 创建时间
}
