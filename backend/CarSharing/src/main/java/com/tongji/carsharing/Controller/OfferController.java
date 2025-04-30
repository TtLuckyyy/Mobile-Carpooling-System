package com.tongji.carsharing.Controller;


import com.tongji.carsharing.Mapper.OfferMapper;
import com.tongji.carsharing.Service.OfferService;
import com.tongji.carsharing.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class OfferController {
    @Autowired
    private OfferService offerservice;

    @Autowired
    private OfferMapper offermapper;

    // 获取车主最近的行程
    @GetMapping("/get-driver-trip-list")
    public Map<String, Object> getDriverInviteTrips(@RequestParam Integer userId) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> history = offermapper.getDriverOfferList(userId);
        if (history!= null) {
            response.put("status", "success");
            response.put("message", "获取用户最近行程成功！");
            response.put("history", history);
        } else {
            response.put("status", "error");
            response.put("message", "获取用户最近行程失败！");
        }
        return response;
    }
}
