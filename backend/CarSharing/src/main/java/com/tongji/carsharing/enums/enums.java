package com.tongji.carsharing.enums;

public class enums {
    // 邀请表和需求表的状态
    public enum PDStatus {
        PENDING, ONGOING,COMPLETED,CANCELLED
    }

    // 验证表的状态
    public enum VerifyStatus {
        PENDING, REJECTED,ACCEPTED
    }

    // 违规举报表的状态
    public enum ReportStatus {
        PENDING, REVIEWED,RESOLVED
    }
}
