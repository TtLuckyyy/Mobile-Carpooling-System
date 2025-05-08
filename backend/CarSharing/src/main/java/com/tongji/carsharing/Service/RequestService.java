package com.tongji.carsharing.Service;

import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.Mapper.RequestMapper;
import com.tongji.carsharing.Utility.CalculateTool;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tongji.carsharing.Utility.CalculateTool;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.*;


@Service
public class RequestService {
    @Autowired
    private RequestMapper requestmapper;
    public Integer createUserRequest(RequestMapper requestmapper, CalculateTool calculateTool, Request request) {

        // 后端计算字段
        BigDecimal price = calculateTool.calculatePrice(request.getDistance());
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());


        // 构造完整 RequestMapper 对象
        //request.setPassengerUser(request.getPassengerUser());
        //request.setStartLoc(request.getStartLoc());
        //request.setEndLoc(request.getEndLoc());
        //request.setDistance(request.getDistance());
        request.setPrice(price);
        request.setCreatedAt(createdAt);
        //request.setStartAt(request.getStartAt());
        //request.setExclusive(request.getExclusive());
        //request.setHighway(request.getHighway());
        // 插入数据库
        int result = requestmapper.insertRequest(request);
        // 返回
        return request.getId();
    }

    // 获取用户需求中最近的5条起点或终点位置
    public List<String> getLocHistory(Integer userId, boolean isStart) {
        RowBounds rowBounds = new RowBounds(0, 5);  // 从第0条记录开始，返回最多5条记录
        if(isStart) {
            return requestmapper.findTop5StartLocByUserIdOrderByCreatedAtDesc(userId, rowBounds);
        }
        else {
            return requestmapper.findTop5EndLocByUserIdOrderByCreatedAtDesc(userId, rowBounds);
        }
    }

    // 获取匹配的用户需求表
    public Map<String, Object> matchedRequests(Offer offer,CalculateTool calculateTool) {
        // 1️⃣ 获取所有乘客需求
        List<Request> potentialRequests = requestmapper.getallRequests();

        // 2️⃣ 定义最大偏差范围（单位：公里）
        double MAX_OFFSET = 20.0;

        // 3️⃣ 结果列表
        List<Map<String, Object>> matchedRequests = new ArrayList<>();

        // 4️⃣ 遍历所有需求进行匹配
        for (Request request : potentialRequests) {
            double offsetDistance = calculateTool.calculateOffsetDistance(request,offer);
            try {
                Thread.sleep(800); // 延迟800毫秒（你可以根据需要调整）
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("偏差距离为："+offsetDistance);
            // 如果偏差距离在允许范围内，才进行匹配
            if (offsetDistance <= MAX_OFFSET) {

                // 生成随机乘车人数（范围：1到4人）
                int person = new Random().nextInt(4) + 1;

                // 先将 offsetDistance 转换为 BigDecimal
                BigDecimal offsetDistanceBD = BigDecimal.valueOf(offsetDistance);

                // 使用 BigDecimal 的 divide 方法进行除法计算，需处理精度问题
                BigDecimal convenientRate = BigDecimal.ONE.subtract(
                        offsetDistanceBD.divide(request.getDistance(), 4, RoundingMode.HALF_UP)
                );


                // 调整后的价格，简单示例：价格随着偏差距离减少
                BigDecimal adjustedPrice = request.getPrice();

                // 组装匹配信息
                Map<String, Object> match = new HashMap<>();
                match.put("id", request.getId());
                match.put("start_loc", request.getStartLoc());
                match.put("end_loc", request.getEndLoc());
                match.put("start_at", request.getStartAt());
                match.put("price", adjustedPrice);
                match.put("offset", offsetDistance);
                match.put("exclusive", request.getExclusive());
                match.put("highway", request.getHighway());
                match.put("person", person);
                match.put("convenient_rate", convenientRate);

                // 添加到结果列表
                matchedRequests.add(match);
            }
        }

        // 5️⃣ 判断匹配结果
        if (matchedRequests.isEmpty()) {
            return Map.of("error", "未找到合适的拼车需求");
        }

        return Map.of("list_matched", matchedRequests);
    }
}