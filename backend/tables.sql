CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(128) NOT NULL COMMENT 'họ và tên',
  `phone` varchar(32) DEFAULT NULL COMMENT 'số điện thoại',
  `email` varchar(256) DEFAULT NULL COMMENT 'địa chỉ email',
  `password` varchar(64) NOT NULL COMMENT 'mật khẩu',
  `personal_id_code` varchar(32) DEFAULT NULL COMMENT 'mã căn cước công dân',
  `created_at` datetime DEFAULT NULL COMMENT 'thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'thời điểm cập nhật gần nhất',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `personal_id_code_UNIQUE` (`personal_id_code`),
  CONSTRAINT `users_chk_phone_email` CHECK (((`phone` is not null) or (`email` is not null)))
);

CREATE TABLE `houses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL COMMENT 'id chủ ngôi nhà',
  `name` varchar(256) NOT NULL COMMENT 'định danh ngôi nhà theo người chủ',
  `created_at` datetime DEFAULT NULL COMMENT 'thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'thời điểm sủa đổi gần nhất',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_houses_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `rooms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `house_id` bigint unsigned NOT NULL COMMENT 'id ngôi nhà mà căn phòng thuộc',
  `user_id` bigint unsigned NOT NULL COMMENT 'id chủ ngôi nhà mà căn phòng thuộc',
  `name` varchar(256) NOT NULL COMMENT 'tên căn phòng',
  `created_at` datetime DEFAULT NULL COMMENT 'thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'thời điểm sửa đổi gần nhất',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_rooms_houses` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`),
  CONSTRAINT `fk_rooms_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `devices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` bigint unsigned NOT NULL COMMENT 'id căn phòng mà thiết bị thuộc',
  `user_id` bigint unsigned NOT NULL COMMENT 'id chủ ngôi nhà mà thiết bị thuộc',
  `metadata` json DEFAULT NULL COMMENT 'thông tin thiết bị',
  `data` json DEFAULT NULL COMMENT 'dữ liệu mới nhất',
  `created_at` datetime DEFAULT NULL COMMENT 'thời điểm tạo',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_devices_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `fk_devices_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `device_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `device_id` bigint unsigned NOT NULL COMMENT 'id thiết bị được ghi nhật ký dữ liệu',
  `user_id` bigint unsigned NOT NULL COMMENT 'id chủ ngôi nhà chứa thiết bị được ghi nhật ký dữ liệu',
  `data` json NOT NULL COMMENT 'dữ liệu',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_device_logs_devices` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`),
  CONSTRAINT `fk_device_logs_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(128) NOT NULL COMMENT 'tên đầy đủ',
  `email` varchar(256) NOT NULL COMMENT 'địa chỉ email',
  `password` varchar(64) NOT NULL COMMENT 'mật khẩu',
  `created_at` datetime DEFAULT NULL COMMENT 'thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'thời điểm sửa đổi gần nhất',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `refresh_tokens` (
  `token` varchar(96) NOT NULL COMMENT 'refresh token',
  `user_id` bigint unsigned NOT NULL COMMENT 'id chủ tài khoản của token',
  `expired_at` datetime NOT NULL COMMENT 'thời điểm token hết hạn',
  PRIMARY KEY (`token`),
  CONSTRAINT `fk_refresh_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `black_tokens` (
  `token` varchar(96) NOT NULL COMMENT 'token mà người dùng đã đăng xuất nhưng chưa hết hạn',
  `expired_at` datetime NOT NULL COMMENT 'thời điểm token hết hạn',
  PRIMARY KEY (`token`)
);