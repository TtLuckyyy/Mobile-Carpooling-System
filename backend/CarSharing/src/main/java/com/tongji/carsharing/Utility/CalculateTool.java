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
    public double calculateOffsetDistance(Request request, Offer offer) {
        // 获取 Request 的起点、终点坐标
        Map<String, Double> requestStart = BaiduMapAPI.getGeolocation(request.getStartLoc());
        Map<String, Double> requestEnd = BaiduMapAPI.getGeolocation(request.getEndLoc());

        // 获取 Offer 的起点、终点坐标
        Map<String, Double> offerStart = BaiduMapAPI.getGeolocation(offer.getStartLoc());
        Map<String, Double> offerEnd = BaiduMapAPI.getGeolocation(offer.getEndLoc());

        // 确保获取到了经纬度
        if (requestStart.isEmpty() || requestEnd.isEmpty() || offerStart.isEmpty() || offerEnd.isEmpty()) {
            System.out.println("Error: 获取经纬度失败");
            return Double.MAX_VALUE;  // 设定一个极大值，表示匹配失败
        }

        // 获取经纬度
        double requestStartLat = requestStart.get("latitude");
        double requestStartLng = requestStart.get("longitude");
        double requestEndLat = requestEnd.get("latitude");
        double requestEndLng = requestEnd.get("longitude");

        double offerStartLat = offerStart.get("latitude");
        double offerStartLng = offerStart.get("longitude");
        double offerEndLat = offerEnd.get("latitude");
        double offerEndLng = offerEnd.get("longitude");

        // 使用 Haversine 计算起点偏差和终点偏差
        double startOffset = haversine(requestStartLat, requestStartLng, offerStartLat, offerStartLng);
        double endOffset = haversine(requestEndLat, requestEndLng, offerEndLat, offerEndLng);

        return startOffset + endOffset; // 总偏差距离（单位：公里）
    }

    public double calculateTripDistance(Request request) {
        // 获取 Request 的起点、终点经纬度
        Map<String, Double> startCoords = BaiduMapAPI.getGeolocation(request.getStartLoc());
        Map<String, Double> endCoords = BaiduMapAPI.getGeolocation(request.getEndLoc());

        // 确保经纬度获取成功
        if (startCoords.isEmpty() || endCoords.isEmpty()) {
            System.out.println("Error: 获取经纬度失败");
            return -1;  // 设定一个非法值，表示失败
        }

        double startLat = startCoords.get("latitude");
        double startLng = startCoords.get("longitude");
        double endLat = endCoords.get("latitude");
        double endLng = endCoords.get("longitude");

        // 使用 Haversine 公式计算两点之间的地理距离（单位：公里）
        return haversine(startLat, startLng, endLat, endLng);
    }
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // 地球半径（单位：公里）

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // 返回距离（单位：公里）
    }


}
