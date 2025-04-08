package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.User;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;

@Mapper
public interface UserMapper {


        // 1.根据用户ID查询头像
        @Select("SELECT avatar FROM users WHERE id = #{userId}")
        String getAvatarByUserId(Integer userId);

        // 2. 根据 ID 查询用户信息
        @Select("SELECT * FROM users WHERE id = #{userId}")
        User getUserById(Integer userId);

        // 添加用户总里程数
        @Update("UPDATE users SET total_mileage = total_mileage + #{mileage} WHERE id = #{userId}")
        void addTotalMileage(Integer userId, BigDecimal mileage);

        //添加新用户
        @Insert("INSERT INTO users(password, phone, role,created_time) VALUES(#{user.getPassword()}, #{user.getPhone()}, #{user.getRole()},#{user.getCreatedTime()})")
        Integer addUser(User user);

}
