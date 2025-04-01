package com.tongji.carsharing.Entity;

import lombok.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offer {
    private Integer id;
    private Integer driverId;
    private String startLoc;
    private String endLoc;
    private Integer seats;
    private String status;
    private Timestamp createdAt;
    private Timestamp startAt;
}
