-- ============================================================
-- CƠ SỞ DỮ LIỆU NHÀ HÀNG HOÀNG LONG QUÁN (皇龍樓)
-- Hệ thống gọi món thông minh qua mã QR & Màn hình bếp KDS
-- RDBMS: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10+
-- Mã hóa: UTF-8 Unicode (utf8mb4)
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tạo Database
CREATE DATABASE IF NOT EXISTS `hoang_long_quan` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hoang_long_quan`;

-- ============================================================
-- BẢNG 1: users (Tài khoản nhân viên, quản lý, đầu bếp)
-- ============================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` VARCHAR(36) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `plain_backup` VARCHAR(50) DEFAULT NULL COMMENT 'Mật khẩu mẫu thử nghiệm',
  `name` VARCHAR(100) NOT NULL,
  `role` ENUM('admin', 'kitchen', 'waiter', 'customer') NOT NULL DEFAULT 'customer',
  `avatar` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `password_hash`, `plain_backup`, `name`, `role`, `avatar`) VALUES
('u-01', 'admin', '$2a$10$7Z2v6/K5j5.VvL7q9d7o3eP9s8r6j4n3m2l1k0j9h8g7f6e5d4c3b', 'admin123', 'Chủ Quán - Hoàng Lão Bản', 'admin', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('u-02', 'bep', '$2a$10$7Z2v6/K5j5.VvL7q9d7o3eP9s8r6j4n3m2l1k0j9h8g7f6e5d4c3b', 'bep123', 'Bếp Trưởng - Trương Đại Sư', 'kitchen', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'),
('u-03', 'phucvu', '$2a$10$7Z2v6/K5j5.VvL7q9d7o3eP9s8r6j4n3m2l1k0j9h8g7f6e5d4c3b', 'phucvu123', 'Tiểu Nhị - A Phúc', 'waiter', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150');

-- ============================================================
-- BẢNG 2: tables (Danh sách bàn ăn & trạng thái QR)
-- ============================================================
DROP TABLE IF EXISTS `tables`;
CREATE TABLE `tables` (
  `id` VARCHAR(36) NOT NULL,
  `table_number` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL DEFAULT 4,
  `status` ENUM('available', 'occupied', 'reserved') NOT NULL DEFAULT 'available',
  `current_order_id` VARCHAR(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tables` (`id`, `table_number`, `name`, `capacity`, `status`, `current_order_id`) VALUES
('tbl-01', '01', 'Bàn 01 - Sảnh Rồng', 4, 'available', NULL),
('tbl-02', '02', 'Bàn 02 - Sảnh Rồng', 4, 'available', NULL),
('tbl-03', '03', 'Bàn 03 - Sảnh Phụng', 6, 'occupied', 'ord-sample-01'),
('tbl-04', '04', 'Bàn 04 - Sảnh Phụng', 4, 'available', NULL),
('tbl-05', '05', 'Bàn 05 - Hoa Sen', 2, 'available', NULL),
('tbl-06', '06', 'Bàn 06 - Hoa Sen', 2, 'available', NULL),
('tbl-07', '07', 'Bàn 07 - Trúc Các', 6, 'available', NULL),
('tbl-08', '08', 'Bàn 08 - Trúc Các', 4, 'occupied', 'ord-1792395351304'),
('tbl-vip1', 'VIP-01', 'Phòng VIP 01 - Cửu Long', 12, 'available', NULL),
('tbl-vip2', 'VIP-02', 'Phòng VIP 02 - Phượng Hoàng', 10, 'available', NULL);

-- ============================================================
-- BẢNG 3: categories (Danh mục món ăn ẩm thực Trung Hoa)
-- ============================================================
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `hanzi` VARCHAR(50) NOT NULL,
  `icon` VARCHAR(20) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `hanzi`, `icon`, `display_order`) VALUES
('all', 'Tất Cả Món', '全部', '🏮', 1),
('chef_special', 'Đặc Sản Quán', '招牌', '⭐', 2),
('dimsum', 'Dim Sum Nặn Tay', '点心', '🥟', 3),
('roast', 'Vịt Quay & Nướng', '烧腊', '🦆', 4),
('soup_abalone', 'Bào Ngư & Tổ Yến', '鲍燕', '🦪', 5),
('meat', 'Sơn Hào Hải Vị', '佳肴', '🥩', 6),
('hotpot', 'Lẩu Tứ Xuyên', '火锅', '🍲', 7),
('noodles', 'Mì Kéo & Hủ Tiếu', '面食', '🍜', 8),
('tea_dessert', 'Danh Trà & Tráng Miệng', '甜品', '🍵', 9);

-- ============================================================
-- BẢNG 4: dishes (Thực đơn món ăn)
-- ============================================================
DROP TABLE IF EXISTS `dishes`;
CREATE TABLE `dishes` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `hanzi` VARCHAR(100) NOT NULL,
  `pinyin` VARCHAR(150) DEFAULT NULL,
  `category_id` VARCHAR(50) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `image` VARCHAR(500) DEFAULT NULL,
  `description` TEXT,
  `is_spicy` BOOLEAN NOT NULL DEFAULT 0,
  `spice_level` INT NOT NULL DEFAULT 0,
  `is_best_seller` BOOLEAN NOT NULL DEFAULT 0,
  `is_chef_special` BOOLEAN NOT NULL DEFAULT 0,
  `in_stock` BOOLEAN NOT NULL DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_dishes_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `dishes` (`id`, `name`, `hanzi`, `pinyin`, `category_id`, `price`, `image`, `description`, `is_spicy`, `spice_level`, `is_best_seller`, `is_chef_special`, `in_stock`) VALUES
('dish-01', 'Há Cảo Thủy Tinh Tôm Tươi', '水晶虾饺皇', 'Shuǐjīng Xiājiǎo Huáng', 'dimsum', 68000, 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80', 'Lớp vỏ bột mờ trong suốt như pha lê bọc trọn 3 chú tôm tươi giòn ngọt tự nhiên, chấm cùng tương sa tế Triều Châu cay dịu.', 0, 0, 1, 1, 1),
('dish-02', 'Xíu Mại Tôm Thịt Gạch Cua', '蟹黄蒸烧卖', 'Xièhuáng Zhēng Shāomài', 'dimsum', 65000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&auto=format&fit=crop&q=80', 'Nhân thịt heo băm quết dẻo cùng tôm tươi ngọt thịt, phủ trên mặt gạch cua biển vàng ươm béo ngậy thơm lừng.', 0, 0, 1, 0, 1),
('dish-03', 'Bánh Bao Kim Sa Trứng Muối Tan Chảy', '黄金流沙包', 'Huángjīn Liúshābāo', 'dimsum', 58000, 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=700&auto=format&fit=crop&q=80', 'Vỏ bánh bao mềm xốp nóng hổi, khi cắn vào sốt trứng muối bơ sữa vàng óng sánh mịn tuôn trào đậm đà khó cưỡng.', 0, 0, 1, 0, 1),
('dish-04', 'Chân Gà Hấp Tàu Xì Cung Đình', '豉汁蒸凤爪', 'Chǐzhī Zhēng Fèngzhuǎ', 'dimsum', 62000, 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=700&auto=format&fit=crop&q=80', 'Chân gà om mềm róc xương thấm đẫm sốt tàu xì lên men truyền thống, ớt đỏ cay nhẹ và hoa hồi thơm nức mũi.', 1, 1, 0, 0, 1),
('dish-05', 'Bánh Cuốn Tôm Tươi Quảng Đông (Cheung Fun)', '广式鲜虾肠粉', 'Guǎngshì Xiānxiā Chángfěn', 'dimsum', 69000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&auto=format&fit=crop&q=80', 'Bánh cuốn tráng hơi mỏng tang mướt mát cuộn tôm sú giòn ngọt, chan ngập nước tương ngọt hảo hạng pha bí truyền.', 0, 0, 0, 0, 1),
('dish-06', 'Vịt Quay Bắc Kinh Da Giòn Thượng Hạng (Nửa Con)', '北京烤鸭 (半只)', 'Běijīng Kǎoyā', 'roast', 380000, 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=700&auto=format&fit=crop&q=80', 'Món ăn hoàng gia lừng danh: da vịt quay lò gỗ phong nâu đỏ giòn rụm, cuốn cùng bánh tráng mỏng, hành boa-rô, dưa chuột và sốt tương ngọt đặc trưng.', 0, 0, 1, 1, 1),
('dish-07', 'Heo Sữa Quay Ma Cao Da Giòn Rụm', '澳门脆皮乳猪', 'Àomén Cuìpí Rǔzhū', 'roast', 290000, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80', 'Lớp da heo giòn tan nổ hạt li ti, thịt bên dưới mọng nước mềm tan không ngấy, chấm cùng tương ngọt hoặc mù tạt vàng bí truyền.', 0, 0, 1, 0, 1),
('dish-08', 'Xá Xíu Mật Ong Thượng Hải', '秘制蜜汁叉烧', 'Mìzhì Mìzhī Chāshāo', 'roast', 165000, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=80', 'Thịt nạc dăm ướp ngũ vị hương và mật ong hoa rừng quay xém cạnh, sốt mật ong sánh đặc bóng bẩy ngọt mặn hài hòa.', 0, 0, 0, 0, 1),
('dish-09', 'Lẩu Tứ Xuyên Uyên Ương 2 Ngăn (Cay Tê & Gà Nấm Thảo Mộc)', '四川麻辣鸳鸯火锅', 'Sìchuān Málà Yuānyāng Huǒguō', 'hotpot', 395000, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80', 'Nồi lẩu đồng chia hai ngăn: Một bên là nước lẩu cay tê ớt hoa tiêu Tứ Xuyên bùng nổ, một bên là nước cốt gà hầm sâm kỷ tử thanh tao bổ dưỡng.', 1, 3, 1, 1, 1),
('dish-10', 'Đậu Hũ Ma Bà Tứ Xuyên (Mapo Tofu)', '正宗麻婆豆腐', 'Zhèngzōng Mápó Dòufu', 'hotpot', 95000, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80', 'Đậu hũ non mềm mượt như lụa xào cùng thịt bò băm, ớt khô Tứ Xuyên và hoa tiêu rang thơm, phủ dầu ớt đỏ bóng bẩy cay nồng tê tái.', 1, 3, 1, 0, 1),
('dish-11', 'Gà Xào Cung Bảo Hoàng Cung (Kung Pao Chicken)', '宫保鸡丁', 'Gōngbǎo Jīdīng', 'hotpot', 135000, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=700&auto=format&fit=crop&q=80', 'Thịt gà xắt hạt lựu xào lửa lớn cùng đậu phộng rang giòn, ớt khô Tứ Xuyên và hành tây, hòa quyện trong nước sốt chua cay mặn ngọt chuẩn vị.', 1, 2, 0, 0, 1),
('dish-12', 'Mì Kéo Bò Lan Châu Nước Trong', '兰州传统牛肉拉面', 'Lánzhōu Niúròu Lāmiàn', 'noodles', 89000, 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=700&auto=format&fit=crop&q=80', 'Sợi mì được nghệ nhân kéo tay tại chỗ tươi mới, nước dùng trong vắt ngọt thanh ninh từ xương bò suốt 12 tiếng cùng 20 loại thảo mộc, điểm vài giọt dầu ớt đỏ.', 1, 1, 1, 1, 1),
('dish-13', 'Mì Hoành Thánh Xá Xíu Cảng Thơm', '港式云吞叉烧面', 'Gǎngshì Yúntūn Chāshāomiàn', 'noodles', 85000, 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=700&auto=format&fit=crop&q=80', 'Sợi mì trứng giòn dai ngập trong nước dùng tôm khô thanh mát, ăn kèm hoành thánh nhân tôm nguyên con giòn sần sật và vài lát xá xíu đỏ au.', 0, 0, 0, 0, 1),
('dish-14', 'Cơm Chiên Dương Châu Hoàng Kim', '扬州黄金炒饭', 'Yángzhōu Chǎofàn', 'noodles', 95000, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700&auto=format&fit=crop&q=80', 'Từng hạt cơm tơi xốp bọc đều lòng đỏ trứng vàng óng, chiên chảo gang lớn cùng tôm sú, xá xíu, lạp xưởng Mai Quế Lộ và đậu Hà Lan giòn ngọt.', 0, 0, 1, 0, 1),
('dish-15', 'Trà Long Tỉnh Tây Hồ Thượng Hạng (Ấm)', '西湖特级龙井茶', 'Xīhú Lóngjǐng Chá', 'tea_dessert', 75000, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=700&auto=format&fit=crop&q=80', 'Đệ nhất danh trà Trung Hoa hái đầu xuân, sắc trà xanh biếc thanh khiết, hương thơm thoang thoảng hạt dẻ bùi ngậy, vị ngọt hậu sâu lắng.', 0, 0, 1, 1, 1),
('dish-16', 'Chè Dương Chi Cam Lộ Xoài Bưởi', '杨枝甘露', 'Yángzhī Gānlù', 'tea_dessert', 52000, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80', 'Món tráng miệng Hong Kong kinh điển: sốt xoài cát hòa quyện nước cốt dừa béo bùi, hạt trân châu báng dẻo dai và tép bưởi hồng thanh chua sảng khoái.', 0, 0, 1, 0, 1),
('dish-17', 'Bánh Tart Trứng Nướng Hong Kong (3 Cái)', '港式酥皮蛋挞', 'Gǎngshì Dàntà', 'tea_dessert', 55000, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=700&auto=format&fit=crop&q=80', 'Vỏ bánh ngàn lớp giòn xốp thơm lừng bơ Pháp, lòng nhân trứng sữa óng ánh núng nính mềm mịn tan ngay đầu lưỡi.', 0, 0, 0, 0, 1),
('dish-manho-01', 'Sứa Biển Dầu Mè & Xốt X.O Thượng Hạng (Jelly Fish With Sesame Oil And X.O Sauce)', 'XO酱麻油海蜇丝', 'XO Jiàng Máyóu Hǎizhésī', 'chef_special', 280000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/jelly-fish-with-sesame-oil-and-x.jpg?width=1000&height=500', 'Sứa biển hoa giòn sần sật ướp dầu mè thơm phức kết hợp xốt X.O thượng hạng từ sò điệp khô, tôm nõn và ớt sừng đặc trưng ẩm thực Quảng Đông truyền thống.', 1, 1, 1, 1, 1),
('dish-manho-02', 'Hải Sâm Kanto Hầm Xốt Bào Ngư (Braised Kanto Sea Cucumber In Superior Abalone Sauce)', '鲍汁关东辽参', 'Bàozhī Guāndōng Liáocān', 'soup_abalone', 1250000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/braised-kanto-sea-cucumber-in-superior-abalone-sauce.jpg?width=1000&height=500', 'Hải sâm Kanto Nhật Bản quý hiếm om liu riu cùng xốt bào ngư hảo hạng cô đặc trong 36 giờ, giàu dưỡng chất và đậm đà phong vị yến tiệc cung đình.', 0, 0, 1, 1, 1),
('dish-manho-03', 'Xá Xíu Heo Iberico Mật Ong Thượng Hạng (Honey Glazed Premium Barbeque Iberico Pork)', '蜜汁顶级黑豚叉烧', 'Mìzhī Dǐngjí Hēitún Chāshāo', 'roast', 420000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/honey-glazed-premium-barbeque-iberico-pork.jpg?width=1000&height=500', 'Thịt heo Iberico Tây Ban Nha nướng than củi mọng nước, áo lớp mật ong hoa rừng vàng óng thơm nức và ngọt thanh tao đặc trưng của bếp trưởng Man Ho.', 0, 0, 1, 1, 1),
('dish-manho-04', 'Phật Nhảy Tường Yến Sào Thượng Hạng (Bird’s Nest Buddha Jumps Over The Wall)', '官燕佛跳墙', 'Guānyàn Fótiàoqiáng', 'soup_abalone', 1680000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/bird-s-nest-buddha-jumps-over-the-wall.jpg?width=1000&height=500', 'Tuyệt phẩm ẩm thực Quảng Đông: tổ yến thượng hạng chưng cùng bào ngư nguyên con, hải sâm Kanto, sò điệp khô và nấm tùng nhung trong nước dùng hầm 48 giờ.', 0, 0, 1, 1, 1),
('dish-manho-05', 'Gà Quý Phi Hấp Thảo Mộc Man Ho (Man Ho Poached Noble Consort Chicken)', '万豪贵妃浸走地鸡', 'Wànháo Guìfēi Jìn Zǒudìjī', 'meat', 450000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/man-ho-poached-noble-consort-chicken.jpg?width=1000&height=500', 'Gà thảo mộc thả vườn da căng mọng vàng óng, ngâm ủ trong nước dùng bí truyền giữ trọn từng thớ thịt mềm ngọt thanh tao, chấm dầu gừng hành tươi.', 0, 0, 1, 1, 1),
('dish-manho-06', 'Chân Giò Phúc Sơn Ướp Lạnh (Chilled Sliced Fu Shan Pork Knuckle)', '冰镇佛山扎蹄', 'Bīngzhèn Fóshān Zhātí', 'chef_special', 320000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/chilled-sliced-fu-shan-pork-knuckle.jpg?width=1000&height=500', 'Món ăn khai vị lừng danh Quảng Đông: chân giò rút xương cuộn gân giòn sần sật, ướp ngũ vị hương và ủ đá lạnh, thái lát mỏng chấm giấm tỏi ớt.', 0, 0, 0, 1, 1),
('dish-manho-07', 'Gà Da Giòn Đặc Biệt Man Ho (Man Ho Special Crispy Chicken)', '万豪招牌当红炸子鸡', 'Wànháo Zhāopái Dānghóng Zhàzǐjī', 'meat', 420000, 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/man-ho-special-crispy-chicken.jpg?width=1000&height=500', 'Kỹ thuật dội dầu đỉnh cao của bếp trưởng Man Ho tạo nên lớp da gà giòn rụm màu cánh gián như thủy tinh, thịt bên trong mềm mọng thơm ngọt khó quên.', 0, 0, 1, 1, 1);

-- ============================================================
-- BẢNG 5: dish_toppings (Topping ăn kèm & gia vị)
-- ============================================================
DROP TABLE IF EXISTS `dish_toppings`;
CREATE TABLE `dish_toppings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dish_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  KEY `fk_toppings_dish` (`dish_id`),
  CONSTRAINT `fk_toppings_dish` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `dish_toppings` (`dish_id`, `name`, `price`) VALUES
('dish-01', 'Thêm nước sốt sa tế đặc biệt', 10000),
('dish-01', 'Rắc gạch tôm rang muối', 15000),
('dish-02', 'Thêm gạch cua béo', 20000),
('dish-02', 'Trứng cút lòng đào', 12000),
('dish-03', 'Thêm 1 bánh bao nhỏ', 25000),
('dish-05', 'Thêm tôm tươi xào', 25000),
('dish-06', 'Thêm 10 lá bánh tráng cuốn', 25000),
('dish-06', 'Chế biến xương vịt rang muối tiêu', 50000),
('dish-07', 'Bánh bao chiên ăn kèm (4 cái)', 28000),
('dish-09', 'Đĩa bò Wagyu nhúng lẩu (150g)', 160000),
('dish-09', 'Nấm tổng hợp thượng hạng', 45000),
('dish-09', 'Váng đậu giòn chiên phồng', 30000),
('dish-09', 'Viên tôm hùm phô mai chảy', 55000),
('dish-10', 'Thêm thịt bò băm', 30000),
('dish-10', 'Tăng cấp độ cay Tứ Xuyên', 5000),
('dish-11', 'Đậu phộng rang thơm thêm', 10000),
('dish-12', 'Thêm bắp bò hoa thái lát', 35000),
('dish-12', 'Trứng ngâm tương lòng đào', 15000),
('dish-12', 'Thêm vắt mì kéo tươi', 20000),
('dish-13', 'Thêm 3 viên hoành thánh tôm', 30000),
('dish-14', 'Thêm tôm sú tươi', 35000),
('dish-manho-01', 'Thêm xốt X.O sò điệp thượng hạng', 45000),
('dish-manho-02', 'Thêm lát bào ngư Nam Phi', 250000),
('dish-manho-03', 'Bánh bao chiên ăn kèm (4 cái)', 35000),
('dish-manho-07', 'Bánh phồng tôm giòn ăn kèm', 20000);

-- ============================================================
-- BẢNG 6: vouchers (Mã ưu đãi & Giảm giá)
-- ============================================================
DROP TABLE IF EXISTS `vouchers`;
CREATE TABLE `vouchers` (
  `code` VARCHAR(50) NOT NULL PRIMARY KEY,
  `badge` VARCHAR(50) DEFAULT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `discount_percent` INT DEFAULT 0,
  `min_order` DECIMAL(12,2) DEFAULT 0.00,
  `tag` VARCHAR(100) DEFAULT NULL,
  `is_active` BOOLEAN DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `vouchers` (`code`, `badge`, `title`, `description`, `discount_percent`, `min_order`, `tag`, `is_active`) VALUES
('HOANGLONG10', 'GIẢM 10%', 'Giảm 10% Hóa Đơn Bàn Đặt Trước', 'Áp dụng cho mọi bàn đặt trước từ 2 khách hoặc đơn đặt món đầu tiên trong ngày.', 10, 300000, 'Ưu Đãi Hoàng Gia', 1),
('DIMSUM50', 'TẶNG 1 XỬNG', 'Tặng 1 Xửng Há Cảo Thủy Tinh', 'Tặng kèm 1 xửng Há cảo tôm tươi hoàng gia cho bàn ăn đi từ 4 khách trở lên.', 0, 400000, 'Quà Tặng Tri Ân', 1),
('LONGTINH', 'MIỄN PHÍ TRÀ', 'Thưởng Trà Long Tỉnh Miễn Phí', 'Thưởng thức ấm trà Long Tỉnh Tây Hồ hảo hạng nguyên chất khi gọi món vịt quay hoặc lẩu.', 0, 250000, 'Danh Trà Cung Đình', 1);

-- ============================================================
-- BẢNG 7: orders (Đơn gọi món tại bàn)
-- ============================================================
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `table_number` VARCHAR(20) NOT NULL,
  `customer_name` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('pending', 'cooking', 'served', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `subtotal` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `vat` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `voucher_code` VARCHAR(50) DEFAULT NULL,
  `payment_method` ENUM('cash', 'transfer', 'card') DEFAULT 'cash',
  `note` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG 8: order_items (Chi tiết món ăn trong từng đơn)
-- ============================================================
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `dish_id` VARCHAR(36) NOT NULL,
  `dish_name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `quantity` INT NOT NULL DEFAULT 1,
  `spice_level` VARCHAR(50) DEFAULT NULL,
  `selected_toppings` TEXT DEFAULT NULL COMMENT 'JSON string',
  `note` TEXT,
  KEY `fk_order_items_order` (`order_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG 9: reservations (Danh sách đặt bàn tiệc trước)
-- ============================================================
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(20) NOT NULL,
  `guests` INT NOT NULL DEFAULT 2,
  `area` ENUM('main', 'vip') NOT NULL DEFAULT 'main',
  `vip_room` VARCHAR(100) DEFAULT NULL,
  `special_requests` TEXT,
  `status` ENUM('confirmed', 'arrived', 'cancelled') DEFAULT 'confirmed',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BẢNG 10: staff_calls (Yêu cầu gọi phục vụ tại bàn)
-- ============================================================
DROP TABLE IF EXISTS `staff_calls`;
CREATE TABLE `staff_calls` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `table_number` VARCHAR(20) NOT NULL,
  `request_type` VARCHAR(100) NOT NULL,
  `status` ENUM('pending', 'resolved') DEFAULT 'pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
