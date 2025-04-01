package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {


        // 1.根据用户ID查询头像
        @Select("SELECT avatar FROM users WHERE id = #{userId}")
        String getAvatarByUserId(Integer userId);

        // 2. 根据 ID 查询用户信息
        @Select("SELECT * FROM users WHERE id = #{userId}")
        User getUserById(Integer userId);


}
