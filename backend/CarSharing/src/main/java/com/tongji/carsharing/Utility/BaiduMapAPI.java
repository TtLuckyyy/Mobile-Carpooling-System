package com.tongji.carsharing.Utility;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

public class BaiduMapAPI {
    private static final String API_KEY = "EtqTJ1MT40bg44IsZf2fFe2eJmCD2l2e";
    private static final String BASE_URL = "https://api.map.baidu.com/geocoding/v3/?";

    public static Map<String, Double> getGeolocation(String address) {
        Map<String, Double> coordinates = new HashMap<>();
        try {
            // 构造请求 URL
            String requestUrl = BASE_URL + "address=" + address + "&output=json&ak=" + API_KEY;
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(requestUrl))
                    .GET()
                    .build();

            // 发送请求
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());



            // 解析 JSON
            JSONObject jsonResponse = new JSONObject(response.body());
            int status = jsonResponse.getInt("status");

            if (status != 0) {
                // 更安全的处理方式
                System.out.println("Error: API 调用失败，status = " + status);
                System.out.println("完整响应：" + jsonResponse.toString());
            } else {
                // 正常解析
                JSONObject location = jsonResponse.getJSONObject("result").getJSONObject("location");

                double lng = location.getDouble("lng");
                double lat = location.getDouble("lat");

                // 存入 Map 并返回
                coordinates.put("longitude", lng);
                coordinates.put("latitude", lat);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return coordinates;
    }
}
