import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Download,
  X,
  FileText,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ClipboardList,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { ChineseSeal } from './ChineseSeal';

export const TestRunnerModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('manual_ui'); // 'manual_ui' | 'manual_postman' | 'report'
  const [copiedId, setCopiedId] = useState(null);

  // Manual Test status state: 'untested' | 'pass' | 'fail'
  const [evaluations, setEvaluations] = useState(() => {
    try {
      const saved = localStorage.getItem('hoanglong_manual_evaluations');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hoanglong_manual_evaluations', JSON.stringify(evaluations));
    } catch {}
  }, [evaluations]);

  const setStatus = (testId, status) => {
    setEvaluations(prev => ({
      ...prev,
      [testId]: prev[testId] === status ? 'untested' : status
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. Manual UI Test Cases
  const uiTestCases = [
    {
      id: 'TC_UI_01',
      title: '1. Kiểm tra Thanh Header & Logo Triện Ấn',
      steps: [
        'Quan sát góc trên bên trái Header: Có Logo triện ấn "皇龍" và tên "HOÀNG LONG QUÁN".',
        'Góc phải có nút hiển thị số bàn (VD: "Bàn 08") và nút Giỏ Món.'
      ],
      expected: 'Giao diện hiển thị sắc nét, phong cách cung đình cổ phong, không lệch layout.'
    },
    {
      id: 'TC_UI_02',
      title: '2. Kiểm tra Slider Trình Diễn Ảnh Món Ăn',
      steps: [
        'Không thao tác chuột trong 3 giây: Xem ảnh bìa có tự động chuyển đổi không.',
        'Bấm vào nút mũi tên trái / phải để chuyển ảnh thủ công.'
      ],
      expected: 'Ảnh chuyển động mượt mà đúng 3000ms/lần, chữ thư pháp và mô tả bay vào êm dịu.'
    },
    {
      id: 'TC_UI_03',
      title: '3. Tự Đổi Bàn Ăn Bằng Tay',
      steps: [
        'Bấm vào nút "Bàn .." trên thanh Header.',
        'Nhập số bàn mới (ví dụ: "05") rồi bấm "Xác Nhận Đổi Bàn".'
      ],
      expected: 'Nút trên Header đổi thành "Bàn 05", hệ thống ghi nhớ số bàn mới cho phiên đặt món.'
    },
    {
      id: 'TC_UI_04',
      title: '4. Tự Tìm Kiếm Món Ăn',
      steps: [
        'Bấm vào ô tìm kiếm có kính lúp.',
        'Gõ từ khóa "bào ngư" hoặc "vịt".'
      ],
      expected: 'Danh sách bên dưới tự động lọc theo thời gian thực đúng các món ăn chứa từ khóa.'
    },
    {
      id: 'TC_UI_05',
      title: '5. Tự Lọc Danh Mục & Món Bán Chạy / Cay',
      steps: [
        'Bấm thử các tab: "Dim Sum Nặn Tay", "Vịt Quay & Nướng", "Lẩu Tứ Xuyên".',
        'Bấm thử nút lọc nhanh "Món Bán Chạy" ⭐ hoặc "Vị Cay Tứ Xuyên" 🌶️.'
      ],
      expected: 'Tab đang chọn sáng viền vàng óng, danh sách cập nhật chính xác nhóm món tương ứng.'
    },
    {
      id: 'TC_UI_06',
      title: '6. Xem Chi Tiết, Chọn Topping & Ghi Chú',
      steps: [
        'Nhấp chuột vào một thẻ món ăn (VD: "Há Cảo Thủy Tinh Tôm Tươi").',
        'Tích chọn topping thêm sốt sa tế (+10k), chọn mức độ cay, nhập ghi chú "Hấp nóng".'
      ],
      expected: 'Modal hiển thị đầy đủ, tiền tạm tính tự động cộng thêm giá topping chính xác.'
    },
    {
      id: 'TC_UI_07',
      title: '7. Thêm Vào Giỏ & Kiểm Tra Giỏ Món (Cart Drawer)',
      steps: [
        'Bấm "THÊM VÀO GIỎ HÀNG".',
        'Bấm mở "Giỏ Món" trên góc phải Header.',
        'Thử bấm nút (+) để tăng số lượng lên 2 phần.'
      ],
      expected: 'Giỏ trượt mượt mà từ phải sang, số lượng tăng, tổng tiền & 8% VAT tự động tính lại.'
    },
    {
      id: 'TC_UI_08',
      title: '8. Áp Dụng Mã Giảm Giá & Xác Nhận Gọi Món',
      steps: [
        'Trong giỏ hàng, nhập mã voucher "HOANGLONG10" $\\rightarrow$ Bấm Áp Dụng.',
        'Bấm nút "XÁC NHẬN GỌI MÓN".'
      ],
      expected: 'Pháo hoa giấy (confetti) bắn chúc mừng, đơn hàng được gửi và mở màn hình Theo dõi đơn.'
    },
    {
      id: 'TC_UI_09',
      title: '9. Kiểm Tra Màn Hình Theo Dõi Tiến Độ Đơn (Live Tracker)',
      steps: [
        'Quan sát thanh tiến trình trạng thái: Chờ nhận đơn $\\rightarrow$ Đang nấu $\\rightarrow$ Đã ra món.',
        'Bấm nút "Gọi Phục Vụ" $\\rightarrow$ Chọn "Xin thêm nước đá" $\\rightarrow$ Gửi đi.'
      ],
      expected: 'Hiển thị chính xác số bàn, mã đơn, danh sách món và thông báo chuông gọi phục vụ.'
    },
    {
      id: 'TC_UI_10',
      title: '10. Màn Hình Điều Phối Bếp KDS (Kitchen Dashboard)',
      steps: [
        'Mở Menu $\\rightarrow$ Chọn "Màn Hình Bếp KDS" $\\rightarrow$ Đăng nhập với tài khoản "bep" / "bep123".',
        'Quan sát thẻ đơn hàng bàn vừa gọi.',
        'Bấm nút "BẮT ĐẦU NẤU" $\\rightarrow$ Thẻ chuyển sang màu đỏ "ĐANG NẤU".'
      ],
      expected: 'Font chữ tiếng Việt hiển thị 100% chuẩn đẹp có dấu (không bị dấu hỏi ? hay lỗi font).'
    }
  ];

  // 2. Manual Postman Test Cases
  const postmanTestCases = [
    {
      id: 'TC_PM_01',
      title: '1. Kiểm tra API Server hoạt động',
      method: 'GET',
      url: 'http://localhost:5000/api',
      body: null,
      steps: 'Chọn GET $\\rightarrow$ dán URL $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. JSON trả về thông điệp chào mừng và danh sách endpoint.'
    },
    {
      id: 'TC_PM_02',
      title: '2. Tự Đăng nhập Admin lấy Token JWT',
      method: 'POST',
      url: 'http://localhost:5000/api/auth/login',
      body: JSON.stringify({ username: 'admin', password: 'admin123' }, null, 2),
      steps: 'Chọn POST $\\rightarrow$ Tab Body chọn raw JSON $\\rightarrow$ Dán payload $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. Nhận về chuỗi JWT token trong trường data.token.'
    },
    {
      id: 'TC_PM_03',
      title: '3. Thử đăng nhập sai mật khẩu (Test âm bản)',
      method: 'POST',
      url: 'http://localhost:5000/api/auth/login',
      body: JSON.stringify({ username: 'admin', password: 'saimatkhau' }, null, 2),
      steps: 'Nhập mật khẩu sai để kiểm tra bảo mật $\\rightarrow$ Bấm Send.',
      expected: 'Status: 401 Unauthorized. Thông báo: "Tài khoản hoặc mật khẩu không chính xác!".'
    },
    {
      id: 'TC_PM_04',
      title: '4. Tự lấy danh sách thực đơn món ăn',
      method: 'GET',
      url: 'http://localhost:5000/api/menu',
      body: null,
      steps: 'Chọn GET $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. Mảng data chứa đầy đủ danh sách món ăn chuẩn tiếng Việt.'
    },
    {
      id: 'TC_PM_05',
      title: '5. Tự lọc món theo danh mục Dim Sum',
      method: 'GET',
      url: 'http://localhost:5000/api/menu?category=dimsum',
      body: null,
      steps: 'Thêm query param category=dimsum $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. Toàn bộ các món trả về đều thuộc danh mục "dimsum".'
    },
    {
      id: 'TC_PM_06',
      title: '6. Tự sinh mã QR Code cho Bàn 01',
      method: 'GET',
      url: 'http://localhost:5000/api/tables/01/qr',
      body: null,
      steps: 'Chọn GET $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. Nhận về chuỗi Base64 Data URL ảnh mã QR (data:image/png;base64,...).'
    },
    {
      id: 'TC_PM_07',
      title: '7. Tự gửi đơn đặt món tại Bàn 08',
      method: 'POST',
      url: 'http://localhost:5000/api/orders',
      body: JSON.stringify({
        tableNumber: '08',
        customerName: 'Khách Bàn 08',
        items: [
          {
            id: 'dish-01',
            quantity: 2,
            spiceLevel: 'Không cay',
            selectedToppings: [{ name: 'Thêm nước sốt sa tế đặc biệt', price: 10000 }]
          }
        ],
        note: 'Ưu tiên lên nhanh giúp bàn tôi'
      }, null, 2),
      steps: 'Chọn POST $\\rightarrow$ Body raw JSON $\\rightarrow$ Dán payload $\\rightarrow$ Bấm Send.',
      expected: 'Status: 201 Created. Đơn tạo thành công, tự tính 8% VAT và tổng tiền chuẩn xác.'
    },
    {
      id: 'TC_PM_08',
      title: '8. Bếp chuyển trạng thái đơn sang Đang Nấu',
      method: 'PATCH',
      url: 'http://localhost:5000/api/orders/ord-1792395351304/status',
      body: JSON.stringify({ status: 'preparing' }, null, 2),
      steps: 'Chọn PATCH $\\rightarrow$ Headers thêm Authorization: Bearer <token_bep> $\\rightarrow$ Bấm Send.',
      expected: 'Status: 200 OK. Trạng thái đơn cập nhật thành "preparing".'
    }
  ];

  const totalCases = uiTestCases.length + postmanTestCases.length;
  const allIds = [...uiTestCases.map(t => t.id), ...postmanTestCases.map(t => t.id)];
  const passedCount = allIds.filter(id => evaluations[id] === 'pass').length;
  const failedCount = allIds.filter(id => evaluations[id] === 'fail').length;
  const completedCount = passedCount + failedCount;
  const completionRate = Math.round((completedCount / totalCases) * 100);

  const resetAll = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ kết quả tự kiểm thử không?')) {
      setEvaluations({});
    }
  };

  const handleDownloadPostman = (type) => {
    const filename = type === 'env'
      ? 'HoangLongQuan_Environment.postman_environment.json'
      : 'HoangLongQuan_API.postman_collection.json';
    const a = document.createElement('a');
    a.href = `/postman/${filename}`;
    a.download = filename;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#150608] border-2 border-amber-500/70 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3b1216] bg-[#1e0a0d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChineseSeal text="檢測" subtext="手動" className="w-10 h-10 flex-shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-2">
                <span>SỔ TAY TỰ KIỂM THỬ THỦ CÔNG (MANUAL TEST CHECKLIST)</span>
                <span className="text-[10px] bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full font-bold">
                  BẰNG TAY
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Tự thực hiện từng bước kiểm tra theo kịch bản, đối chiếu kết quả và tự đánh dấu Đạt / Chưa đạt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-800 text-stone-400 hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Quick Stats */}
        <div className="px-5 py-3 bg-[#110405] border-b border-[#2b0e11] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-stone-300 font-semibold">Tiến độ tự kiểm thử:</span>
            <div className="w-36 sm:w-56 h-2.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <strong className="text-amber-300 font-mono font-bold">
              {completedCount}/{totalCases} ({completionRate}%)
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
              ✓ Đạt: {passedCount}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 font-bold">
              ✗ Lỗi: {failedCount}
            </span>
            <button
              onClick={resetAll}
              className="text-[11px] text-stone-400 hover:text-stone-200 underline ml-2"
            >
              Đặt lại
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#2d1013] bg-[#140608]">
          <button
            onClick={() => setActiveTab('manual_ui')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'manual_ui'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Tự Kiểm Thử Giao Diện (10 Ca UI)</span>
          </button>

          <button
            onClick={() => setActiveTab('manual_postman')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'manual_postman'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Tự Kiểm Thử Postman (8 Ca API)</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'report'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Biên Bản & Báo Cáo Nghiệm Thu</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          
          {/* TAB 1: MANUAL UI CHECKLIST */}
          {activeTab === 'manual_ui' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#1d0b0e] border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Hướng dẫn:</strong> Bạn hãy tự dùng chuột và bàn phím thao tác theo từng bước mô tả bên dưới, sau đó bấm nút <strong>[✓ Đạt]</strong> hoặc <strong>[✗ Lỗi]</strong> để ghi nhận kết quả.
                </span>
              </div>

              {uiTestCases.map((tc) => {
                const status = evaluations[tc.id] || 'untested';
                return (
                  <div
                    key={tc.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      status === 'pass'
                        ? 'bg-[#0f1f14] border-emerald-500/50'
                        : status === 'fail'
                        ? 'bg-[#240c0f] border-red-500/50'
                        : 'bg-[#18080a] border-[#311115]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-amber-300">
                            {tc.id}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-stone-100">
                            {tc.title}
                          </h4>
                        </div>

                        {/* Steps */}
                        <div className="pl-3 border-l-2 border-amber-500/30 space-y-1 text-xs text-stone-300">
                          {tc.steps.map((step, sIdx) => (
                            <p key={sIdx} className="leading-relaxed">
                              • {step}
                            </p>
                          ))}
                        </div>

                        {/* Expected */}
                        <div className="text-[11px] text-amber-300/90 pt-1">
                          <strong>Kết quả cần thấy:</strong> {tc.expected}
                        </div>
                      </div>

                      {/* Manual Action Buttons */}
                      <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setStatus(tc.id, 'pass')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all w-full justify-center ${
                            status === 'pass'
                              ? 'bg-emerald-500 text-stone-950 shadow-md ring-2 ring-emerald-300'
                              : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Đạt (Pass)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus(tc.id, 'fail')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all w-full justify-center ${
                            status === 'fail'
                              ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300'
                              : 'bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/40'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Lỗi (Fail)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: MANUAL POSTMAN TESTING */}
          {activeTab === 'manual_postman' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#1d0b0e] border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-amber-200 text-xs sm:text-sm">
                    Tải Tệp Postman Đã Cấu Hình Sẵn
                  </h4>
                  <p className="text-[11px] text-stone-300">
                    Import vào Postman rồi tự bấm Send từng request theo hướng dẫn bên dưới
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDownloadPostman('col')}
                    className="hl-hero-btn-primary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Collection JSON</span>
                  </button>
                  <button
                    onClick={() => handleDownloadPostman('env')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Environment</span>
                  </button>
                </div>
              </div>

              {postmanTestCases.map((tc) => {
                const status = evaluations[tc.id] || 'untested';
                return (
                  <div
                    key={tc.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      status === 'pass'
                        ? 'bg-[#0f1f14] border-emerald-500/50'
                        : status === 'fail'
                        ? 'bg-[#240c0f] border-red-500/50'
                        : 'bg-[#18080a] border-[#311115]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-amber-300">
                            {tc.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black font-mono ${
                              tc.method === 'GET'
                                ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                                : tc.method === 'POST'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : tc.method === 'PATCH'
                                ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                                : 'bg-amber-950 text-amber-300'
                            }`}
                          >
                            {tc.method}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-stone-100">
                            {tc.title}
                          </h4>
                        </div>

                        {/* URL with Copy */}
                        <div className="flex items-center gap-2 bg-black/80 px-2.5 py-1.5 rounded-xl border border-stone-800">
                          <code className="text-emerald-400 font-mono text-[11px] flex-1 break-all">
                            {tc.url}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(tc.url, `url_${tc.id}`)}
                            className="p-1 hover:text-white text-stone-400"
                            title="Sao chép URL"
                          >
                            {copiedId === `url_${tc.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Payload if any */}
                        {tc.body && (
                          <div className="relative">
                            <pre className="bg-[#110507] p-2 rounded-xl text-[10px] font-mono text-amber-200/90 border border-stone-800 overflow-x-auto max-h-32">
                              {tc.body}
                            </pre>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(tc.body, `body_${tc.id}`)}
                              className="absolute top-2 right-2 p-1 bg-stone-900/90 hover:bg-stone-800 rounded border border-stone-700 text-stone-300"
                              title="Sao chép JSON Payload"
                            >
                              {copiedId === `body_${tc.id}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        )}

                        <p className="text-[11px] text-stone-300">
                          <strong>Thao tác tay:</strong> {tc.steps}
                        </p>
                        <p className="text-[11px] text-amber-300/90">
                          <strong>Kết quả mong đợi:</strong> {tc.expected}
                        </p>
                      </div>

                      {/* Manual Action Buttons */}
                      <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setStatus(tc.id, 'pass')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all w-full justify-center ${
                            status === 'pass'
                              ? 'bg-emerald-500 text-stone-950 shadow-md ring-2 ring-emerald-300'
                              : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Đạt (Pass)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus(tc.id, 'fail')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all w-full justify-center ${
                            status === 'fail'
                              ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300'
                              : 'bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/40'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Lỗi (Fail)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: TEST REPORT */}
          {activeTab === 'report' && (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#1d0b0e] border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-[#3b1216] pb-3">
                  <div>
                    <h3 className="text-base font-black text-amber-300">
                      BIÊN BẢN NGHIỆM THU KIỂM THỬ THỦ CÔNG
                    </h3>
                    <p className="text-stone-400 text-[11px]">
                      Hệ thống Đặt Món Nhà Hàng Hoàng Long Quán (皇龍樓) · Năm 2026
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold flex items-center gap-1.5 border border-stone-600"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In Biên Bản</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-black/40 rounded-xl border border-stone-800">
                    <span className="text-stone-400 block text-[11px]">Tổng ca kiểm thử:</span>
                    <strong className="text-white text-lg font-black">{totalCases}</strong>
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                    <span className="text-emerald-400 block text-[11px]">Số ca ĐẠT (Pass):</span>
                    <strong className="text-emerald-300 text-lg font-black">{passedCount}</strong>
                  </div>
                  <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/30">
                    <span className="text-red-400 block text-[11px]">Số ca LỖI (Fail):</span>
                    <strong className="text-red-300 text-lg font-black">{failedCount}</strong>
                  </div>
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30">
                    <span className="text-amber-400 block text-[11px]">Tỷ lệ hoàn thành:</span>
                    <strong className="text-amber-300 text-lg font-black">{completionRate}%</strong>
                  </div>
                </div>

                {/* Table Summary */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-stone-800">
                    <thead>
                      <tr className="bg-stone-900 text-stone-300 text-[11px]">
                        <th className="p-2 border border-stone-800">Mã Ca Test</th>
                        <th className="p-2 border border-stone-800">Nội Dung Kiểm Thử</th>
                        <th className="p-2 border border-stone-800">Loại</th>
                        <th className="p-2 border border-stone-800 text-center">Kết Quả Đánh Giá</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] text-stone-300">
                      {[...uiTestCases, ...postmanTestCases].map(t => {
                        const status = evaluations[t.id] || 'untested';
                        return (
                          <tr key={t.id} className="hover:bg-stone-900/50">
                            <td className="p-2 border border-stone-800 font-mono font-bold text-amber-300">
                              {t.id}
                            </td>
                            <td className="p-2 border border-stone-800">{t.title}</td>
                            <td className="p-2 border border-stone-800 text-stone-400">
                              {t.id.startsWith('TC_UI') ? 'Giao Diện UI' : 'API Postman'}
                            </td>
                            <td className="p-2 border border-stone-800 text-center">
                              {status === 'pass' && (
                                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                                  ✓ ĐẠT (PASS)
                                </span>
                              )}
                              {status === 'fail' && (
                                <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold">
                                  ✗ CHƯA ĐẠT (FAIL)
                                </span>
                              )}
                              {status === 'untested' && (
                                <span className="text-stone-500 italic">Chưa đánh giá</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-stone-400 text-[11px] italic">
                  * Ghi chú: File tài liệu chi tiết đầy đủ xem tại <strong>TEST_CASES_MANUAL.md</strong> trong thư mục dự án.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d1013] bg-[#140608] flex items-center justify-between text-xs text-stone-400">
          <span>Tài liệu tự kiểm thử thủ công · Hoàng Long Quán (皇龍樓)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-bold"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
