package com.tongji.carsharing.Controller;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.OfferMapper;
import com.tongji.carsharing.Service.RequestService;
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
    private OfferMapper offermapper;

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

    // 获取用户当前所有的拼车需求
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

    // 获取匹配（在一定区域内的）的用户需求表
    @GetMapping("/matched-requests")
    public Map<String, Object> matchedRequests(@RequestParam("offerId") Integer offerId) {
        Map<String, Object> response = new HashMap<>();

        // 获取当前拼车邀请信息
        Offer offer = offermapper.getOfferById(offerId);

        if (offer == null) {
            response.put("status", "error");
            response.put("message", "未找到对应的拼车邀请");
            return response;
        }

        // 调用服务层的匹配逻辑
        Map<String, Object> matchedRequests = requestservice.matchedRequests(offer,calculateTool);

        if (matchedRequests.containsKey("list_matched")) {
            response.put("status", "success");
            response.put("message", "拼车请求匹配成功！");
            response.put("list_matched", matchedRequests.get("list_matched"));
        } else {
            response.put("status", "error");
            response.put("message", matchedRequests.getOrDefault("error", "未找到合适的拼车请求"));
        }

        return response;
    }

    // 修改用户需求表
    @PostMapping("/modify-request")
    public Map<String, Object> modifyRequest(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<>();

        Integer orderId = (Integer) params.get("orderId");
        String startLoc = (String) params.get("startLoc");
        String endLoc = (String) params.get("endLoc");
        String startAt = (String) params.get("startAt");

        // 转换时间格式
        startAt = startAt.replace("T", " ").replace("Z", "");
        Timestamp startAtTimestamp = Timestamp.valueOf(startAt);

        // 更新拼车需求表
        int success = requestmapper.updateRequest(orderId, startLoc, endLoc, startAtTimestamp);

        if (success > 0) {
            response.put("status", "success");
            response.put("message", "拼车需求修改成功！");
        } else {
            response.put("status", "error");
            response.put("message", "拼车需求修改失败！");
        }
        return response;
        }

    // 根据用户需求表获取表内相关信息
    @GetMapping("/get-invitation")
    public Map<String, Object> getCarpoolRequestDetails(@RequestParam("requestId")  Integer requestId) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = requestmapper.getCarpoolRequestDetails(requestId);
        if (result != null) {
            response.put("status","success");
            response.put("message", "拼车需求信息查询成功!");
            response.put("data",result);
        }
        else{
            response.put("status","error");
            response.put("message","拼车需求信息查询失败！");
        }
        return response;
    }

    // 获取用户的某个需求表信息
    @GetMapping("/get-certain-request")
    public Map<String, Object> getCertainRequest(@RequestParam Integer requestId) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> request = requestmapper.selectCertainRequestInfo(requestId);
        if (request!= null) {
            response.put("status", "success");
            response.put("message", "获取当前需求表信息成功！");
            response.put("history", request);
        } else {
            response.put("status", "error");
            response.put("message", "获取当前需求表信息失败！");
        }
        return response;
    }
}
