package com.tongji.carsharing.Controller;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.User;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Service.RequestService;
import com.tongji.carsharing.Service.UserService;
import com.tongji.carsharing.Utility.CalculateTool;
import com.tongji.carsharing.enums.enums;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class RequestController {
    @Autowired
    private RequestMapper requestmapper;

    @Autowired
    private CalculateTool calculateTool;

    @Autowired
    private RequestService requestservice;

    // 发布拼车需求
    @PostMapping("/post-request")
    public Map<String, Object> PostCarpoolRequest(@RequestBody Request request) {
        Map<String, Object> response = new HashMap<>();

        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        request.setCreatedAt(createdAt);
        request.setStatus(enums.PDStatus.PENDING);
        request.setDistance(BigDecimal.valueOf(calculateTool.calculateTripDistance(request)));

        Integer request_id = requestservice.createUserRequest(requestmapper,calculateTool,request);
        if (request_id > 0) {
            response.put("status", "success");
            response.put("message", "拼车需求发布成功！");
            response.put("requestID", request_id);
        } else {
            response.put("status", "error");
            response.put("message", "拼车需求发布失败！");
        }

        return response;
    }

    // 查询需求表中的起始地点
    @GetMapping("/get-start-loc-history")
    public Map<String, Object> getStartLocHistory(@RequestParam Integer userId) {  //使用方法：后端路径/参数，而非后端路径/?key=value
        Map<String, Object> response = new HashMap<>();
        List<String> history = requestservice.getLocHistory(userId,true);
        if (!history.isEmpty()) {
            response.put("status","success");
            response.put("message", "起点历史记录查询成功!");
            response.put("history", history);
        }
        else{
            response.put("status","error");
            response.put("message","起点历史记录查询失败！");
        }
        return response;
    }

    //查询需求表中的目标地点
    @GetMapping("/get-end-loc-history")
    public Map<String, Object> getEndLocHistory(@RequestParam Integer userId) {  //使用方法：后端路径/参数，而非后端路径/?key=value
        Map<String, Object> response = new HashMap<>();
        List<String> history = requestservice.getLocHistory(userId,false);
        if (!history.isEmpty()) {
            response.put("status","success");
            response.put("message", "终点历史记录查询成功!");
            response.put("history", history);
        }
        else{
            response.put("status","error");
            response.put("message","终点历史记录查询失败！");
        }
        return response;
    }

    //获取用户当前所有的拼车需求（简略的）
    @GetMapping("/get-requests")
    public Map<String, Object> getUserRequests(@RequestParam("userId") Integer userId) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> history = requestmapper.selectRequestsByUserId(userId);
        System.out.println(history);
        if (!history.isEmpty()) {
            response.put("status","success");
            response.put("message", "当前用户拼车需求查询成功!");
            response.put("history", history);
        }
        else{
            response.put("status","error");
            response.put("message","当前用户拼车需求查询失败！");
        }
        return response;
    }

    // 获取所有的用户需求
    @GetMapping("/get-all-invitations")
    public Map<String, Object> getAllRequests() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> history = requestmapper.selectAllRequests();
        if (!history.isEmpty()) {
            response.put("status","success");
            response.put("message", "所有拼车需求查询成功!");
            response.put("history", history);
        }
        else{
            response.put("status","error");
            response.put("message","所有拼车需求查询失败！");
        }
        return response;
    }
}
