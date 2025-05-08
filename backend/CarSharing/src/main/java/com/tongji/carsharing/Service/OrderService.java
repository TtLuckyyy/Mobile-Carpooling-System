package com.tongji.carsharing.Service;

import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Entity.Verification;
import com.tongji.carsharing.Mapper.OfferMapper;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import com.tongji.carsharing.Mapper.VerificationMapper;
import com.tongji.carsharing.Utility.CalculateTool;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderService {
    public Map<String, Object> matchedOrders(UserMapper usermapper,
                                             OfferMapper offermapper,
                                             RequestMapper requestmapper,
                                             VerificationMapper verimapper,
                                             CalculateTool calculatetool,
                                             Integer requestId)
    {
        // 1. 获取当前需求订单
        Request request = requestmapper.getRequestById(requestId);
        if (request == null) {
            return Map.of("error", "请求的拼车需求不存在");
        }

        // 2. 获取所有拼车邀请
        List<Offer> potentialOffers = offermapper.getAllOffers();


        // 3. 定义最大偏差范围（单位：公里）
        double MAX_OFFSET = 20.0;

        // 4. 结果列表
        List<Map<String, Object>> matchedOffers = new ArrayList<>();

        for (Offer offerdto : potentialOffers) {
            double offsetDistance = calculatetool.calculateOffsetDistance(request, offerdto);
            try {
                Thread.sleep(1000); // 延迟100毫秒（你可以根据需要调整）
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("偏差距离为："+offsetDistance);
            if (offsetDistance <= MAX_OFFSET && offerdto.getStatus() == request.getStatus()) {
                Verification verification = verimapper.getVerificationByUserId(offerdto.getDriverId());
                if (verification == null) continue;

                String avatar = usermapper.getAvatarByUserId(offerdto.getDriverId());

                Map<String, Object> match = new HashMap<>();
                match.put("id", offerdto.getId());
                match.put("start_loc", offerdto.getStartLoc());
                match.put("end_loc", offerdto.getEndLoc());
                match.put("start_at", offerdto.getStartAt());
                match.put("seats", offerdto.getSeats());
                match.put("real_name", verification.getRealName());
                match.put("verification_car_plate", verification.getVerificationCarPlate());
                match.put("verification_car_model", verification.getVerificationCarModel());
                match.put("verification_user_id", verification.getVerificationUserId());
                match.put("verification_color", verification.getVerificationColor());
                match.put("rating", verification.getRating());
                match.put("avatar", avatar);
                match.put("offset", offsetDistance);
                match.put("price", request.getPrice());

                matchedOffers.add(match);
            }
        }
        // 打印匹配到的订单的长度
        System.out.println("匹配到的订单的长度：" + matchedOffers.size());

        if (matchedOffers.isEmpty()) {
            return Map.of("error", "没有符合偏差范围的拼车订单");
        }

        return Map.of("matched_orders", matchedOffers);
    }
}
