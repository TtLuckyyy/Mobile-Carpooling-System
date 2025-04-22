package com.tongji.carsharing.Mapper;


import com.tongji.carsharing.Entity.Offer;
import com.tongji.carsharing.enums.enums;
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

    // 根据ID查询邀请表信息
    @Select("SELECT * FROM carpool_offer WHERE id = #{id}")
    Offer getOfferById(int id);

    // 根据邀请表ID寻找车主ID
    @Select("SELECT driver_id FROM carpool_offer WHERE id = #{offerId}")
    Integer getDriverIdByOfferId(int offerId);

    // 更新邀请表的状态
    @Select("UPDATE carpool_offer SET status = #{status} WHERE id = #{Id}")
    void updateOfferStatus(@Param("Id") int Id, @Param("status") enums.PDStatus status);
}
