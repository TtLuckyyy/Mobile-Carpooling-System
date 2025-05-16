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

        System.out.println(request);
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
        System.out.println("History for userId " + userId + ": " + history);
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

    // 查询需求表中的热门起始地点
    @GetMapping("/get-start-loc-hot")
    public Map<String, Object> getStartLocHot() {  //使用方法：后端路径/参数，而非后端路径/?key=value
        Map<String, Object> response = new HashMap<>();
        List<String> hotLoc = requestservice.getLocHot(true);
        System.out.println("History for userId " + ": " + hotLoc);
        if (!hotLoc.isEmpty()) {
            response.put("status","success");
            response.put("message", "热门起始地点查询成功!");
            response.put("hotLoc", hotLoc);
        }
        else{
            response.put("status","error");
            response.put("message","热门起始地点查询失败！");
        }
        return response;
    }

    // 查询需求表中的热门起始地点
    @GetMapping("/get-end-loc-hot")
    public Map<String, Object> getEndLocHot() {  //使用方法：后端路径/参数，而非后端路径/?key=value
        Map<String, Object> response = new HashMap<>();
        List<String> hotLoc = requestservice.getLocHot(false);
        System.out.println("History for userId " + ": " + hotLoc);
        if (!hotLoc.isEmpty()) {
            response.put("status","success");
            response.put("message", "热门起始地点查询成功!");
            response.put("hotLoc", hotLoc);
        }
        else{
            response.put("status","error");
            response.put("message","热门起始地点查询失败！");
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

    // 获取匹配的用户需求表
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

        Integer requestId = (Integer) params.get("requestId");
        String startLoc = (String) params.get("startLoc");
        String endLoc = (String) params.get("endLoc");
        String startAt = (String) params.get("startAt");
        Boolean exclusive = (Boolean) params.get("exclusive");
        Boolean highway = (Boolean) params.get("highway");

        // 转换时间格式
        startAt = startAt.replace("T", " ").replace("Z", "");
        Timestamp startAtTimestamp = Timestamp.valueOf(startAt);
        startAtTimestamp.setTime(startAtTimestamp.getTime() + 8 * 60 * 60 * 1000);
        System.out.println("startAtTimestamp: " + startAtTimestamp);

        // 更新拼车需求表
        int success = requestmapper.updateRequest(requestId, startLoc, endLoc, exclusive,highway,startAtTimestamp);

        if (success > 0) {
            response.put("status", "success");
            response.put("message", "拼车需求修改成功！");
        } else {
            response.put("status", "error");
            response.put("message", "拼车需求修改失败！");
        }
        return response;
        }

    // 删除拼车需求
    @DeleteMapping("/delete-request")
    public Map<String, Object> deleteRequest(@RequestParam("id") Integer requestId) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 检查需求是否存在
            Request request = requestmapper.getRequestById(requestId);
            if (request == null) {
                response.put("status", "error");
                response.put("message", "拼车需求不存在！");
                return response;
            }
            // 只允许删除 PENDING 或 MATCHED 状态的需求
            if (!request.getStatus().equals(enums.PDStatus.PENDING)) {
                response.put("status", "error");
                response.put("message", "只能删除待接单的拼车需求！");
                return response;
            }
            // 执行删除
            int affectedRows = requestmapper.deleteRequest(requestId);
            if (affectedRows > 0) {
                response.put("status", "success");
                response.put("message", "拼车需求删除成功！");
            } else {
                response.put("status", "error");
                response.put("message", "拼车需求删除失败！");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "删除拼车需求时发生错误：" + e.getMessage());
        }
        return response;
    }

    //获取指定某一条的拼车需求
    @GetMapping("/get-certain-request")
    public Map<String, Object> getCertainRequests(@RequestParam("requestId") Integer requestId) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> data = requestmapper.selectRequestsByRequestId(requestId);
        System.out.println(data);
        if (!data.isEmpty()) {
            response.put("status","success");
            response.put("message", "当前用户拼车需求查询成功!");
            response.put("data", data);
        }
        else{
            response.put("status","error");
            response.put("message","当前用户拼车需求查询失败！");
        }
        return response;
    }
}
