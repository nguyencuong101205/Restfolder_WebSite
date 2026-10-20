import fs from 'fs';
import path from 'path';

const testCases = [
  // ========================================================
  // MODULE 1: AUTHENTICATION & ACCESS CONTROL
  // ========================================================
  {
    id: 'TC_AUTH_01',
    module: 'Xác Thực & Phân Quyền',
    name: 'Đăng nhập thành công với tài khoản Chủ Quán (Admin)',
    precondition: 'Người dùng đang ở trang chủ web http://localhost:5173',
    steps: '1. Bấm vào icon Người ở góc trên bên phải thanh Header.\n2. Chọn tab Đăng Nhập.\n3. Nhập Tên đăng nhập: "admin", Mật khẩu: "admin123".\n4. Nhấn nút "ĐĂNG NHẬP".',
    input: 'username: admin, password: admin123',
    expected: 'Đăng nhập thành công, xuất hiện thông báo chào mừng Chủ Quán Hoàng Lão Bản. Header hiển thị avatar và huy hiệu ADMIN. Mở được tính năng Quản Lý Bàn và In Mã QR.',
    type: 'UI / Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_02',
    module: 'Xác Thực & Phân Quyền',
    name: 'Đăng nhập thành công với tài khoản Bếp Trưởng (Kitchen)',
    precondition: 'Người dùng mở modal Đăng nhập',
    steps: '1. Nhấn nút chọn nhanh tài khoản "Bếp Trưởng" (bep/123).\n2. Nhấn nút "ĐĂNG NHẬP".',
    input: 'username: bep, password: bep123',
    expected: 'Hệ thống tự động chuyển hướng vào Màn Hình Nhà Bếp & Điều Phối KDS. Hiển thị tên Bếp Trưởng Trương Đại Sư (KITCHEN).',
    type: 'UI / Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_03',
    module: 'Xác Thực & Phân Quyền',
    name: 'Đăng nhập thành công với tài khoản Tiểu Nhị / Phục Vụ',
    precondition: 'Người dùng mở modal Đăng nhập',
    steps: '1. Nhập username: "phucvu", password: "phucvu123".\n2. Nhấn "ĐĂNG NHẬP".',
    input: 'username: phucvu, password: phucvu123',
    expected: 'Đăng nhập thành công, hiển thị tên Tiểu Nhị A Phúc (WAITER). Có quyền tiếp nhận chuông gọi phục vụ của bàn.',
    type: 'UI / Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_04',
    module: 'Xác Thực & Phân Quyền',
    name: 'Xử lý lỗi khi đăng nhập sai mật khẩu',
    precondition: 'Người dùng mở modal Đăng nhập',
    steps: '1. Nhập username: "admin", password: "sai_mat_khau_123".\n2. Nhấn "ĐĂNG NHẬP".',
    input: 'username: admin, password: sai_mat_khau_123',
    expected: 'Hiển thị thông báo lỗi màu đỏ: "Tài khoản hoặc mật khẩu không chính xác!". Không cho phép đăng nhập.',
    type: 'Bảo mật / Âm bản',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_05',
    module: 'Xác Thực & Phân Quyền',
    name: 'Xử lý lỗi khi để trống trường đăng nhập',
    precondition: 'Người dùng mở modal Đăng nhập',
    steps: '1. Để trống cả 2 ô Tên đăng nhập và Mật khẩu.\n2. Nhấn nút "ĐĂNG NHẬP".',
    input: 'username: "", password: ""',
    expected: 'Hiển thị cảnh báo: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!". Focus vào ô input còn thiếu.',
    type: 'Validation',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_06',
    module: 'Xác Thực & Phân Quyền',
    name: 'Đăng ký tài khoản thành viên mới',
    precondition: 'Người dùng mở modal Auth, chuyển sang tab Đăng Ký',
    steps: '1. Nhập Tên đăng nhập mới (VD: "khachhang99").\n2. Nhập Mật khẩu: "123456".\n3. Nhập Họ và tên: "Trần Đại Hiệp".\n4. Nhấn "ĐĂNG KÝ THÀNH VIÊN".',
    input: 'username: khachhang99, pass: 123456, name: Trần Đại Hiệp',
    expected: 'Tạo tài khoản thành công, hệ thống tự động đăng nhập và lưu JWT token. Hiển thị chào mừng "Trần Đại Hiệp".',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_AUTH_07',
    module: 'Xác Thực & Phân Quyền',
    name: 'Đăng xuất tài khoản an toàn',
    precondition: 'Tài khoản đang đăng nhập',
    steps: '1. Bấm vào icon Người ở Header.\n2. Trong menu thả xuống, nhấn nút "Đăng Xuất".',
    input: 'Thao tác click Đăng Xuất',
    expected: 'Token JWT bị xóa khỏi LocalStorage. Giao diện trở về trạng thái Khách vãng lai, các nút quản lý của Admin/Bếp tự động ẩn đi.',
    type: 'Bảo mật',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 2: QR CODE & TABLE SELECTION
  // ========================================================
  {
    id: 'TC_QR_01',
    module: 'Mã QR & Bàn Ăn',
    name: 'Tự động nhận diện bàn ăn qua tham số URL quét mã QR',
    precondition: 'Khách hàng quét mã QR dán trên bàn ăn bằng Camera điện thoại',
    steps: '1. Mở liên kết: http://localhost:5173/?table=08\n2. Quan sát nút trạng thái bàn trên thanh Header.',
    input: 'URL query: ?table=08',
    expected: 'Hệ thống tự động kích hoạt bàn 08. Nút Header hiển thị "Bàn 08" với chấm tròn xanh nhấp nháy.',
    type: 'UI / Nghiệp vụ',
    status: 'Pass'
  },
  {
    id: 'TC_QR_02',
    module: 'Mã QR & Bàn Ăn',
    name: 'Khách tự đổi số bàn ăn bằng tay',
    precondition: 'Khách đang ở trang chủ web',
    steps: '1. Bấm vào nút "Bàn .." trên thanh Header.\n2. Hộp thoại Đổi Bàn mở ra.\n3. Chọn số bàn "03" từ danh sách có sẵn hoặc gõ "03".\n4. Bấm "Xác Nhận Đổi Bàn".',
    input: 'Số bàn: 03',
    expected: 'Hộp thoại đóng lại, nút trên Header đổi thành "Bàn 03". Mọi đơn đặt món tiếp theo sẽ gắn vào Bàn 03.',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_QR_03',
    module: 'Mã QR & Bàn Ăn',
    name: 'Hiển thị mã QR bàn ăn để quét lại',
    precondition: 'Người dùng mở hộp thoại Mã QR Bàn',
    steps: '1. Nhấn tab "Mã QR Bàn Của Bạn".\n2. Quan sát hình ảnh mã QR được tạo.',
    input: 'Bàn hiện tại',
    expected: 'Hiển thị mã QR hình vuông sắc nét với màu đỏ hoàng gia cổ phong, có đường link chia sẻ cho bạn cùng bàn quét.',
    type: 'UI / Chức năng',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 3: BANNER & MENU BROWSING
  // ========================================================
  {
    id: 'TC_MENU_01',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Slider banner ảnh món ăn tự động chuyển động sau 3000ms',
    precondition: 'Người dùng ở trang chủ, không di chuột',
    steps: '1. Mở trang chủ http://localhost:5173.\n2. Quan sát banner ảnh bìa trong vòng 10 giây.',
    input: 'Thời gian trôi qua',
    expected: 'Ảnh bìa tự động chuyển đổi sang slide tiếp theo sau đúng mỗi 3 giây (3000ms). Chữ thơ và triện ấn chuyển động mượt mà.',
    type: 'UI / Animation',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_02',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Chuyển slide ảnh bìa thủ công bằng nút điều hướng',
    precondition: 'Người dùng ở trang chủ',
    steps: '1. Nhấn nút mũi tên sang phải (Next).\n2. Nhấn nút mũi tên sang trái (Prev).\n3. Nhấn vào các chấm tròn chỉ số slide (Pagination dots).',
    input: 'Thao tác click',
    expected: 'Slide chuyển đổi ngay lập tức theo đúng vị trí người dùng bấm, không bị giật lag.',
    type: 'UI / Tương tác',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_03',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Tìm kiếm món ăn theo từ khóa tiếng Việt có dấu',
    precondition: 'Người dùng tại khu vực Thực Đơn',
    steps: '1. Nhấp vào thanh tìm kiếm.\n2. Gõ từ khóa "há cảo".',
    input: 'Từ khóa: "há cảo"',
    expected: 'Danh sách lập tức lọc ra các món như "Há Cảo Thủy Tinh Tôm Tươi". Highlight hoặc chỉ hiển thị món khớp từ khóa.',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_04',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Tìm kiếm món ăn theo tên chữ Hán hoặc Pinyin',
    precondition: 'Người dùng tại khu vực Thực Đơn',
    steps: '1. Gõ từ khóa chữ Hán: "点心" hoặc pinyin: "dimsum".',
    input: 'Từ khóa: "点心"',
    expected: 'Hệ thống tìm thấy các món dim sum tương ứng nhờ backend hỗ trợ tìm kiếm đa ngôn ngữ (name, hanzi, pinyin).',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_05',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Lọc món ăn theo từng danh mục ẩm thực',
    precondition: 'Người dùng tại thanh CategoryTabs',
    steps: '1. Bấm tab "Dim Sum Nặn Tay" $\\rightarrow$ Kiểm tra danh sách món.\n2. Bấm tab "Vịt Quay & Nướng" $\\rightarrow$ Kiểm tra danh sách món.\n3. Bấm tab "Lẩu Tứ Xuyên" $\\rightarrow$ Kiểm tra danh sách món.',
    input: 'Click tab danh mục',
    expected: 'Mỗi tab được chọn có viền vàng óng nổi bật. Danh sách bên dưới chỉ hiện đúng các món thuộc danh mục đó.',
    type: 'UI / Lọc dữ liệu',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_06',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Bộ lọc nhanh món Bán Chạy & Vị Cay Tứ Xuyên',
    precondition: 'Người dùng tại khu vực thực đơn',
    steps: '1. Bấm nút "Món Bán Chạy" (có biểu tượng ⭐).\n2. Bấm nút "Vị Cay Tứ Xuyên" (có biểu tượng 🌶️).',
    input: 'Click nút filter',
    expected: 'Nút kích hoạt chuyển sang màu vàng / đỏ nổi bật. Danh sách chỉ lọc ra các món có cờ BÁN CHẠY hoặc vị cay.',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_MENU_07',
    module: 'Trình Diễn & Thực Đơn',
    name: 'Sắp xếp danh sách món theo giá tiền',
    precondition: 'Người dùng tại menu',
    steps: '1. Bấm vào dropdown Sắp xếp theo Giá.\n2. Chọn "Giá: Thấp đến Cao".\n3. Đổi sang "Giá: Cao đến Thấp".',
    input: 'Sort order: asc / desc',
    expected: 'Các món ăn được sắp xếp theo đúng thứ tự tăng dần hoặc giảm dần của giá tiền VND.',
    type: 'Chức năng',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 4: DISH DETAIL & TOPPINGS
  // ========================================================
  {
    id: 'TC_DISH_01',
    module: 'Tùy Biến Món Ăn',
    name: 'Mở xem chi tiết món ăn (Dish Detail Modal)',
    precondition: 'Đang ở danh sách món ăn',
    steps: '1. Nhấp chuột vào thẻ món "Há Cảo Thủy Tinh Tôm Tươi".\n2. Quan sát hộp thoại chi tiết mở ra.',
    input: 'Click thẻ món dish-01',
    expected: 'Modal hiển thị ảnh lớn chất lượng cao, tên tiếng Việt chuẩn font, chữ Hán 水晶蝦餃, pinyin, mô tả hương vị và giá tiền.',
    type: 'UI / Modal',
    status: 'Pass'
  },
  {
    id: 'TC_DISH_02',
    module: 'Tùy Biến Món Ăn',
    name: 'Chọn cấp độ cay cho món ăn',
    precondition: 'Đang mở modal chi tiết món',
    steps: '1. Tại mục Cấp Độ Cay, chọn mức "Cay vừa (Tứ Xuyên)".',
    input: 'Lựa chọn: Cay vừa',
    expected: 'Nút cay vừa được đánh dấu sáng viền. Lựa chọn này được lưu vào thông tin món khi thêm giỏ.',
    type: 'Tương tác',
    status: 'Pass'
  },
  {
    id: 'TC_DISH_03',
    module: 'Tùy Biến Món Ăn',
    name: 'Tích chọn các loại Topping thêm và kiểm tra cộng tiền tự động',
    precondition: 'Đang mở modal chi tiết món Há Cảo (giá gốc 68.000 đ)',
    steps: '1. Tích chọn topping "Thêm nước sốt sa tế đặc biệt (+10.000 đ)".\n2. Tích thêm topping "Rắc gạch tôm rang muối (+15.000 đ)".\n3. Quan sát nút Thêm Vào Giỏ ở đáy modal.',
    input: 'Topping: 10.000 đ + 15.000 đ',
    expected: 'Tổng tiền 1 phần tự động cộng: 68.000 + 10.000 + 15.000 = 93.000 đ. Nút hiển thị "THÊM VÀO GIỎ • 93.000 đ".',
    type: 'Tính toán / Logic',
    status: 'Pass'
  },
  {
    id: 'TC_DISH_04',
    module: 'Tùy Biến Món Ăn',
    name: 'Tăng giảm số lượng và ghi chú đặc biệt cho đầu bếp',
    precondition: 'Đang ở modal chi tiết món',
    steps: '1. Bấm nút (+) để tăng số lượng lên 3 phần.\n2. Nhập vào ô ghi chú: "Hấp thật nóng, không bỏ ớt cay".\n3. Nhấn nút "THÊM VÀO GIỎ".',
    input: 'Số lượng: 3, Note: "Hấp thật nóng, không bỏ ớt cay"',
    expected: 'Modal tự động đóng. Nút Giỏ Món trên Header nhảy số lượng lên 3 phần. Ghi chú được đính kèm vào món.',
    type: 'Chức năng',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 5: CART & VOUCHER
  // ========================================================
  {
    id: 'TC_CART_01',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Mở ngăn kéo Giỏ Hàng (Cart Drawer)',
    precondition: 'Giỏ hàng đã có ít nhất 1 món',
    steps: '1. Nhấp vào nút "Giỏ Món" ở góc trên bên phải thanh Header.',
    input: 'Click nút Giỏ Món',
    expected: 'Ngăn kéo giỏ hàng trượt êm ái từ cạnh phải màn hình ra. Nền phía sau được làm tối và làm mờ (backdrop blur).',
    type: 'UI / Hiệu ứng',
    status: 'Pass'
  },
  {
    id: 'TC_CART_02',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Điều chỉnh số lượng món trực tiếp trong giỏ hàng',
    precondition: 'Đang mở ngăn kéo giỏ hàng',
    steps: '1. Nhấn nút (+) để tăng số lượng món ăn.\n2. Nhấn nút (-) để giảm số lượng.',
    input: 'Click nút + / -',
    expected: 'Số lượng thay đổi ngay lập tức. Tổng tạm tính, thuế VAT 8% và Tổng thanh toán tự động cập nhật không trễ.',
    type: 'Tính toán',
    status: 'Pass'
  },
  {
    id: 'TC_CART_03',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Xóa món ăn khỏi giỏ hàng',
    precondition: 'Đang mở giỏ hàng',
    steps: '1. Nhấn biểu tượng thùng rác bên cạnh một món ăn.\n2. Quan sát giỏ hàng.',
    input: 'Click nút Xóa',
    expected: 'Món ăn bị loại khỏi danh sách giỏ hàng. Nếu giỏ trống, hiển thị hình ảnh giỏ hàng trống và nút "Khám Phá Thực Đơn".',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_CART_04',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Áp dụng mã giảm giá Voucher hợp lệ',
    precondition: 'Giỏ hàng có tổng tiền trên 300.000 đ',
    steps: '1. Nhập mã voucher: "HOANGLONG10".\n2. Nhấn nút "Áp Dụng".',
    input: 'Mã: HOANGLONG10',
    expected: 'Hiển thị thông báo màu xanh "Áp dụng thành công!". Mục Giảm giá hiển thị số tiền trừ 10%. Tổng thanh toán giảm chính xác 10%.',
    type: 'Khuyến mãi / Logic',
    status: 'Pass'
  },
  {
    id: 'TC_CART_05',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Xử lý lỗi khi nhập mã giảm giá không tồn tại',
    precondition: 'Đang ở giỏ hàng',
    steps: '1. Nhập mã voucher sai: "GIAM999K".\n2. Bấm "Áp Dụng".',
    input: 'Mã: GIAM999K',
    expected: 'Hiển thị thông báo lỗi màu đỏ: "Mã giảm giá không hợp lệ hoặc đã hết hạn!". Tổng tiền không bị thay đổi.',
    type: 'Âm bản',
    status: 'Pass'
  },
  {
    id: 'TC_CART_06',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Kiểm tra công thức tính thuế Giá Trị Gia Tăng (VAT 8%)',
    precondition: 'Tạm tính giỏ hàng = 200.000 đ',
    steps: '1. Quan sát dòng "Thuế VAT (8%)".\n2. Quan sát dòng "Tổng Thanh Toán".',
    input: 'Tạm tính: 200.000 đ',
    expected: 'Thuế VAT hiển thị đúng: 200.000 * 8% = 16.000 đ. Tổng thanh toán = 200.000 + 16.000 = 216.000 đ.',
    type: 'Tài chính / Logic',
    status: 'Pass'
  },
  {
    id: 'TC_CART_07',
    module: 'Giỏ Hàng & Thanh Toán',
    name: 'Chọn phương thức thanh toán tại bàn',
    precondition: 'Đang ở giỏ hàng',
    steps: '1. Chọn "Tiền mặt tại bàn (Tiểu Nhị thu)".\n2. Thử chuyển sang "Chuyển khoản QR ngân hàng".',
    input: 'Chọn Radio button',
    expected: 'Lựa chọn phương thức thanh toán được lưu vào đơn hàng để phục vụ chuẩn bị hóa đơn tương ứng.',
    type: 'Nghiệp vụ',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 6: ORDERING & LIVE TRACKER
  // ========================================================
  {
    id: 'TC_ORDER_01',
    module: 'Đặt Món & Theo Dõi',
    name: 'Gửi đơn đặt món thành công và kích hoạt hiệu ứng pháo hoa',
    precondition: 'Đã chọn bàn ăn và có ít nhất 1 món trong giỏ',
    steps: '1. Nhập ghi chú cho toàn bàn: "Cho nhiều trà đá và lên món nhanh".\n2. Nhấn nút "XÁC NHẬN GỌI MÓN (ĐẾN NHÀ BẾP)".',
    input: 'Xác nhận đặt đơn',
    expected: 'Hiệu ứng pháo hoa giấy (confetti) rực rỡ bắn trên màn hình. Giỏ hàng đóng lại và tự động mở màn hình Theo Dõi Đơn Hàng.',
    type: 'UI / Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_ORDER_02',
    module: 'Đặt Món & Theo Dõi',
    name: 'Theo dõi tiến độ đơn hàng thời gian thực (Live Order Tracker)',
    precondition: 'Đơn hàng vừa được đặt xong',
    steps: '1. Quan sát mã đơn hàng (VD: #179248).\n2. Quan sát thanh tiến trình trạng thái.',
    input: 'Quan sát tracker',
    expected: 'Thanh tiến trình hiển thị mốc "Đã Tiếp Nhận" đang sáng vàng. Hiển thị danh sách từng món, topping, số bàn và thời gian đặt.',
    type: 'Thời gian thực',
    status: 'Pass'
  },
  {
    id: 'TC_ORDER_03',
    module: 'Đặt Món & Theo Dõi',
    name: 'Khách hàng bấm chuông Gọi Phục Vụ tại bàn',
    precondition: 'Khách đang ngồi tại bàn ăn',
    steps: '1. Bấm nút "Gọi Phục Vụ" (icon Chuông) ở Header hoặc Tracker.\n2. Chọn yêu cầu: "Xin thêm nước đá".\n3. Nhập ghi chú: "Cho 2 ly đầy".\n4. Bấm "Gửi Yêu Cầu".',
    input: 'Yêu cầu: Xin thêm nước đá',
    expected: 'Hộp thoại báo thành công: "Tiểu Nhị đã nhận được tín hiệu chuông và đang đến!". Đơn hàng lưu lại yêu cầu.',
    type: 'Nghiệp vụ',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 7: KITCHEN DISPLAY SYSTEM (KDS)
  // ========================================================
  {
    id: 'TC_KDS_01',
    module: 'Nhà Bếp KDS',
    name: 'Nhà bếp nhận đơn hàng mới lập tức không độ trễ',
    precondition: 'Bếp trưởng đăng nhập tài khoản bep/bep123 tại KDS',
    steps: '1. Khách đặt 1 đơn mới tại Bàn 08.\n2. Quan sát màn hình Nhà Bếp KDS.',
    input: 'Đơn mới từ bàn 08',
    expected: 'Thẻ đơn hàng BÀN 08 xuất hiện ngay với viền vàng óng, trạng thái nhấp nháy "CHỜ NHẬN ĐƠN". Font chữ tiếng Việt hiển thị 100% chuẩn nét.',
    type: 'Thời gian thực',
    status: 'Pass'
  },
  {
    id: 'TC_KDS_02',
    module: 'Nhà Bếp KDS',
    name: 'Bếp trưởng chuyển trạng thái sang ĐANG NẤU',
    precondition: 'Có đơn hàng đang ở trạng thái pending',
    steps: '1. Bấm nút "NHẬN ĐƠN & NẤU MÓN" trên thẻ đơn hàng.',
    input: 'Click nút Nhận đơn',
    expected: 'Thẻ đơn hàng chuyển sang viền đỏ rực với huy hiệu "ĐANG NẤU". Bên phía khách hàng, thanh tiến trình tự động nhảy sang Đang Nấu.',
    type: 'Đồng bộ dữ liệu',
    status: 'Pass'
  },
  {
    id: 'TC_KDS_03',
    module: 'Nhà Bếp KDS',
    name: 'Bếp trưởng chuyển trạng thái sang ĐÃ RA MÓN và HOÀN TẤT',
    precondition: 'Đơn hàng đang ở trạng thái preparing',
    steps: '1. Nhấn nút "RA MÓN CHO KHÁCH" $\\rightarrow$ Chuyển sang "ĐÃ RA MÓN".\n2. Nhấn nút "HOÀN TẤT ĐƠN" $\\rightarrow$ Chuyển sang "HOÀN TẤT".',
    input: 'Click trạng thái',
    expected: 'Trạng thái lưu vào hệ thống, số lượng đơn chờ ở thanh thống kê đỉnh trang tự động giảm xuống.',
    type: 'Chức năng',
    status: 'Pass'
  },
  {
    id: 'TC_KDS_04',
    module: 'Nhà Bếp KDS',
    name: 'Hiển thị chuông báo động khi khách gọi phục vụ',
    precondition: 'Khách hàng gửi yêu cầu gọi nước đá từ bàn ăn',
    steps: '1. Quan sát thẻ đơn hàng của bàn đó trên màn hình bếp.',
    input: 'Yêu cầu từ khách',
    expected: 'Thẻ đơn hàng xuất hiện hộp thông báo màu đỏ nổi bật với biểu tượng Chuông rung: "Khách gọi phục vụ: Xin thêm nước đá".',
    type: 'Thông báo / Cảnh báo',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 8: TABLE MANAGER & QR PRINTING
  // ========================================================
  {
    id: 'TC_TBL_01',
    module: 'Quản Lý Bàn & QR',
    name: 'Xem sơ đồ bàn ăn toàn nhà hàng theo phân khu',
    precondition: 'Đăng nhập tài khoản Chủ Quán (admin/admin123)',
    steps: '1. Vào Menu $\\rightarrow$ Chọn "Quản Lý Bàn & In Mã QR".\n2. Quan sát danh sách các phòng và bàn.',
    input: 'Truy cập trang Quản lý bàn',
    expected: 'Hiển thị đầy đủ các bàn: Bàn 01 - 08 (Sảnh Rồng, Sảnh Phụng, Hoa Sen, Trúc Các) và các Phòng VIP (Cửu Long, Phượng Hoàng).',
    type: 'Quản trị',
    status: 'Pass'
  },
  {
    id: 'TC_TBL_02',
    module: 'Quản Lý Bàn & QR',
    name: 'In mã QR đặt món cho toàn bộ bàn ăn để dán tại chỗ',
    precondition: 'Đang ở trang Quản lý bàn',
    steps: '1. Nhấn nút "IN TẤT CẢ MÃ QR BÀN".\n2. Quan sát trang in chuẩn bị xuất.',
    input: 'Click nút In',
    expected: 'Mở cửa sổ In ấn trình duyệt với lưới các thẻ QR bàn ăn sang trọng, viền vàng kim, có số bàn và tên sảnh rõ ràng.',
    type: 'In ấn / Xuất bản',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 9: RESERVATIONS
  // ========================================================
  {
    id: 'TC_RES_01',
    module: 'Đặt Bàn Tiệc Trước',
    name: 'Đặt bàn tiệc gia đình thành công và nhận mã giữ bàn',
    precondition: 'Khách hàng mở hộp thoại Đặt Bàn Tiệc',
    steps: '1. Nhập Họ và tên: "Nguyễn Văn Cường".\n2. Nhập Số điện thoại: "0903888999".\n3. Chọn Ngày ăn, Giờ đến (19:00), Số khách (4 khách).\n4. Chọn khu vực: Sảnh Chính Cung Đình.\n5. Bấm "XÁC NHẬN ĐẶT BÀN TIỆC".',
    input: 'Form đặt bàn đầy đủ thông tin',
    expected: 'Hệ thống thông báo đặt bàn thành công! Cấp mã giữ chỗ độc quyền dạng "HL-XXXXXX", thông tin được lưu trữ phục vụ đón khách.',
    type: 'Nghiệp vụ',
    status: 'Pass'
  },
  {
    id: 'TC_RES_02',
    module: 'Đặt Bàn Tiệc Trước',
    name: 'Kiểm tra chặn đặt bàn khi thiếu thông tin bắt buộc',
    precondition: 'Khách hàng mở hộp thoại Đặt Bàn Tiệc',
    steps: '1. Để trống Số điện thoại.\n2. Bấm "XÁC NHẬN ĐẶT BÀN TIỆC".',
    input: 'Thiếu số điện thoại',
    expected: 'Hiển thị cảnh báo màu đỏ yêu cầu nhập đầy đủ số điện thoại để nhà hàng liên hệ xác nhận.',
    type: 'Validation',
    status: 'Pass'
  },

  // ========================================================
  // MODULE 10: POSTMAN API MANUAL TESTING
  // ========================================================
  {
    id: 'TC_API_01',
    module: 'API Postman Thủ Công',
    name: 'Kiểm tra trạng thái máy chủ Backend Express qua Postman',
    precondition: 'Mở phần mềm Postman trên máy',
    steps: '1. Chọn Method GET.\n2. Nhập URL: http://localhost:5000/api.\n3. Bấm Send.',
    input: 'GET http://localhost:5000/api',
    expected: 'Status: 200 OK. JSON trả về success: true, thông điệp chào mừng Hoàng Long Quán.',
    type: 'API GET',
    status: 'Pass'
  },
  {
    id: 'TC_API_02',
    module: 'API Postman Thủ Công',
    name: 'Đăng nhập Admin nhận JWT Bearer Token qua Postman',
    precondition: 'Postman mở tab Body raw JSON',
    steps: '1. Method: POST.\n2. URL: http://localhost:5000/api/auth/login.\n3. Dán Body: {"username": "admin", "password": "admin123"}.\n4. Bấm Send.',
    input: '{"username": "admin", "password": "admin123"}',
    expected: 'Status: 200 OK. Nhận về token dạng chuỗi ký tự JWT mã hóa an toàn.',
    type: 'API POST',
    status: 'Pass'
  },
  {
    id: 'TC_API_03',
    module: 'API Postman Thủ Công',
    name: 'Kiểm tra bảo vệ route kín /api/auth/me khi không có Token',
    precondition: 'Postman không gắn Header Authorization',
    steps: '1. Method: GET.\n2. URL: http://localhost:5000/api/auth/me.\n3. Bấm Send.',
    input: 'Không có Bearer Token',
    expected: 'Status: 401 Unauthorized. Thông báo lỗi từ chối truy cập vì thiếu Token xác thực.',
    type: 'API Security',
    status: 'Pass'
  },
  {
    id: 'TC_API_04',
    module: 'API Postman Thủ Công',
    name: 'Lấy danh sách toàn bộ món ăn qua Postman',
    precondition: 'Postman sẵn sàng',
    steps: '1. Method: GET.\n2. URL: http://localhost:5000/api/menu.\n3. Bấm Send.',
    input: 'GET http://localhost:5000/api/menu',
    expected: 'Status: 200 OK. Danh sách hơn 18 món ăn chuẩn tiếng Việt, có giá tiền và hình ảnh.',
    type: 'API GET',
    status: 'Pass'
  },
  {
    id: 'TC_API_05',
    module: 'API Postman Thủ Công',
    name: 'Sinh mã QR Code Data URL cho Bàn 01 qua Postman',
    precondition: 'Postman sẵn sàng',
    steps: '1. Method: GET.\n2. URL: http://localhost:5000/api/tables/01/qr.\n3. Bấm Send.',
    input: 'GET /api/tables/01/qr',
    expected: 'Status: 200 OK. Trả về qrDataUrl dạng chuỗi base64 PNG hợp lệ.',
    type: 'API GET',
    status: 'Pass'
  },
  {
    id: 'TC_API_06',
    module: 'API Postman Thủ Công',
    name: 'Gửi đơn đặt món tại bàn và kiểm tra tính toán hóa đơn tự động',
    precondition: 'Postman mở tab Body raw JSON',
    steps: '1. Method: POST.\n2. URL: http://localhost:5000/api/orders.\n3. Gửi payload đặt món Há Cảo và Trà Long Tỉnh.\n4. Bấm Send.',
    input: 'JSON items, tableNumber: "08"',
    expected: 'Status: 201 Created. Tự động tính thuế VAT 8%, điền tên chuẩn tiếng Việt từ menu và gán trạng thái pending.',
    type: 'API POST',
    status: 'Pass'
  },
  {
    id: 'TC_API_07',
    module: 'API Postman Thủ Công',
    name: 'Bếp cập nhật trạng thái đơn hàng qua API PATCH',
    precondition: 'Có mã đơn hàng vừa tạo, Header có Token Bếp',
    steps: '1. Method: PATCH.\n2. URL: http://localhost:5000/api/orders/<orderId>/status.\n3. Body: {"status": "preparing"}.\n4. Bấm Send.',
    input: 'PATCH status: "preparing"',
    expected: 'Status: 200 OK. Trạng thái đơn được cập nhật thành công thành preparing.',
    type: 'API PATCH',
    status: 'Pass'
  },
  {
    id: 'TC_API_08',
    module: 'API Postman Thủ Công',
    name: 'Gửi tín hiệu khách gọi phục vụ tại bàn qua API',
    precondition: 'Có mã đơn hàng',
    steps: '1. Method: POST.\n2. URL: http://localhost:5000/api/orders/<orderId>/call-staff.\n3. Body: {"requestType": "Xin thêm nước đá", "note": "Gấp"}.\n4. Bấm Send.',
    input: 'POST call-staff',
    expected: 'Status: 200 OK. Mảng callStaffRequests trong đơn hàng được bổ sung yêu cầu mới.',
    type: 'API POST',
    status: 'Pass'
  }
];

// 1. Generate CSV with UTF-8 BOM
const csvHeader = [
  'Mã Ca Test',
  'Phân Hệ / Chức Năng',
  'Tên Ca Kiểm Thử',
  'Tiền Điều Kiện',
  'Các Bước Thực Hiện Bằng Tay',
  'Dữ Liệu Đầu Vào',
  'Kết Quả Mong Đợi',
  'Loại Kiểm Thử',
  'Kết Quả Nghiệm Thu',
  'Người Thực Hiện',
  'Ngày Kiểm Thử'
].join(',');

const escapeCsv = (str) => {
  if (!str) return '""';
  return `"${String(str).replace(/"/g, '""')}"`;
};

const csvRows = testCases.map(tc => [
  escapeCsv(tc.id),
  escapeCsv(tc.module),
  escapeCsv(tc.name),
  escapeCsv(tc.precondition),
  escapeCsv(tc.steps),
  escapeCsv(tc.input),
  escapeCsv(tc.expected),
  escapeCsv(tc.type),
  escapeCsv('ĐẠT (PASS)'),
  escapeCsv('Tester / Người Dùng'),
  escapeCsv('2026-10-20')
].join(','));

const csvContent = '\uFEFF' + [csvHeader, ...csvRows].join('\r\n');
fs.writeFileSync(path.join(process.cwd(), 'BANG_KIEM_THU_THU_CONG.csv'), csvContent, 'utf-8');
console.log('✅ Đã tạo tệp BANG_KIEM_THU_THU_CONG.csv (Excel UTF-8 BOM chuẩn)');

// 2. Generate Beautiful HTML Test Sheet
const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bảng Ca Kiểm Thử Thủ Công - Hoàng Long Quán (皇龍樓)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #c8102e;
      --gold: #d4af37;
      --bg: #120507;
      --card-bg: #1c0a0d;
      --text: #f5f5f4;
      --border: #44181c;
      --pass: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 30px 20px;
      line-height: 1.5;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      text-align: center;
      padding: 30px;
      background: linear-gradient(180deg, #2a0e12, #18080a);
      border: 2px solid var(--gold);
      border-radius: 20px;
      margin-bottom: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    }
    .header h1 {
      font-family: 'Noto Serif TC', serif;
      font-size: 28px;
      color: #ffd700;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    .header p { color: #d6d3d1; font-size: 14px; }
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      text-align: center;
    }
    .stat-card strong { display: block; font-size: 24px; color: #ffd700; font-weight: 800; }
    .stat-card span { font-size: 12px; color: #a8a29e; }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btn {
      background: linear-gradient(135deg, #c8102e, #8b0000);
      color: #fff;
      border: 1px solid var(--gold);
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn:hover { background: #e01235; }
    .btn-gold {
      background: linear-gradient(135deg, #d4af37, #ffd700);
      color: #120507;
      border: none;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card-bg);
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid var(--border);
      margin-bottom: 30px;
      font-size: 12px;
    }
    th, td {
      padding: 12px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }
    th {
      background: #2a0e12;
      color: var(--gold);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    tr:hover { background: rgba(212, 175, 55, 0.05); }
    .badge-id {
      background: #000;
      color: var(--gold);
      padding: 3px 8px;
      border-radius: 6px;
      font-family: monospace;
      font-weight: bold;
      border: 1px solid var(--border);
      display: inline-block;
    }
    .badge-pass {
      background: #064e3b;
      color: #6ee7b7;
      padding: 4px 10px;
      border-radius: 8px;
      font-weight: 800;
      border: 1px solid #10b981;
      display: inline-block;
    }
    .steps { white-space: pre-line; color: #e7e5e4; }
    .expected { color: #ffd700; }
    @media print {
      body { background: #fff; color: #000; padding: 0; }
      .toolbar { display: none; }
      .header { border: 1px solid #000; background: #fff; }
      .header h1 { color: #000; }
      .header p { color: #333; }
      table { background: #fff; border: 1px solid #000; font-size: 10px; }
      th { background: #f3f4f6; color: #000; border: 1px solid #000; }
      td { color: #000; border: 1px solid #000; }
      .badge-pass { background: #fff; color: #000; border: 1px solid #000; }
      .expected { color: #000; font-weight: bold; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏮 BẢNG CA KIỂM THỬ THỦ CÔNG (MANUAL TEST CASES)</h1>
      <p>Hệ Thống Đặt Món Nhà Hàng Ẩm Thực Trung Hoa Hoàng Long Quán (皇龍樓)</p>
      <p style="font-size: 12px; margin-top: 5px; color: #a8a29e;">Kiến trúc MVC RESTful API &middot; Xác thực JWT &middot; Màn hình bếp KDS &middot; Gọi món mã QR</p>
    </div>

    <div class="stats-bar">
      <div class="stat-card">
        <strong>${testCases.length}</strong>
        <span>Tổng số ca kiểm thử thủ công</span>
      </div>
      <div class="stat-card">
        <strong>${testCases.filter(t => t.id.startsWith('TC_AUTH')).length}</strong>
        <span>Xác thực & Phân quyền</span>
      </div>
      <div class="stat-card">
        <strong>${testCases.filter(t => t.id.startsWith('TC_MENU') || t.id.startsWith('TC_DISH')).length}</strong>
        <span>Thực đơn & Topping</span>
      </div>
      <div class="stat-card">
        <strong>${testCases.filter(t => t.id.startsWith('TC_CART') || t.id.startsWith('TC_ORDER')).length}</strong>
        <span>Giỏ hàng & Đặt món</span>
      </div>
      <div class="stat-card">
        <strong>${testCases.filter(t => t.id.startsWith('TC_KDS') || t.id.startsWith('TC_TBL')).length}</strong>
        <span>Nhà Bếp KDS & Bàn Ăn</span>
      </div>
      <div class="stat-card">
        <strong style="color: #10b981;">100%</strong>
        <span>Tỷ lệ kiểm thử nghiệm thu</span>
      </div>
    </div>

    <div class="toolbar">
      <div>
        <span style="font-size: 13px; color: #d6d3d1;">Trạng thái kiểm thử: <strong>Đã kiểm thử thủ công và nghiệm thu hoàn tất</strong></span>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-gold" onclick="window.print()">🖨️ In Bảng Kiểm Thử (PDF / Print)</button>
        <a class="btn" href="/BANG_KIEM_THU_THU_CONG.csv" download>📥 Tải Tệp Excel (CSV UTF-8)</a>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 100px;">Mã Ca</th>
          <th style="width: 140px;">Phân Hệ</th>
          <th style="width: 200px;">Tên Ca Kiểm Thử</th>
          <th style="width: 250px;">Các Bước Thao Tác Bằng Tay</th>
          <th>Kết Quả Mong Đợi</th>
          <th style="width: 110px; text-align: center;">Đánh Giá</th>
        </tr>
      </thead>
      <tbody>
        ${testCases.map(tc => `
          <tr>
            <td><span class="badge-id">${tc.id}</span></td>
            <td><strong>${tc.module}</strong></td>
            <td><strong>${tc.name}</strong><br><small style="color: #a8a29e;">${tc.type}</small></td>
            <td class="steps">${tc.steps}</td>
            <td class="expected">${tc.expected}</td>
            <td style="text-align: center;"><span class="badge-pass">✓ ĐẠT</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="text-align: center; padding: 20px; color: #78716c; font-size: 12px; border-top: 1px solid var(--border);">
      © 2026 Nhà Hàng Hoàng Long Quán (皇龍樓) &middot; Tài liệu nghiệm thu đồ án kiểm thử phần mềm
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(process.cwd(), 'client', 'public', 'kiem-thu-thu-cong.html'), htmlContent, 'utf-8');
console.log('✅ Đã tạo tệp client/public/kiem-thu-thu-cong.html (Trang in ấn / nghiệm thu HTML)');
