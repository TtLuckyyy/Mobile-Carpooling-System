package com.tongji.carsharing.Controller;


import com.tongji.carsharing.DTO.RequestDTO;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Service.UserService;
import com.tongji.carsharing.Utility.CalculateTool;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Timestamp;

import java.math.BigDecimal;
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

    @PostMapping("/post-request")
    public Map<String, Object> PostCarpoolRequest(@RequestBody RequestDTO requestDTO) {
        Map<String, Object> response = new HashMap<>();
        Request request = new Request();

        // 将 RequestDTO 中的数据设置到 Request 实体中
        request.setPassengerUser(usermapper.getUserById(requestDTO.getPassengerId()));  // 假设 PassengerUser 是 User 类型
        request.setStartLoc(requestDTO.getStartLoc());
        request.setEndLoc(requestDTO.getEndLoc());
        request.setDistance(requestDTO.getDistance());
        request.setPrice(requestDTO.getPrice());
        request.setStatus(requestDTO.getStatus());
        request.setCreatedAt(requestDTO.getCreatedAt());
        request.setStartAt(requestDTO.getStartAt());
        request.setExclusive(requestDTO.getExclusive());
        request.setHighway(requestDTO.getHighway());

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
