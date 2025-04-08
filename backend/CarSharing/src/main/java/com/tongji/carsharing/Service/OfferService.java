package com.tongji.carsharing.Service;

import com.tongji.carsharing.Mapper.OfferMapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferMapper offermapper;

    public List<String> getStartLocHistory(Integer userId) {
        RowBounds rowBounds = new RowBounds(0, 5);  // 从第0条记录开始，返回最多5条记录
        return offermapper.findTop5StartLocByDriverUserIdOrderByCreatedAtDesc(userId, rowBounds);
    }
}
