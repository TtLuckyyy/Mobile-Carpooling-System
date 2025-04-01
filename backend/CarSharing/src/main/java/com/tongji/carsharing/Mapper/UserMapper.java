package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {


        // 1.根据用户ID查询头像
        @Select("SELECT avatar FROM users WHERE id = #{userId}")
        String getAvatarByUserId(Integer userId);


}
