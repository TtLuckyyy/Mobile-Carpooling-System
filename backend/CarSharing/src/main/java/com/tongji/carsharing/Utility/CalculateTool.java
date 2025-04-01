package com.tongji.carsharing.Utility;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CalculateTool {
    public BigDecimal calculatePrice(BigDecimal distance) {
        BigDecimal baseRate = new BigDecimal("1.5");
        return baseRate.multiply(distance);
    }
}
