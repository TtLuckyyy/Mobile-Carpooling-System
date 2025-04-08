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

    // 用户注册
    @PostMapping("/register")
    public Map<String, Object> Register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());

        user.setCreatedTime(createdAt);
        user.setRole("passenger");

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


    // 发布拼车需求
    @PostMapping("/post-request")
    public Map<String, Object> PostCarpoolRequest(@RequestBody Request request) {
        Map<String, Object> response = new HashMap<>();
        System.out.println(request);

        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        request.setCreatedAt(createdAt);
        request.setStatus(enums.PDStatus.PENDING);
        request.setDistance(BigDecimal.valueOf(calculateTool.calculateTripDistance(request)));

        Integer request_id = userService.createUserRequest(requestmapper,calculateTool,request);
        if (request_id > 0) {
            response.put("status", "success");
            response.put("message", "拼车需求发布成功！");
            response.put("id", request_id);
        } else {
            response.put("status", "error");
            response.put("message", "拼车需求发布失败！");
        }

        return response;
    }



}
