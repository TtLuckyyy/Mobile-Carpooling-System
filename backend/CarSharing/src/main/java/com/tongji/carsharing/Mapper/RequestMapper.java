package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import org.apache.ibatis.annotations.*;

@Mapper
public interface RequestMapper
{
    // 插入拼车需求
    @Insert("INSERT INTO carpool_request (passenger_id, start_loc, end_loc, price, distance, status, created_at, start_at, exclusive, highway) " +
            "VALUES (#{request.passengerId}, #{request.startLoc}, #{request.endLoc}, #{request.price}, #{request.distance}, " +
            "#{request.status}, #{request.createdAt}, #{request.startAt}, #{request.exclusive}, #{request.highway})")
    @Options(useGeneratedKeys = true, keyProperty = "id") // 关键部分：获取插入后的 ID
    int insertRequest(@Param("request") com.tongji.carsharing.Entity.Request request);

    // 根据 ID 查询拼车需求
    @Select("SELECT * FROM carpool_request WHERE id = #{id}")
    Request getRequestById(@Param("id") int id);
}
