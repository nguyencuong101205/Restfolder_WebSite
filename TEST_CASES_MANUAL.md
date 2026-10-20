# 📋 TÀI LIỆU TOÀN DIỆN CA KIỂM THỬ THỦ CÔNG (MANUAL TEST CASES)
## HỆ THỐNG GỌI MÓN NHÀ HÀNG HOÀNG LONG QUÁN (皇龍樓)

* **Loại kiểm thử**: Kiểm thử thủ công (Manual Testing - Black-box Testing)
* **Phương pháp**: Thao tác trực tiếp bằng tay trên trình duyệt & công cụ Postman
* **Tổng số ca kiểm thử**: **40 Ca kiểm thử chi tiết** chia theo 10 phân hệ
* **Môi trường thử nghiệm**:
  * Giao diện Web: `http://localhost:5173`
  * Máy chủ Backend API: `http://localhost:5000/api`
  * Tệp bảng tính Excel nghiệm thu: [BANG_KIEM_THU_THU_CONG.csv](file:///c:/Users/Bear/Documents/Study/Restfolder_WebSite/BANG_KIEM_THU_THU_CONG.csv)
  * Trang in ấn báo cáo nghiệm thu: `http://localhost:5173/kiem-thu-thu-cong.html`

---

## MỤC LỤC
1. [Phân Hệ 1: Xác Thực & Phân Quyền (TC_AUTH)](#phân-hệ-1-xác-thực--phân-quyền)
2. [Phân Hệ 2: Mã QR & Bàn Ăn (TC_QR)](#phân-hệ-2-mã-qr--bàn-ăn)
3. [Phân Hệ 3: Trình Diễn & Thực Đơn (TC_MENU)](#phân-hệ-3-trình-diễn--thực-đơn)
4. [Phân Hệ 4: Tùy Biến Món Ăn & Topping (TC_DISH)](#phân-hệ-4-tùy-biến-món-ăn--topping)
5. [Phân Hệ 5: Giỏ Hàng & Voucher Khuyến Mãi (TC_CART)](#phân-hệ-5-giỏ-hàng--voucher-khuyến-mãi)
6. [Phân Hệ 6: Đặt Món & Theo Dõi Trực Tuyến (TC_ORDER)](#phân-hệ-6-đặt-món--theo-dõi-trực-tuyến)
7. [Phân Hệ 7: Nhà Bếp KDS Điều Phối (TC_KDS)](#phân-hệ-7-nhà-bếp-kds-điều-phối)
8. [Phân Hệ 8: Quản Lý Bàn & In Mã QR (TC_TBL)](#phân-hệ-8-quản-lý-bàn--in-mã-qr)
9. [Phân Hệ 9: Đặt Bàn Tiệc Trước (TC_RES)](#phân-hệ-9-đặt-bàn-tiệc-trước)
10. [Phân Hệ 10: Ca Kiểm Thử Postman API Thủ Công (TC_API)](#phân-hệ-10-ca-kiểm-thử-postman-api-thủ-công)

---

### PHÂN HỆ 1: XÁC THỰC & PHÂN QUYỀN

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_AUTH_01** | Đăng nhập Admin thành công | 1. Bấm icon Người góc phải Header.<br>2. Nhập username: `admin`, password: `admin123`.<br>3. Bấm "ĐĂNG NHẬP". | `admin / admin123` | Thông báo chào mừng Chủ Quán. Header hiển thị avatar & huy hiệu ADMIN. Mở được Quản lý bàn. | [x] Đạt |
| **TC_AUTH_02** | Đăng nhập Bếp Trưởng thành công | 1. Nhấn nút chọn nhanh "Bếp Trưởng (bep/123)".<br>2. Bấm "ĐĂNG NHẬP". | `bep / bep123` | Tự động chuyển hướng vào Màn Hình Nhà Bếp KDS. Hiển thị quyền KITCHEN. | [x] Đạt |
| **TC_AUTH_03** | Đăng nhập Phục Vụ thành công | 1. Nhập username: `phucvu`, pass: `phucvu123`.<br>2. Bấm "ĐĂNG NHẬP". | `phucvu / phucvu123` | Đăng nhập thành công, vai trò WAITER. Tiếp nhận chuông gọi phục vụ của bàn. | [x] Đạt |
| **TC_AUTH_04** | Đăng nhập sai mật khẩu | 1. Nhập `admin`, pass: `sai_mat_khau`.<br>2. Bấm "ĐĂNG NHẬP". | `admin / sai_pass` | Thông báo lỗi đỏ: "Tài khoản hoặc mật khẩu không chính xác!". Chặn truy cập. | [x] Đạt |
| **TC_AUTH_05** | Để trống trường đăng nhập | 1. Để trống cả 2 ô.<br>2. Bấm "ĐĂNG NHẬP". | Rỗng | Cảnh báo: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!". | [x] Đạt |
| **TC_AUTH_06** | Đăng ký tài khoản thành viên mới | 1. Chuyển sang tab Đăng Ký.<br>2. Nhập username, mật khẩu, họ tên.<br>3. Bấm "ĐĂNG KÝ THÀNH VIÊN". | `khach99 / 123456` | Đăng ký thành công, tự động đăng nhập và lưu JWT token. | [x] Đạt |
| **TC_AUTH_07** | Đăng xuất tài khoản an toàn | 1. Bấm icon Người.<br>2. Bấm nút "Đăng Xuất". | Click Đăng xuất | Xóa sạch Token JWT khỏi LocalStorage. Trở về trạng thái khách vãng lai. | [x] Đạt |

---

### PHÂN HỆ 2: MÃ QR & BÀN ĂN

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_QR_01** | Nhận diện bàn qua quét QR | 1. Mở link: `http://localhost:5173/?table=08`.<br>2. Quan sát nút bàn trên Header. | `?table=08` | Nút trên Header hiển thị "Bàn 08" với chấm xanh nhấp nháy. Mọi món gọi sẽ gắn vào Bàn 08. | [x] Đạt |
| **TC_QR_02** | Khách tự đổi bàn bằng tay | 1. Bấm vào nút Bàn trên Header.<br>2. Chọn số bàn "03" $\rightarrow$ Bấm Xác Nhận. | Bàn 03 | Nút đổi thành "Bàn 03", lưu lại phiên làm việc cho bàn 03. | [x] Đạt |
| **TC_QR_03** | Xem mã QR bàn ăn để chia sẻ | 1. Bấm nút Bàn $\rightarrow$ Xem tab "Mã QR Bàn". | Bàn hiện tại | Mã QR sắc nét nền kem chữ đỏ hoàng triều, kèm link đặt món để bạn cùng bàn quét. | [x] Đạt |

---

### PHÂN HỆ 3: TRÌNH DIỄN & THỰC ĐƠN

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_MENU_01** | Slider ảnh tự chuyển 3000ms | 1. Mở trang chủ, không di chuột trong 10s.<br>2. Quan sát banner. | Thời gian trôi | Ảnh tự chuyển đổi sang slide kế tiếp sau đúng 3 giây (3000ms). Chữ thơ trượt vào êm dịu. | [x] Đạt |
| **TC_MENU_02** | Chuyển slide thủ công | 1. Bấm mũi tên trái / phải.<br>2. Bấm các chấm tròn chuyển slide. | Click mũi tên / dots | Slide chuyển đổi ngay lập tức, không bị giật lag. | [x] Đạt |
| **TC_MENU_03** | Tìm kiếm món tiếng Việt | 1. Gõ từ khóa "há cảo" vào thanh tìm kiếm. | `"há cảo"` | Lọc ngay các món như "Há Cảo Thủy Tinh Tôm Tươi". | [x] Đạt |
| **TC_MENU_04** | Tìm kiếm bằng chữ Hán/Pinyin | 1. Gõ từ khóa chữ Hán: "点心" hoặc pinyin: "dimsum". | `"点心"` | Tìm thấy đúng các món dim sum nhờ backend tìm kiếm đa ngôn ngữ. | [x] Đạt |
| **TC_MENU_05** | Lọc theo danh mục ẩm thực | 1. Bấm thử các tab: Dim Sum, Vịt Quay, Lẩu Tứ Xuyên. | Click tab danh mục | Tab được chọn sáng viền vàng kim, danh sách món bên dưới cập nhật chính xác. | [x] Đạt |
| **TC_MENU_06** | Lọc nhanh Cay & Bán Chạy | 1. Bấm nút "Món Bán Chạy" ⭐.<br>2. Bấm nút "Vị Cay Tứ Xuyên" 🌶️. | Click filter pill | Danh sách chỉ hiện các món có huy hiệu BÁN CHẠY hoặc gắn ớt cay. | [x] Đạt |
| **TC_MENU_07** | Sắp xếp món theo giá tiền | 1. Chọn Giá Thấp $\rightarrow$ Cao.<br>2. Chọn Giá Cao $\rightarrow$ Thấp. | Sort dropdown | Danh sách sắp xếp chuẩn xác theo giá tiền VND. | [x] Đạt |

---

### PHÂN HỆ 4: TÙY BIẾN MÓN ĂN & TOPPING

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_DISH_01** | Xem chi tiết món ăn | 1. Nhấp chuột vào thẻ món ăn. | Click thẻ món | Modal mở ra với ảnh lớn, tên tiếng Việt, chữ Hán, pinyin, mô tả và giá tiền. | [x] Đạt |
| **TC_DISH_02** | Chọn cấp độ cay | 1. Chọn mức "Cay vừa (Tứ Xuyên)". | Cay vừa | Nút được đánh dấu, lưu vào thuộc tính món khi thêm giỏ. | [x] Đạt |
| **TC_DISH_03** | Tích chọn topping cộng tiền | 1. Tích chọn topping sốt sa tế (+10k).<br>2. Tích thêm gạch tôm rang muối (+15k). | 2 topping | Nút Thêm vào giỏ tự cộng tiền: 68k + 10k + 15k = 93.000 đ chuẩn xác. | [x] Đạt |
| **TC_DISH_04** | Tăng số lượng & ghi chú | 1. Bấm (+) tăng lên 3 phần.<br>2. Ghi chú: "Hấp thật nóng".<br>3. Bấm Thêm Vào Giỏ. | SL: 3, Note | Modal đóng, giỏ hàng tăng số lượng lên 3, đính kèm ghi chú cho bếp. | [x] Đạt |

---

### PHÂN HỆ 5: GIỎ HÀNG & VOUCHER KHUYẾN MÃI

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_CART_01** | Mở ngăn kéo giỏ hàng | 1. Nhấp nút "Giỏ Món" góc phải Header. | Click Giỏ Món | Ngăn kéo trượt ra từ bên phải, nền phía sau làm mờ (backdrop blur). | [x] Đạt |
| **TC_CART_02** | Tăng giảm số lượng trong giỏ | 1. Nhấn nút (+) hoặc (-) cạnh món. | Click + / - | Số lượng thay đổi, tạm tính, thuế VAT 8% và tổng tiền tự tính lại. | [x] Đạt |
| **TC_CART_03** | Xóa món ăn khỏi giỏ | 1. Bấm biểu tượng Thùng rác. | Click Xóa | Món bị xóa. Nếu giỏ trống, hiện hình ảnh minh họa giỏ rỗng. | [x] Đạt |
| **TC_CART_04** | Áp dụng Voucher hợp lệ | 1. Nhập mã: `HOANGLONG10`.<br>2. Bấm "Áp Dụng". | `HOANGLONG10` | Báo thành công, hiển thị giảm giá -10%, tổng tiền thanh toán giảm tương ứng. | [x] Đạt |
| **TC_CART_05** | Nhập Voucher không tồn tại | 1. Nhập mã sai: `GIAM999K`.<br>2. Bấm "Áp Dụng". | `GIAM999K` | Báo lỗi đỏ: "Mã giảm giá không hợp lệ!". Tổng tiền giữ nguyên. | [x] Đạt |
| **TC_CART_06** | Kiểm tra công thức thuế VAT 8% | 1. Quan sát dòng VAT (8%) khi tạm tính là 200.000 đ. | 200.000 đ | Thuế VAT hiển thị đúng: 16.000 đ. Tổng thanh toán = 216.000 đ. | [x] Đạt |
| **TC_CART_07** | Chọn phương thức thanh toán | 1. Chọn Tiền mặt hoặc Chuyển khoản QR. | Radio button | Lựa chọn được lưu vào đơn để nhân viên chuẩn bị hóa đơn phù hợp. | [x] Đạt |

---

### PHÂN HỆ 6: ĐẶT MÓN & THEO DÕI TRỰC TUYẾN

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_ORDER_01** | Gửi đơn & Bắn pháo hoa | 1. Bấm "XÁC NHẬN GỌI MÓN (ĐẾN NHÀ BẾP)". | Xác nhận đặt | Pháo hoa giấy bắn rực rỡ, giỏ hàng làm trống và tự mở màn hình Theo dõi đơn. | [x] Đạt |
| **TC_ORDER_02** | Theo dõi tiến độ Live Tracker | 1. Quan sát màn hình theo dõi đơn hàng. | Quan sát | Hiển thị mã đơn #XXXXXX, số bàn, mốc "Đã Tiếp Nhận" sáng đèn vàng. | [x] Đạt |
| **TC_ORDER_03** | Khách bấm chuông gọi phục vụ | 1. Bấm nút Gọi Phục Vụ (icon Chuông).<br>2. Chọn "Xin thêm nước đá" $\rightarrow$ Gửi đi. | Nước đá | Báo thành công "Tiểu Nhị đã nhận tín hiệu!". Đơn hàng lưu lại yêu cầu. | [x] Đạt |

---

### PHÂN HỆ 7: NHÀ BẾP KDS ĐIỀU PHỐI

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_KDS_01** | Bếp nhận đơn mới tức thì | 1. Khách đặt đơn mới tại Bàn 08.<br>2. Quan sát màn hình KDS. | Đơn từ bàn 08 | Thẻ BÀN 08 xuất hiện ngay với viền vàng "CHỜ NHẬN ĐƠN". Font tiếng Việt 100% chuẩn nét. | [x] Đạt |
| **TC_KDS_02** | Bếp chuyển sang ĐANG NẤU | 1. Bấm nút "NHẬN ĐƠN & NẤU MÓN". | Click nhận đơn | Thẻ chuyển viền đỏ "ĐANG NẤU". Phía khách hàng tracker tự nhảy sang Đang Nấu. | [x] Đạt |
| **TC_KDS_03** | Bếp chuyển ĐÃ RA MÓN | 1. Bấm "RA MÓN CHO KHÁCH" $\rightarrow$ "HOÀN TẤT". | Click trạng thái | Trạng thái cập nhật, số lượng đơn chờ ở thanh thống kê giảm xuống. | [x] Đạt |
| **TC_KDS_04** | Chuông báo động gọi phục vụ | 1. Khách gọi nước đá từ bàn ăn. | Tín hiệu chuông | Thẻ đơn hàng của bàn rung chuông nhấp nháy: "Khách gọi phục vụ: Xin thêm nước đá". | [x] Đạt |

---

### PHÂN HỆ 8: QUẢN LÝ BÀN & IN MÃ QR

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_TBL_01** | Xem sơ đồ bàn ăn toàn quán | 1. Vào Menu $\rightarrow$ "Quản Lý Bàn & In Mã QR". | Tài khoản Admin | Hiển thị sơ đồ các sảnh: Sảnh Rồng, Sảnh Phụng, Hoa Sen, Trúc Các và Phòng VIP. | [x] Đạt |
| **TC_TBL_02** | In tất cả mã QR bàn ăn | 1. Nhấn nút "IN TẤT CẢ MÃ QR BÀN". | Click In | Mở hộp thoại In trình duyệt với lưới thẻ QR viền vàng sang trọng để dán bàn. | [x] Đạt |

---

### PHÂN HỆ 9: ĐẶT BÀN TIỆC TRƯỚC

| Mã Ca | Tên Ca Kiểm Thử | Các Bước Thao Tác Bằng Tay | Dữ Liệu Đầu Vào | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_RES_01** | Đặt bàn tiệc gia đình thành công | 1. Điền họ tên, số điện thoại, ngày giờ, số khách.<br>2. Bấm "XÁC NHẬN ĐẶT BÀN TIỆC". | Form đầy đủ | Đặt bàn thành công! Cấp mã giữ bàn dạng "HL-XXXXXX", lưu trữ trên hệ thống. | [x] Đạt |
| **TC_RES_02** | Bỏ trống số điện thoại | 1. Bỏ trống số điện thoại.<br>2. Bấm Xác Nhận. | Thiếu SĐT | Cảnh báo yêu cầu nhập số điện thoại để nhà hàng liên hệ xác nhận. | [x] Đạt |

---

### PHÂN HỆ 10: CA KIỂM THỬ POSTMAN API THỦ CÔNG

| Mã Ca | Tên Request Postman | Các Bước Thao Tác Trong Postman | URL & Method | Kết Quả Mong Đợi | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC_API_01** | Kiểm tra Server API | 1. Method GET $\rightarrow$ Nhập URL $\rightarrow$ Bấm Send. | `GET /api` | Status: 200 OK. JSON trả về thông điệp chào mừng và danh sách endpoint. | [x] Đạt |
| **TC_API_02** | Đăng nhập Admin lấy Token | 1. Method POST $\rightarrow$ Body JSON $\rightarrow$ Bấm Send. | `POST /api/auth/login` | Status: 200 OK. Nhận về chuỗi JWT token trong trường `data.token`. | [x] Đạt |
| **TC_API_03** | Chặn request thiếu Token | 1. Method GET $\rightarrow$ Không gửi Authorization header. | `GET /api/auth/me` | Status: 401 Unauthorized. Từ chối truy cập vì thiếu Bearer Token. | [x] Đạt |
| **TC_API_04** | Lấy toàn bộ thực đơn | 1. Method GET $\rightarrow$ Bấm Send. | `GET /api/menu` | Status: 200 OK. Danh sách hơn 18 món ăn chuẩn tiếng Việt UTF-8. | [x] Đạt |
| **TC_API_05** | Sinh mã QR Code cho Bàn 01 | 1. Method GET $\rightarrow$ Bấm Send. | `GET /api/tables/01/qr` | Status: 200 OK. Trả về `qrDataUrl` dạng chuỗi base64 PNG hợp lệ. | [x] Đạt |
| **TC_API_06** | Gửi đơn đặt món tại bàn | 1. Method POST $\rightarrow$ Dán payload món ăn $\rightarrow$ Send. | `POST /api/orders` | Status: 201 Created. Tự động tính 8% VAT và tổng tiền, gán trạng thái pending. | [x] Đạt |
| **TC_API_07** | Bếp đổi trạng thái đơn | 1. Method PATCH $\rightarrow$ Header Token Bếp $\rightarrow$ Send. | `PATCH /api/orders/:id/status` | Status: 200 OK. Trạng thái cập nhật thành `preparing`. | [x] Đạt |
| **TC_API_08** | Khách bấm chuông gọi nước | 1. Method POST $\rightarrow$ Dán payload yêu cầu $\rightarrow$ Send. | `POST /api/orders/:id/call-staff` | Status: 200 OK. Đơn hàng lưu lại yêu cầu gọi nước đá. | [x] Đạt |

---

## 5. HƯỚNG DẪN XUẤT VÀ NỘP BÁO CÁO NGHIỆM THU
* **Mở trong Microsoft Excel**: Mở tệp [BANG_KIEM_THU_THU_CONG.csv](file:///c:/Users/Bear/Documents/Study/Restfolder_WebSite/BANG_KIEM_THU_THU_CONG.csv), đã mã hóa UTF-8 BOM chống lỗi font tiếng Việt 100%.
* **Xem và in trực tiếp trên trình duyệt**: Mở liên kết `http://localhost:5173/kiem-thu-thu-cong.html` rồi nhấn nút **In Bảng Kiểm Thử (PDF / Print)**.
* **Tự tích chọn checklist trên trang web**: Bấm nút **Menu** $\rightarrow$ chọn **"Kiểm Thử API & Postman"** (hoặc dưới chân trang Footer).
