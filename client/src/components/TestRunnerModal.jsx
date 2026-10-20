import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Play, Download, Terminal, RefreshCw, X, ShieldCheck, Database, Utensils, QrCode, FileText } from 'lucide-react';
import { ChineseSeal } from './ChineseSeal';

export const TestRunnerModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'postman' | 'cli'
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const testDefinitions = [
    {
      id: 'root',
      name: '1. Root API & Server Health',
      group: 'Hạ Tầng API',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api');
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && data.success) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Kiến trúc MVC & JWT` };
        }
        throw new Error(`Status ${res.status}: ${data.message || 'Lỗi kết nối'}`);
      }
    },
    {
      id: 'auth_login',
      name: '2. Xác thực JWT (Admin Login)',
      group: 'Bảo Mật & JWT',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && data.data?.token) {
          sessionStorage.setItem('temp_test_token', data.data.token);
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Token: ${data.data.token.slice(0, 16)}...` };
        }
        throw new Error(`Đăng nhập thất bại: ${data.message}`);
      }
    },
    {
      id: 'auth_me',
      name: '3. Bảo Vệ Route Profile (/auth/me)',
      group: 'Bảo Mật & JWT',
      fn: async () => {
        const start = performance.now();
        const token = sessionStorage.getItem('temp_test_token');
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && (data.data?.username === 'admin' || data.data?.user?.username === 'admin')) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Vai trò: ADMIN` };
        }
        throw new Error(`Không đọc được profile: ${data.message}`);
      }
    },
    {
      id: 'menu_all',
      name: '4. Tải Danh Sách Thực Đơn (/menu)',
      group: 'Quản Lý Món Ăn',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api/menu');
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && Array.isArray(data.data) && data.data.length > 0) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - ${data.data.length} món ăn đã tải` };
        }
        throw new Error(`Lỗi tải menu`);
      }
    },
    {
      id: 'menu_utf8',
      name: '5. Kiểm Tra Mã Hóa UTF-8 & Dấu Tiếng Việt',
      group: 'Dữ Liệu & Encoding',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api/menu/dish-01');
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        const name = data.data?.name || '';
        // Test no replacement chars (\uFFFD or ?)
        if (name === 'Há Cảo Thủy Tinh Tôm Tươi' && !name.includes('?')) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - "${name}" chuẩn font 100%` };
        }
        throw new Error(`Lỗi font chữ tiếng Việt: "${name}"`);
      }
    },
    {
      id: 'tables_qr',
      name: '6. Sinh Mã QR Code Đặt Bàn (/tables/01/qr)',
      group: 'Mã QR & Bàn Ăn',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api/tables/01/qr');
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        const qr = data.data?.qrDataUrl || data.data?.qrCode;
        if (res.status === 200 && qr?.startsWith('data:image/png;base64,')) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Base64 PNG QR hợp lệ` };
        }
        throw new Error(`Không sinh được mã QR bàn`);
      }
    },
    {
      id: 'order_create',
      name: '7. Đặt Món Tại Bàn & Tính Thuế VAT 8%',
      group: 'Quy Trình Đơn Hàng',
      fn: async () => {
        const start = performance.now();
        const payload = {
          tableNumber: '08',
          customerName: 'Kiểm Thử Viên Tự Động',
          items: [
            {
              id: 'dish-01',
              quantity: 2,
              spiceLevel: 'Không cay',
              selectedToppings: [{ name: 'Thêm nước sốt sa tế đặc biệt', price: 10000 }]
            }
          ],
          note: 'Đơn test tự động'
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 201 && data.data?.vat > 0 && data.data?.totalPrice > 0) {
          sessionStorage.setItem('temp_order_id', data.data.id);
          return { pass: true, duration, detail: `201 Created (${duration}ms) - Tổng tiền: ${data.data.totalPrice.toLocaleString('vi-VN')} đ (VAT: ${data.data.vat.toLocaleString('vi-VN')} đ)` };
        }
        throw new Error(`Tạo đơn thất bại: ${data.message}`);
      }
    },
    {
      id: 'order_active',
      name: '8. Theo Dõi Đơn Hàng Trực Tuyến Live Tracker',
      group: 'Quy Trình Đơn Hàng',
      fn: async () => {
        const start = performance.now();
        const res = await fetch('/api/orders/table/08/active');
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && data.data?.id) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Mã đơn: #${data.data.id.slice(-6)}` };
        }
        throw new Error(`Không tìm thấy đơn đang hoạt động`);
      }
    },
    {
      id: 'kds_status',
      name: '9. Điều Phối Trạng Thái Bếp KDS (Pending -> Preparing)',
      group: 'Nhà Bếp KDS',
      fn: async () => {
        const orderId = sessionStorage.getItem('temp_order_id');
        const token = sessionStorage.getItem('temp_test_token');
        if (!orderId) throw new Error('Không có mã đơn để kiểm tra');

        const start = performance.now();
        const res = await fetch(`/api/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'preparing' })
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && data.data?.status === 'preparing') {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Trạng thái: ĐANG NẤU (preparing)` };
        }
        throw new Error(`Cập nhật trạng thái thất bại`);
      }
    },
    {
      id: 'call_staff',
      name: '10. Khách Gọi Phục Vụ / Chuông Bàn',
      group: 'Dịch Vụ Bàn Ăn',
      fn: async () => {
        const orderId = sessionStorage.getItem('temp_order_id');
        if (!orderId) throw new Error('Không có mã đơn');

        const start = performance.now();
        const res = await fetch(`/api/orders/${orderId}/call-staff`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            requestType: 'Xin thêm nước đá',
            note: 'Kiểm thử chuông bàn'
          })
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);
        if (res.status === 200 && data.data?.callStaffRequests?.length > 0) {
          return { pass: true, duration, detail: `200 OK (${duration}ms) - Chuông đã kích hoạt tới nhà bếp` };
        }
        throw new Error(`Gọi phục vụ thất bại`);
      }
    }
  ];

  const runAllTests = async () => {
    setIsRunning(true);
    const results = [];

    for (const test of testDefinitions) {
      try {
        const res = await test.fn();
        results.push({ id: test.id, name: test.name, group: test.group, status: 'pass', ...res });
      } catch (err) {
        results.push({ id: test.id, name: test.name, group: test.group, status: 'fail', detail: err.message, duration: 0 });
      }
      setTestResults([...results]);
    }
    setIsRunning(false);
  };

  useEffect(() => {
    if (isOpen && testResults.length === 0) {
      runAllTests();
    }
  }, [isOpen]);

  const handleDownloadPostmanCollection = async () => {
    try {
      const res = await fetch('/postman/HoangLongQuan_API.postman_collection.json');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'HoangLongQuan_API.postman_collection.json';
      a.click();
    } catch {
      alert('Tệp nằm tại: postman/HoangLongQuan_API.postman_collection.json');
    }
  };

  const handleDownloadPostmanEnvironment = async () => {
    try {
      const res = await fetch('/postman/HoangLongQuan_Environment.postman_environment.json');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'HoangLongQuan_Environment.postman_environment.json';
      a.click();
    } catch {
      alert('Tệp nằm tại: postman/HoangLongQuan_Environment.postman_environment.json');
    }
  };

  if (!isOpen) return null;

  const passedCount = testResults.filter(r => r.status === 'pass').length;
  const failedCount = testResults.filter(r => r.status === 'fail').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#160709] border-2 border-amber-500/60 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-[#3b1216] bg-[#1f0b0e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChineseSeal text="測試" subtext="驗證" className="w-10 h-10 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-amber-200 flex items-center gap-2">
                <span>TRUNG TÂM KIỂM THỬ HỆ THỐNG (TEST SUITE)</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                  v1.0.0
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Kiểm tra tự động REST API, giao diện UI, xác thực JWT và Postman Collection
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#2d1013] bg-[#140608]">
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'live'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-amber-400" />
            <span>Chạy Kiểm Thử Trực Tiếp (Live API)</span>
          </button>

          <button
            onClick={() => setActiveTab('postman')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'postman'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Tải Postman Collection</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'cli'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Lệnh Chạy Test Terminal</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'live' && (
            <>
              {/* Summary Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#1d0b0e] border border-amber-500/30">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Tổng kịch bản:</span>
                    <strong className="text-white text-base font-black">{testDefinitions.length}</strong>
                  </div>
                  <div className="w-[1px] h-8 bg-stone-700" />
                  <div>
                    <span className="text-emerald-400 block text-[11px]">Thành công:</span>
                    <strong className="text-emerald-300 text-base font-black">{passedCount}</strong>
                  </div>
                  <div className="w-[1px] h-8 bg-stone-700" />
                  <div>
                    <span className="text-red-400 block text-[11px]">Thất bại:</span>
                    <strong className="text-red-300 text-base font-black">{failedCount}</strong>
                  </div>
                  <div className="w-[1px] h-8 bg-stone-700" />
                  <div>
                    <span className="text-amber-400 block text-[11px]">Tỷ lệ đạt:</span>
                    <strong className="text-amber-300 text-base font-black">
                      {testResults.length ? Math.round((passedCount / testResults.length) * 100) : 0}%
                    </strong>
                  </div>
                </div>

                <button
                  onClick={runAllTests}
                  disabled={isRunning}
                  className="hl-hero-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Đang chạy kiểm thử...' : 'Chạy Lại Toàn Bộ'}</span>
                </button>
              </div>

              {/* Test Items List */}
              <div className="space-y-2">
                {testDefinitions.map((def) => {
                  const result = testResults.find(r => r.id === def.id);
                  const isDone = Boolean(result);
                  const isPass = result?.status === 'pass';

                  return (
                    <div
                      key={def.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        !isDone
                          ? 'border-[#2d1013] bg-[#120507]'
                          : isPass
                          ? 'border-emerald-500/40 bg-emerald-950/20'
                          : 'border-red-500/40 bg-red-950/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {!isDone ? (
                          <div className="w-5 h-5 rounded-full border-2 border-stone-600 border-t-amber-400 animate-spin" />
                        ) : isPass ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-stone-200">{def.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                              {def.group}
                            </span>
                          </div>
                          {result?.detail && (
                            <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                              {result.detail}
                            </p>
                          )}
                        </div>
                      </div>

                      {result?.duration > 0 && (
                        <span className="text-[11px] text-amber-300/80 font-mono flex-shrink-0">
                          {result.duration}ms
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'postman' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#1d0b0e] border border-amber-500/30 space-y-3">
                <h3 className="text-sm font-bold text-amber-300">
                  📦 BỘ SƯU TẬP POSTMAN HOÀNG LONG QUÁN (V2.1)
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Đã tạo sẵn đầy đủ 4 nhóm API (Authentication, Menu, Tables & QR, Orders & Kitchen KDS) kèm kịch bản tự động gán Token và kiểm thử response code.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleDownloadPostmanCollection}
                    className="hl-hero-btn-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Collection JSON</span>
                  </button>

                  <button
                    onClick={handleDownloadPostmanEnvironment}
                    className="px-4 py-2.5 rounded-xl font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Environment JSON</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-[#120507] border border-[#2d1013] space-y-2.5">
                <h4 className="font-bold text-amber-200 text-xs uppercase tracking-wider">
                  📖 Hướng dẫn Import vào Postman trong 3 bước:
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-stone-300">
                  <li>Mở ứng dụng <strong>Postman</strong>, nhấn nút <strong>Import</strong> ở góc trên bên trái.</li>
                  <li>Chọn tệp <code className="text-amber-300 font-mono bg-stone-900 px-1.5 py-0.5 rounded">postman/HoangLongQuan_API.postman_collection.json</code> và <code className="text-amber-300 font-mono bg-stone-900 px-1.5 py-0.5 rounded">postman/HoangLongQuan_Environment.postman_environment.json</code>.</li>
                  <li>Chọn môi trường <strong>Hoàng Long Quán - Localhost Environment</strong>, bấm chạy request <strong>1.1 Login Admin</strong> đầu tiên để tự động lưu Token Bearer!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#120507] border border-[#2d1013] space-y-3">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>CÁC LỆNH KIỂM THỬ BẰNG TERMINAL (CLI)</span>
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Bạn có thể mở PowerShell / Command Prompt tại thư mục dự án và chạy các lệnh kiểm thử tự động sau:
                </p>

                <div className="space-y-3">
                  <div className="bg-black/90 p-3 rounded-xl border border-stone-800">
                    <span className="text-stone-400 block text-[11px] mb-1">1. Chạy toàn bộ 26 kịch bản kiểm thử API Backend (Node:Test):</span>
                    <code className="text-emerald-400 font-mono text-xs">npm run test:api</code>
                  </div>

                  <div className="bg-black/90 p-3 rounded-xl border border-stone-800">
                    <span className="text-stone-400 block text-[11px] mb-1">2. Chạy 10 kịch bản kiểm thử UI Component Frontend (Vitest):</span>
                    <code className="text-emerald-400 font-mono text-xs">npm run test:ui</code>
                  </div>

                  <div className="bg-black/90 p-3 rounded-xl border border-stone-800">
                    <span className="text-stone-400 block text-[11px] mb-1">3. Chạy tổng hợp cả API & UI cùng lúc:</span>
                    <code className="text-amber-400 font-mono text-xs">npm test</code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d1013] bg-[#140608] flex items-center justify-between text-xs text-stone-400">
          <span>Hệ Thống Nhà Hàng Hoàng Long Quán · 皇龍樓</span>
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
