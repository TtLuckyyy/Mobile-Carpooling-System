package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Order;
import com.tongji.carsharing.Entity.Request;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {

    // 插入订单
    @Insert("INSERT INTO carpool_order (driver_id, passenger_id, offer_id, request_id, price, status, created_at) " +
            "VALUES (#{driverId}, #{passengerId}, #{offerId}, #{requestId}, #{price}, #{status}, #{createdAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertOrder(Order order);

    // 获取当前用用户正在进行的所有订单
    @Select("""
        SELECT 
            o.id AS id,
            r.distance AS distance,
            r.start_at AS startAt,
            d.real_name AS realName,
            d.rating AS rating,
            d.verification_car_model AS verificationCarModel,
            d.verification_car_plate AS verificationCarPlate,
            u.avatar AS avatar
        FROM carpool_order o
        JOIN carpool_request r ON o.request_id = r.id
        JOIN verification d ON o.driver_id = d.verification_user_id
        JOIN users u ON d.verification_user_id = u.id
        WHERE o.passenger_id = #{userId}
          AND o.status = 'ONGOING'
    """)
    List<Map<String, Object>> selectOngoingOrdersByUserId(@Param("userId") int userId);

    // 根据订单ID获取订单详情
    @Select("""
        SELECT 
            r.distance AS distance,
            d.real_name AS realName,
            d.rating AS rating,
            d.verification_car_model AS verificationCarModel,
            d.verification_car_plate AS verificationCarPlate,
            u.avatar AS avatar,
            r.start_loc AS startLoc,
            r.end_loc AS endLoc,
            r.price AS price,
            r.start_at AS startAt
        FROM carpool_order o
        JOIN carpool_request r ON o.request_id = r.id
        JOIN verification d ON o.driver_id = d.verification_user_id
        JOIN users u ON d.verification_user_id = u.id
        WHERE o.id = #{orderId}
    """)
    Map<String, Object> selectCertainOrderInfo(@Param("orderId") Integer orderId);


    @Select("SELECT * FROM carpool_order WHERE id = #{id}")
    Order getOrderById(@Param("id") int id);

    @Delete("DELETE FROM carpool_order WHERE id = #{id}")
    int deleteOrder(@Param("id") Integer id);
}
