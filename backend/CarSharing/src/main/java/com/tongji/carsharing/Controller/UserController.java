package com.tongji.carsharing.Controller;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.User;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Service.UserService;
import com.tongji.carsharing.Utility.CalculateTool;
import com.tongji.carsharing.enums.enums;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class UserController {
    @Autowired
    private RequestMapper requestmapper;

    @Autowired
    private UserMapper usermapper;

    @Autowired
    private CalculateTool calculateTool;

    @Autowired
    private UserService userService;

    // 用户注册（已测试）
    @PostMapping("/register")
    public Map<String, Object> Register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        System.out.println(user);

        //随机生成一个用户名，长度为10个字符
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }

        user.setCreatedTime(createdAt);
        user.setRole("passenger");
        user.setUsername(sb.toString());
        Integer result = usermapper.addUser(user);
        if (result > 0) {
            response.put("status", "success");
            response.put("message", "注册成功！");
        } else {
            response.put("status", "error");
            response.put("message", "注册失败！");
        }

        return response;
    }

    // 用户登录（已测试）
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();
        String phone = data.get("phone");
        String password = data.get("password");


        User user = usermapper.login(phone, password); // 未加密版本
        Integer userId = user.getId();

        if (user!= null) {
            response.put("status", "success");
            response.put("message", "登陆成功！");
            response.put("userId", userId);
        } else {
            response.put("status", "error");
            response.put("message", "登录失败！");
        }

        return response;
    }

    //忘记密码（已测试）
    @PostMapping("/forget")
    public Map<String, Object> forgetPassword(@RequestBody Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();
        String phone = data.get("phone");
        String newPassword = data.get("password");

        int result = usermapper.updatePasswordByPhone(phone, newPassword);

        if (result > 0) {
            response.put("status", "success");
            response.put("message", "密码修改成功！");
        } else {
            response.put("status", "error");
            response.put("message", "密码修改失败！");
        }

        return response;
    }

    // 获取个人信息
    @GetMapping("/my")
    public Map<String, Object> getUserInfo(@RequestBody Integer userId) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userInfo = usermapper.getUserBasicInfo(userId);
        if (userInfo!= null ) {
            response.put("status", "success");
            response.put("message", "密码修改成功！");
            response.put("userInfo", userInfo);
        } else {
            response.put("status", "error");
            response.put("message", "密码修改失败！");
        }

        return response;
    }

    // 修改用户信息

}
