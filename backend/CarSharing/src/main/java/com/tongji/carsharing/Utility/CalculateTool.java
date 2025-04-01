package com.tongji.carsharing.Utility;

import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.Entity.Request;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@Component
public class CalculateTool {
    public BigDecimal calculatePrice(BigDecimal distance) {
        BigDecimal baseRate = new BigDecimal("1.5");
        return baseRate.multiply(distance);
    }
    public double calculateOffsetDistance(Request request, Offer offer)
    {
        BaiduMapAPI baiduMapAPI = new BaiduMapAPI();

        // 获取 Request 的起点、终点坐标
        Map<String, Double> requestStart = baiduMapAPI.getGeolocation(request.getStartLoc());
        Map<String, Double> requestEnd = baiduMapAPI.getGeolocation(request.getEndLoc());

        // 获取 Offer 的起点、终点坐标
        Map<String, Double> offerStart = baiduMapAPI.getGeolocation(offer.getStartLoc());
        Map<String, Double> offerEnd = baiduMapAPI.getGeolocation(offer.getEndLoc());

        // 确保获取到了经纬度
        if (requestStart.isEmpty() || requestEnd.isEmpty() || offerStart.isEmpty() || offerEnd.isEmpty()) {
            System.out.println("Error: 获取经纬度失败");
            return Double.MAX_VALUE;  // 设定一个极大值，表示匹配失败
        }

        // 计算偏差距离（绝对值之和）
        double startOffset = Math.abs(requestStart.get("longitude") - offerStart.get("longitude")) +
                Math.abs(requestStart.get("latitude") - offerStart.get("latitude"));

        double endOffset = Math.abs(requestEnd.get("longitude") - offerEnd.get("longitude")) +
                Math.abs(requestEnd.get("latitude") - offerEnd.get("latitude"));

        return startOffset + endOffset;
    }
}
