package com.tongji.carsharing;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.tongji.carsharing.Mapper")
public class CarSharingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarSharingApplication.class, args);
    }

}
