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
public class Address {

    private Integer addressId;          // 地址ID
    private Integer addressUserId;      // 用户ID (外键，关联到 user 表)
    private String addressDetail;    // 详细地址
    private Timestamp addressCreateTime; // 创建时间
}
