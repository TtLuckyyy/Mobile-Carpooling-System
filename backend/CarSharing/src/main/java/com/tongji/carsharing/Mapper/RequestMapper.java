package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

@Mapper
public interface RequestMapper
{
    // 插入拼车需求
    @Insert("INSERT INTO carpool_request (passenger_id, start_loc, end_loc, price, distance, status, created_at, start_at, exclusive, highway) " +
            "VALUES (#{passengerId}, #{startLoc}, #{endLoc}, #{price}, #{distance}, " +
            "#{status}, #{createdAt}, #{startAt}, #{exclusive}, #{highway})")
    @Options(useGeneratedKeys = true, keyProperty = "id") // 关键部分：获取插入后的 ID
    int insertRequest(Request request);

    // 根据 ID 查询拼车需求
    @Select("SELECT * FROM carpool_request WHERE id = #{id}")
    Request getRequestById(@Param("id") int id);

    //查询时间最近的五条起始地点记录
    @Select("SELECT start_loc FROM carpool_request WHERE passenger_id = #{userId} ORDER BY created_at DESC")
    List<String> findTop5StartLocByUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId, RowBounds rowBounds);

    //查询时间最近的五条终点地点记录
    @Select("SELECT end_loc FROM carpool_request WHERE passenger_id = #{userId} ORDER BY created_at DESC")
    List<String> findTop5EndLocByUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId, RowBounds rowBounds);
}
