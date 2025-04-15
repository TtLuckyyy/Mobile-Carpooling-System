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

}
