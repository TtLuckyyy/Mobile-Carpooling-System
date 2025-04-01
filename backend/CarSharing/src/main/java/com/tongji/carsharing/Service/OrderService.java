//package com.tongji.carsharing.Service;
//
//import com.tongji.carsharing.Entity.Offer;
//import com.tongji.carsharing.Entity.Request;
//import com.tongji.carsharing.Entity.Verification;
//import com.tongji.carsharing.Mapper.OfferMapper;
//import com.tongji.carsharing.Mapper.RequestMapper;
//import com.tongji.carsharing.Mapper.UserMapper;
//import com.tongji.carsharing.Mapper.VerificationMapper;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class OrderService {
//    public Map<String, Object> matchedOrders(UserMapper usermapper,
//                                             OfferMapper offermapper,
//                                             RequestMapper requestmapper,
//                                             VerificationMapper verimapper,
//                                             Integer requestId)
//    {
//        // 1. 获取当前需求订单
//        Request request = requestmapper.getRequestById(requestId);
//        if (request == null) {
//            return Map.of("error", "请求的拼车需求不存在");
//        }
//
//        // 2. 获取所有符合条件的拼车邀请
//        List<Offer> potentialOffers = offermapper.getAllOffers();
//
//        // 3. 计算匹配度（偏差距离）并找到最小偏差的订单
//        Offer bestOffer = null;
//        double minOffsetDistance = Double.MAX_VALUE;
//
//        for (Offer offer : potentialOffers) {
//            double offsetDistance = calculateOffsetDistance(request, offer);
//
//            if (offsetDistance < minOffsetDistance) {
//                minOffsetDistance = offsetDistance;
//                bestOffer = offer;
//            }
//        }
//
//        // 4. 如果没有找到合适的拼车订单
//        if (bestOffer == null) {
//            return Map.of("error", "没有匹配的拼车订单");
//        }
//
//        // 5. 获取车主认证信息
//        Verification verification = verimapper.getVerificationByUserId(bestOffer.getOwnerId());
//        if (verification == null) {
//            return Map.of("error", "未找到车主认证信息");
//        }
//
//        // 6. 获取车主头像
//        String avatar = usermapper.getAvatarByUserId(bestOffer.getOwnerId());
//
//        // 7. 计算价格（基础价格调整）
//        double adjustedPrice = adjustPrice(request.getPrice(), minOffsetDistance);
//
//        // 8. 组装结果
//        Map<String, Object> match = new HashMap<>();
//        match.put("id", bestOffer.getId());
//        match.put("start_loc", bestOffer.getStartLoc());
//        match.put("end_loc", bestOffer.getEndLoc());
//        match.put("start_at", bestOffer.getStartAt());
//        match.put("seats", bestOffer.getSeats());
//        match.put("real_name", verification.getRealName());
//        match.put("verification_car_plate", verification.getCarPlate());
//        match.put("verification_car_model", verification.getCarModel());
//        match.put("verification_color", verification.getCarColor());
//        match.put("rating", verification.getRating());
//        match.put("avatar", avatar);
//        match.put("offset_distance", minOffsetDistance);
//        match.put("price", adjustedPrice);
//
//        return Map.of("matched_order", match);
//    }
//
//
//}
