package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.User;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;
import java.util.Map;

@Mapper
public interface UserMapper {


        // 1.根据用户ID查询头像
        @Select("SELECT avatar FROM users WHERE id = #{userId}")
        String getAvatarByUserId(Integer userId);

        // 1.根据用户ID查询家庭地址
        @Select("SELECT home_address FROM users WHERE id = #{userId}")
        String gethomeAddressByUserId(Integer userId);

        // 1.根据用户ID查询公司地址
        @Select("SELECT company_address FROM users WHERE id = #{userId}")
        String getcompanyAddressByUserId(Integer userId);
        // 2. 根据 ID 查询用户信息
        @Select("SELECT * FROM users WHERE id = #{userId}")
        User getUserById(Integer userId);

        // 添加用户总里程数
        @Update("UPDATE users SET total_mileage = total_mileage + #{mileage} WHERE id = #{userId}")
        void addTotalMileage(Integer userId, BigDecimal mileage);

        //添加新用户
        @Insert("INSERT INTO users(username,password, phone, role, created_time) VALUES(#{username},#{password}, #{phone}, #{role}, #{createdTime})")
        Integer addUser(User user);

        // 修改密码
        @Update("UPDATE users SET password = #{password} WHERE phone = #{phone}")
        int updatePasswordByPhone(@Param("phone") String phone, @Param("password") String password);

        // 用户登录
        @Select("SELECT * FROM users WHERE phone = #{phone} AND password = #{password}")
        User login(@Param("phone") String phone, @Param("password") String password);

        // 获取用户当前信息
        @Select("""
        SELECT phone, total_mileage, avatar FROM users WHERE id = #{userId}""")
        Map<String, Object> getUserBasicInfo(@Param("userId") Integer userId);

        // 获取用户详细信息
        @Select("SELECT username, email, avatar, home_address, company_address FROM users WHERE id = #{userId}")
        User selectDetailInfoById(Integer userId);

        // 更新用户信息
        @Mapper
        @Update("UPDATE users SET username = #{username}, email = #{email}, avatar = #{avatar}, " +
                "home_address = #{homeAddress}, company_address = #{companyAddress} " +
                "WHERE id = #{userId}")
        int updateUserInfo(
                @Param("userId") Integer userId,
                @Param("username") String username,
                @Param("email") String email,
                @Param("avatar") String avatar,
                @Param("homeAddress") String homeAddress,
                @Param("companyAddress") String companyAddress
        );

}
