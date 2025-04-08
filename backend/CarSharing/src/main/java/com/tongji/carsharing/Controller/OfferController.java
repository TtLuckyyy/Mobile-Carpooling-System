package com.tongji.carsharing.Controller;


import com.tongji.carsharing.Service.OfferService;
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

    @GetMapping("/get-start-loc-history/{userId}")
    public Map<String, Object> getStartLocHistory(@PathVariable Integer userId) {  //使用方法：后端路径/参数，而非后端路径/?key=value
        Map<String, Object> response = new HashMap<>();
        List<String> history = offerservice.getStartLocHistory(userId);
       if (!history.isEmpty()) {
           response.put("status","success");
           response.put("message", "历史记录查询失败!");
           response.put("history", history);
       }
       else{
           response.put("status","error");
           response.put("message","历史记录查询成功!");
       }
       return response;
    }
}
