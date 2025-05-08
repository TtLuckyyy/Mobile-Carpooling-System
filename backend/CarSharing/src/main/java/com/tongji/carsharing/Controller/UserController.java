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

        System.out.println("phone: " + phone);
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
    public Map<String, Object> getUserInfo(@RequestParam Integer userId) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userInfo = usermapper.getUserBasicInfo(userId);
        if (userInfo!= null ) {
            response.put("status", "success");
            response.put("message", "信息获取成功！");
            response.put("userInfo", userInfo);
        } else {
            response.put("status", "error");
            response.put("message", "信息获取失败！");
        }

        return response;
    }

    // 显示用户详细信息
    @GetMapping("/get-user-info")
    public Map<String, Object> getUserDetailedInfo(@RequestParam Integer userId) {
        Map<String, Object> response = new HashMap<>();

        User user = usermapper.selectDetailInfoById(userId);  // 查询用户信息
        if (user != null) {
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("avatar", user.getAvatar());
            response.put("homeAddress", user.getHomeAddress());
            response.put("companyAddress", user.getCompanyAddress());

            response.put("status", "success");
            response.put("message", "获取用户信息成功！");
        } else {
            response.put("status", "error");
            response.put("message", "未找到用户信息");
        }

        return response;
    }

    @PostMapping("/update-user-info")
    public Map<String, Object> updateUserInfo(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> response = new HashMap<>();

        System.out.println(requestData);
        // 从 map 中取出字段
        String userIdStr = (String) requestData.get("userId");
        Integer userId = Integer.parseInt(userIdStr);

        String username = (String) requestData.get("username");
        String email = (String) requestData.get("email");
        String avatar = (String) requestData.get("avatar");
        String homeAddress = (String) requestData.get("homeAddress");
        String companyAddress = (String) requestData.get("companyAddress");

        int success = usermapper.updateUserInfo(userId, username, email, avatar, homeAddress, companyAddress);

        if (success==1) {
            response.put("status", "success");
            response.put("message", "更新用户信息成功！");
        } else {
            response.put("status", "fail");
            response.put("message", "更新用户信息失败！");
        }
        return response;
    }
}
