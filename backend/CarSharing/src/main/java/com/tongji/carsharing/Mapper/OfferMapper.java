package com.tongji.carsharing.Mapper;


import com.tongji.carsharing.Entity.Offer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

@Mapper
public interface OfferMapper {

    // 获取所有的邀请表信息
    @Select("SELECT * FROM carpool_offer")
    List<Offer> getAllOffers();

    //根据ID查询邀请表信息
    @Select("SELECT * FROM carpool_offer WHERE id = #{id}")
    Offer getOfferById(int id);

    //查询时间最近的五条起始地点记录
    @Select("SELECT start_loc FROM carpool_offer WHERE driver_id = #{userId} ORDER BY created_at DESC")
    List<String> findTop5StartLocByDriverUserIdOrderByCreatedAtDesc(@Param("userId") Integer userId, RowBounds rowBounds);

    //根据邀请表ID寻找车主ID
    @Select("SELECT driver_id FROM carpool_offer WHERE id = #{offerId}")
    Integer getDriverIdByOfferId(int offerId);
}
