ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE address CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE verification CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE carpool_request CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE carpool_report CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE carpool_order CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE carpool_offer CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 更新用户数据
INSERT INTO users (username, password, phone, role, avatar, home_address, company_address, total_mileage,email,created_time) VALUES
('张三', 'hashed_password1', '13812345678', 'passenger', 'avatar1.png', '华东理工大学', '上海财经大学', 10,"1","2015-2-11"),
('李四', 'hashed_password2', '13923456789', 'driver', 'avatar2.png', '同济大学', '上海交通大学', 20,"3","2016-4-14"),
('王五', 'hashed_password3', '13734567890', 'admin', 'avatar3.png', '复旦大学', '上海外国语大学', 5,"4","2014-2-21"),
('赵六', 'hashed_password4', '13645678901', 'passenger', 'avatar4.png', '上海师范大学', '华东师范大学', 8,"5","2025-3-21"),
('孙七', 'hashed_password5', '13556789012', 'driver', 'avatar5.png', '上海大学', '上海理工大学', 15,"12","2021-5-24");

-- 更新拼车请求数据
INSERT INTO carpool_request (passenger_id, start_loc, end_loc, price, distance, status, exclusive, highway,created_at,start_at) VALUES
(1, '华东理工大学', '上海财经大学', 22.8, 15.2, 'PENDING', TRUE, FALSE,"2025-03-11 12:00:00.000000","2025-03-11 07:00:00.000000"),
(2, '同济大学', '上海交通大学', 30.75, 20.5, 'PENDING', FALSE, TRUE,"2025-03-11 12:00:00.000000","2025-03-11 07:00:00.000000"),
(3, '复旦大学', '上海外国语大学', 16.2, 10.8, 'PENDING', TRUE, FALSE,"2025-03-11 12:00:00.000000","2025-03-11 07:00:00.000000"),
(4, '上海师范大学', '华东师范大学', 27.45, 18.3, 'PENDING', FALSE, TRUE,"2025-03-11 12:00:00.000000","2025-03-11 07:00:00.000000"),
(5, '上海大学', '上海理工大学', 19.05, 12.7, 'PENDING', TRUE, FALSE,"2025-03-11 12:00:00.000000","2025-03-11 07:00:00.000000");

-- 更新拼车提供数据
INSERT INTO carpool_offer (driver_id, start_loc, end_loc, seats, status,start_at,created_at) VALUES
(2, '同济大学', '上海交通大学', 3, 'PENDING',"2025-03-11 09:00:00.000000","2025-03-11 07:00:00.000000"),
(5, '上海大学', '上海理工大学', 2, 'PENDING',"2025-03-12 13:00:00.000000","2025-03-12 11:00:00.000000");


-- 插入车主认证信息
INSERT INTO verification (verification_user_id, verification_license_number, verification_car_plate, verification_car_model, verification_state, real_name, verification_color, rating, verification_administrator_id,verification_submit_time,verification_checked_time) VALUES
(2, 'ABC123456789', '沪A12345', '奥迪A6', 'PENDING', '李四', '黑色', '4.5', 1,"2025-03-11 09:00:00.000000","2025-03-11 09:00:00.000000"),
(5, 'XYZ987654321', '浙A54321', '宝马X5', 'PENDING', '孙七', '白色', '4.7', 1,"2025-03-11 09:00:00.000000","2025-03-11 09:00:00.000000");

-- 插入订单表
INSERT INTO carpool_order (driver_id, passenger_id, offer_id, request_id, price, status, created_at) VALUES
(2, 1, 1, 1, 22.8, 'PENDING', "2025-03-11 09:00:00.000000"),
(5, 4, 2, 4, 27.45, 'PENDING', "2025-03-11 09:00:00.000000");


-- 插入地址表
INSERT INTO `address` (address_create_time, address_detail, user_id) VALUES
(NOW(), '华东理工大学 徐汇校区', 1),
(NOW(), '复旦大学 江湾校区', 2),
(NOW(), '上海交通大学 闵行校区', 3),
(NOW(), '同济大学 嘉定校区', 4),
(NOW(), '上海财经大学 杨浦校区', 5);

-- 插入举报数据
INSERT INTO `carpool_report` (admin_id, created_at, order_id, reason, reported_id, reporter_id, status) VALUES
(1, NOW(), 2, '司机态度恶劣', 2, 5, 'PENDING'),
(2, NOW(), 2, '乘客未按时出现', 2, 3, 'PENDING'),
(3, NOW(), 5, '不合理加价', 2, 3, 'PENDING'),
(1, NOW(), 5, '车辆卫生状况差', 5, 2, 'PENDING'),
(2, NOW(), 5, '司机未按照路线行驶', 5, 1, 'PENDING');

    