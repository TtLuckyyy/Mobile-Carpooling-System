package com.tongji.carsharing.Controller;
import com.tongji.carsharing.Entity.Order;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Mapper.*;
import com.tongji.carsharing.Service.OrderService;
import com.tongji.carsharing.Utility.CalculateTool;
import com.tongji.carsharing.enums.enums;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class OrderController {
    @Autowired
    private UserMapper usermapper;

    @Autowired
    private OfferMapper offermapper;

    @Autowired
    private RequestMapper requestmapper;

    @Autowired
    private VerificationMapper verimapper;
    @Autowired
    private CalculateTool calculateTool;

    @Autowired
    private OrderService orderservice;

    @Autowired
    private OrderMapper ordermapper;
    //乘客发布需求后的匹配订单
    @GetMapping("/matched-orders")
    public Map<String, Object> matchedOrders(@RequestParam Integer request_id) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> matched_orders = orderservice.matchedOrders(
                usermapper, offermapper, requestmapper, verimapper, calculateTool, request_id
        );        // 判断是否匹配成功
        if (matched_orders.containsKey("matched_orders")) {
            response.put("status", "success");
            response.put("message", "拼车需求匹配成功！");
            response.put("matched_orders", matched_orders.get("matched_orders"));
        } else {
            response.put("status", "error");
            response.put("message", matched_orders.getOrDefault("error", "拼车需求匹配失败！"));
        }
        return response;
    }

    //订单创建
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Order order) {
        Map<String, Object> response = new HashMap<>();
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        Integer driverId = offermapper.getDriverIdByOfferId(order.getOfferId());

        order.setDriverId(driverId);
        order.setCreatedAt(createdAt);
        order.setStatus(enums.PDStatus.PENDING);

        int orderId=ordermapper.insertOrder(order);

        if (orderId !=0) {
            response.put("status", "success");
            response.put("message", "订单创建成功！");
            response.put("Id", orderId);
        } else {
            response.put("status", "error");
            response.put("message", "订单创建失败！");
        }

        return response;
    }

}
