package com.tongji.carsharing.Service;

import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Utility.CalculateTool;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    public Integer createUserRequest(RequestMapper requestmapper, CalculateTool calculateTool, Request request) {
        // 后端计算字段
        BigDecimal price = calculateTool.calculatePrice(request.getDistance());
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());


        // 构造完整 RequestMapper 对象
        request.setPassengerUser(request.getPassengerUser());
        request.setStartLoc(request.getStartLoc());
        request.setEndLoc(request.getEndLoc());
        request.setDistance(request.getDistance());
        request.setPrice(price);
        request.setStatus(request.getStatus());
        request.setCreatedAt(createdAt);
        request.setStartAt(request.getStartAt());
        request.setExclusive(request.getExclusive());
        request.setHighway(request.getHighway());

        // 插入数据库
        int result = requestmapper.insertRequest(request);

        // 返回
        return request.getId();
    }
}