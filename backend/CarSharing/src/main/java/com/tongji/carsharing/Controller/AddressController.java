package com.tongji.carsharing.Controller;

import com.tongji.carsharing.Mapper.AddressMapper;
import com.tongji.carsharing.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/carsharing")
public class AddressController {

        @Autowired
        private AddressMapper addressmapper;

        @Autowired
        private UserMapper usermapper;

        @GetMapping("/get-user-addresses")
        public Map<String, Object> getUserAddresses(@RequestParam Integer userId) {
            Map<String, Object> response = new HashMap<>();
            String homeAddress = usermapper.gethomeAddressByUserId(userId);
            String workAddress = usermapper.getcompanyAddressByUserId(userId);

            if (homeAddress != null && workAddress != null) {
                response.put("status", "success");
                response.put("message", "获取常用地址成功");
                response.put("homeAddress", homeAddress);
                response.put("companyAddress", workAddress);
            } else {
                response.put("status", "error");
                response.put("message", "获取常用地址失败");
            }
            return response;
        }
}
