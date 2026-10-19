import React, { useState, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import QRCode from 'qrcode';
import { X, QrCode, Camera, Check, ExternalLink, RefreshCw, Smartphone } from 'lucide-react';

const TABLES_LIST = [
  { num: '01', name: 'Bàn 01 - Sảnh Rồng' },
  { num: '02', name: 'Bàn 02 - Sảnh Rồng' },
  { num: '03', name: 'Bàn 03 - Sảnh Phụng' },
  { num: '04', name: 'Bàn 04 - Sảnh Phụng' },
  { num: '05', name: 'Bàn 05 - Hoa Sen' },
  { num: '06', name: 'Bàn 06 - Hoa Sen' },
  { num: '07', name: 'Bàn 07 - Trúc Các' },
  { num: '08', name: 'Bàn 08 - Trúc Các' },
  { num: 'VIP-01', name: 'VIP 01 - Cửu Long (12 Người)' },
  { num: 'VIP-02', name: 'VIP 02 - Phượng Hoàng (10 Người)' }
];

export const QRModal = () => {
  const { tableNumber, changeTable, isQRModalOpen, setIsQRModalOpen } = useTable();
  const [selectedTable, setSelectedTable] = useState(tableNumber);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isScanningSim, setIsScanningSim] = useState(false);

  useEffect(() => {
    setSelectedTable(tableNumber);
  }, [tableNumber]);

  useEffect(() => {
    if (!isQRModalOpen) return;

    const generateCode = async () => {
      try {
        const orderUrl = `${window.location.origin}/?table=${encodeURIComponent(selectedTable)}`;
        const url = await QRCode.toDataURL(orderUrl, {
          width: 320,
          margin: 2,
          color: {
            dark: '#680b11', // Deep Imperial Red QR dots
            light: '#FFF8EE'  // Silk cream background
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Lỗi sinh mã QR:', err);
      }
    };

    generateCode();
  }, [selectedTable, isQRModalOpen]);

  if (!isQRModalOpen) return null;

  const handleApplyTable = () => {
    changeTable(selectedTable);
    setIsQRModalOpen(false);
  };

  const handleSimulateScan = (tblNum) => {
    setIsScanningSim(true);
    setTimeout(() => {
      setIsScanningSim(false);
      changeTable(tblNum);
      setIsQRModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur">
      <div className="relative w-full max-w-md bg-[#160709] border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden animate-fade-scale flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#240d10] via-[#311115] to-[#240d10] border-b border-[#44181c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                Mã QR Đặt Món Tại Bàn
              </h3>
              <span className="text-[10px] text-amber-300 font-calligraphy">
                扫码点餐 · 快速入座
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsQRModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all border border-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-center">
          
          {/* Simulated Physical Chinese Standee Card */}
          <div className="relative p-6 rounded-2xl border-2 border-amber-500/70 bg-gradient-to-b from-[#2e0f13] via-[#1a080a] to-[#250d10] shadow-2xl overflow-hidden max-w-[290px] mx-auto">
            {/* Corner Chinese Ornaments */}
            <div className="corner-ornament-tl"></div>
            <div className="corner-ornament-tr"></div>
            <div className="corner-ornament-bl"></div>
            <div className="corner-ornament-br"></div>

            <div className="mb-2">
              <span className="font-calligraphy text-amber-300 text-xl tracking-widest block drop-shadow">
                皇龍樓
              </span>
              <p className="text-[11px] text-amber-200 uppercase font-bold tracking-wider">
                Quét Mã QR Gọi Món
              </p>
            </div>

            {/* QR Code Container */}
            <div className="relative mx-auto w-48 h-48 bg-[#fff8ee] p-2.5 rounded-2xl border-2 border-amber-500 shadow-inner flex items-center justify-center">
              {isScanningSim && (
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-black/75 rounded-2xl overflow-hidden">
                  <div className="w-full h-1 bg-red-500 shadow-[0_0_15px_#ff0000] animate-bounce"></div>
                  <span className="text-xs text-white mt-2 font-bold animate-pulse">
                    Đang nhận diện Bàn {selectedTable}...
                  </span>
                </div>
              )}

              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Mã QR Bàn" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-xs text-stone-500">Đang tải mã QR...</div>
              )}
            </div>

            {/* Table Number Pill */}
            <div className="mt-3">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-700 via-red-800 to-amber-700 text-white font-black text-xs sm:text-sm rounded-full border border-amber-300 shadow-md">
                BÀN SỐ {selectedTable}
              </span>
              <p className="text-[10px] text-amber-200/80 mt-1 font-medium">
                Mở camera điện thoại quét để đặt món
              </p>
            </div>
          </div>

          {/* Quick Table Switcher */}
          <div className="text-left">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
              Chọn số bàn để mô phỏng khách quét QR:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TABLES_LIST.map((tbl) => {
                const isCurrent = selectedTable === tbl.num;
                return (
                  <button
                    key={tbl.num}
                    type="button"
                    onClick={() => setSelectedTable(tbl.num)}
                    className={`p-2.5 rounded-xl text-xs border transition-all flex items-center justify-between active:scale-95 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-red-900 to-amber-950 border-amber-400 text-amber-100 font-bold shadow-md ring-1 ring-amber-400/50'
                        : 'bg-[#1e0a0d] border-[#44181c] text-stone-300 hover:border-amber-500/40'
                    }`}
                  >
                    <span className="truncate">{tbl.name}</span>
                    {isCurrent && <Check className="w-4 h-4 text-amber-400 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => handleSimulateScan(selectedTable)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 transition-all font-bold active:scale-95 shadow"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Quét Thử Bằng Camera</span>
            </button>

            <button
              onClick={handleApplyTable}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 btn-chinese-primary rounded-xl text-xs font-black shadow-xl active:scale-95"
            >
              <Check className="w-4 h-4 text-amber-300 stroke-[3]" />
              <span>VÀO BÀN {selectedTable}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
