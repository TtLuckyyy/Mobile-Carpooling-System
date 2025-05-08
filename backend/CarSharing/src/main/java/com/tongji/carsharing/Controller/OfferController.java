package com.tongji.carsharing.Controller;


import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.Mapper.OfferMapper;
import com.tongji.carsharing.Service.OfferService;
import com.tongji.carsharing.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
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

    // 发布车主邀请表
    @PostMapping("/post-invitation")
    public Map<String, Object> postCarpoolInvitation(@RequestBody Offer offer) {
        Map<String, Object> response = new HashMap<>();

        // 获取当前时间作为创建时间
        java.sql.Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        offer.setCreatedAt(createdAt);

        // 插入数据库，并获取生成的 Invitation ID
        Integer offerId = offermapper.createUserRequest(offer);

        if (offerId > 0) {
            response.put("status", "success");
            response.put("message", "拼车邀请发布成功！");
            response.put("invitationID", offer.getId());
        } else {
            response.put("status", "error");
            response.put("message", "拼车邀请发布失败！");
        }

        return response;
    }

    // 获取当前邀请表信息
    @GetMapping("/get-certain-invitation")
    public Map<String, Object> getCertainInvitation(@RequestParam("offerId") Integer offerId) {
        Map<String, Object> response = new HashMap<>();

        try {
            Map<String, Object> invitationInfo = offermapper.getOfferByIdSimple(offerId);

            if (invitationInfo != null) {
                response.put("status", "success");
                response.put("data", invitationInfo);
            } else {
                response.put("status", "error");
                response.put("message", "未找到对应的拼车邀请");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "查询失败: " + e.getMessage());
        }

        return response;
    }
}
