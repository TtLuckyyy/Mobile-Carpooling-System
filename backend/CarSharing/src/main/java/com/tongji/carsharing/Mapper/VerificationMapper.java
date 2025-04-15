package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Verification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface VerificationMapper {
    // 根据用户ID查询认证信息
    @Select("SELECT * FROM verification WHERE verification_user_id = #{userId}")
    Verification getVerificationByUserId(Integer userId);


}
