import React, { useState, useEffect } from 'react';
import { tableApi } from '../api/orderApi';
import { useTable } from '../context/TableContext';
import { QrCode, Printer, ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';

export const TableManagerPage = ({ onBackToMenu }) => {
  const { changeTable } = useTable();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await tableApi.getAllTablesWithQr();
      if (res.success && Array.isArray(res.data)) {
        setTables(res.data);
      }
    } catch (err) {
      console.warn('Lỗi lấy danh sách bàn và mã QR:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenTable = (tblNum) => {
    changeTable(tblNum);
    onBackToMenu();
  };

  return (
    <div className="min-h-screen bg-[#110708] text-stone-200 pb-20">
      
      {/* Header */}
      <header className="bg-[#1c0b0e] border-b border-[#44181c] sticky top-0 z-30 shadow-xl px-4 sm:px-8 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMenu}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-xs font-semibold text-stone-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Thực Đơn</span>
            </button>

            <div>
              <h1 className="font-bold text-base sm:text-lg text-white">
                QUẢN LÝ MÃ QR BÀN ĂN NHÀ HÀNG
              </h1>
              <p className="text-[11px] text-amber-300/80">
                In thẻ để bàn cho khách quét bằng camera điện thoại
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 btn-chinese-gold rounded-xl text-xs font-bold shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>In Tất Cả Thẻ QR</span>
            </button>
            <button
              onClick={fetchTables}
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-stone-300"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Grid of Printable Table Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {loading ? (
          <div className="text-center py-20 text-stone-400">Đang tạo mã QR cho từng bàn...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tables.map((tbl) => (
              <div
                key={tbl.id}
                className="chinese-card p-5 rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-[#240d10] to-[#160709] shadow-xl text-center flex flex-col justify-between relative group"
              >
                {/* Corner Chinese Ornaments */}
                <div className="corner-ornament-tl"></div>
                <div className="corner-ornament-tr"></div>
                <div className="corner-ornament-bl"></div>
                <div className="corner-ornament-br"></div>

                <div>
                  <div className="mb-2">
                    <span className="font-calligraphy text-amber-300 text-lg tracking-widest block">
                      皇龍樓
                    </span>
                    <h3 className="font-bold text-base text-white">
                      {tbl.name}
                    </h3>
                    <span className="text-[10px] text-amber-200/70">
                      Sức chứa: {tbl.capacity} thực khách
                    </span>
                  </div>

                  {/* QR Image Box */}
                  <div className="mx-auto w-40 h-40 bg-[#fff8ee] p-2 rounded-xl border-2 border-amber-500/80 shadow-inner flex items-center justify-center my-3">
                    {tbl.qrDataUrl ? (
                      <img src={tbl.qrDataUrl} alt={`QR Bàn ${tbl.tableNumber}`} className="w-full h-full object-contain" />
                    ) : (
                      <QrCode className="w-16 h-16 text-stone-400" />
                    )}
                  </div>

                  <p className="text-[11px] text-amber-300 font-semibold">
                    Quét để xem Menu & Gọi Món
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3b1519] flex items-center justify-between print:hidden">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    tbl.status === 'occupied' ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}>
                    {tbl.status === 'occupied' ? 'Đang có khách' : 'Bàn trống'}
                  </span>

                  <button
                    onClick={() => handleOpenTable(tbl.tableNumber)}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-white font-medium"
                  >
                    <span>Mở Bàn Này</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
