package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Order;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface OrderMapper {
    @Insert("INSERT INTO carpool_order (driver_id, passenger_id, offer_id, request_id, price, status, created_at) " +
            "VALUES (#{driverId}, #{passengerId}, #{offerId}, #{requestId}, #{price}, #{status}, #{createdAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertOrder(Order order);
}
