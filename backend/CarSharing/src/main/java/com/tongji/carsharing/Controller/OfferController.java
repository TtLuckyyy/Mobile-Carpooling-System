package com.tongji.carsharing.Controller;


import com.tongji.carsharing.Service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class OfferController {
    @Autowired
    private OfferService offerservice;

}
