package com.tongji.carsharing.Mapper;

import com.tongji.carsharing.Entity.Request;
import com.tongji.carsharing.enums.enums;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.session.RowBounds;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

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

    //查询时间最热门的十条起始地点记录
    @Select("SELECT start_loc FROM carpool_request GROUP BY start_loc ORDER BY COUNT(*) DESC")
    List<String> findTop10StartLocOrderByFrequency(RowBounds rowBounds);

    //查询时间最热门的十条终点地点记录
    @Select("SELECT end_loc FROM carpool_request GROUP BY end_loc ORDER BY COUNT(*) DESC")
    List<String> findTop10EndLocOrderByFrequency(RowBounds rowBounds);

    // 更新需求表的状态
    @Update("UPDATE carpool_request SET status = #{status} WHERE id = #{id}")
    int updateRequestStatus(@Param("id") int id, @Param("status") enums.PDStatus status);


    // 根据用户ID查询所有拼车需求
    @Select("""
        SELECT 
            start_at As startAt, 
            start_loc AS startLoc, 
            end_loc AS endLoc, 
            status,
            id
        FROM carpool_request
        WHERE passenger_id = #{userId}
        ORDER BY start_at DESC
    """)
    List<Map<String, Object>> selectRequestsByUserId(@Param("userId") Integer userId);

    // 查询所有拼车需求记录（不筛选 userId）
    @Select("""
    SELECT
        id AS id,
        start_at As startAt,
        start_loc AS startLoc,
        end_loc AS endLoc,
        distance AS distance,
        status AS status,
        price AS price,
        highway AS highway,
        exclusive AS exclusive
    FROM carpool_request
    ORDER BY start_at DESC
""")
    List<Map<String, Object>> selectAllRequests();

    // 获取所有的需求记录
    @Select("SELECT * FROM carpool_request")
    List<Request> getallRequests();

    // 根据需求表ID修改用户需求表记录
    @Update("UPDATE carpool_request SET start_loc = #{startLoc}, end_loc = #{endLoc}, exclusive = #{exclusive}, highway = #{highway},start_at = #{startAtTimestamp} WHERE id = #{requestId}")
    int updateRequest(@Param("requestId") Integer requestId,
                      @Param("startLoc") String startLoc,
                      @Param("endLoc") String endLoc,
                      @Param("exclusive") Boolean exclusive,
                      @Param("highway") Boolean highway,
                      @Param("startAtTimestamp") Timestamp startAtTimestamp);

    @Delete("DELETE FROM carpool_request WHERE id = #{id}")
    int deleteRequest(@Param("id") Integer id);

    // 根据需求ID查询指定的拼车需求
//    @Select("""
//        SELECT
//            start_at As startAt,
//            start_loc AS startLoc,
//            end_loc AS endLoc,
//            status,
//            highway,
//            exclusive,
//            price
//        FROM carpool_request
//        WHERE id = #{requestId}
//        ORDER BY start_at DESC
//    """)
//    List<Map<String, Object>> selectRequestsByRequestId(@Param("requestId") Integer requestId);

    @Select("""
        SELECT 
            cr.start_at AS startAt, 
            cr.start_loc AS startLoc, 
            cr.end_loc AS endLoc, 
            cr.status,
            cr.highway,
            cr.exclusive,
            cr.price,
            u.avatar,
            u.phone
        FROM carpool_request cr
        INNER JOIN users u ON cr.passenger_id = u.id
        WHERE cr.id = #{requestId}
        ORDER BY cr.start_at DESC
    """)
    List<Map<String, Object>> selectRequestsByRequestId(@Param("requestId") Integer requestId);
}
