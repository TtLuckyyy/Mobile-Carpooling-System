package com.tongji.carsharing.Controller;

import com.tongji.carsharing.Mapper.OfferMapper;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Mapper.VerificationMapper;
import com.tongji.carsharing.Service.OrderService;
import com.tongji.carsharing.Service.UserService;
import com.tongji.carsharing.Utility.CalculateTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping("/matched-orders/{reqest_id}")
    public Map<String, Object> matchedOrders(@PathVariable Integer reqest_id) {
        Map<String, Object> response = new HashMap<>();
        response=orderservice.matchedOrders(usermapper,offermapper,requestmapper,verimapper,calculateTool,reqest_id);
        if (response !=null) {
            response.put("status", "success");
            response.put("message", "拼车需求发布成功！");
        } else {
            response.put("status", "error");
            response.put("message", "拼车需求发布失败！");
        }

        return response;
    }
}
