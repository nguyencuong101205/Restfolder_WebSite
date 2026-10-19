import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from '../components/ChineseSeal';
import { Lock, User, KeyRound, ShieldCheck, ArrowRight, ChefHat, Crown, Sparkles, AlertCircle } from 'lucide-react';

export const AdminLoginPage = ({ onSuccess, onCancel }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await login(username, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickUser, quickPass) => {
    setUsername(quickUser);
    setPassword(quickPass);
    setLoading(true);
    setErrorMsg('');

    try {
      await login(quickUser, quickPass);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Đăng nhập nhanh thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur">
      <div className="relative w-full max-w-md bg-[#18090b] border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-scale flex flex-col">
        
        {/* Chinese decorative top banner */}
        <div className="p-6 bg-gradient-to-b from-[#2d1115] to-[#1e0a0d] border-b border-[#4d161a] text-center relative">
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-stone-400 hover:text-white text-xs bg-stone-900/60 px-2 py-1 rounded-lg"
            >
              Đóng ✕
            </button>
          )}

          <div className="flex justify-center mb-2">
            <ChineseSeal text="皇龍" subtext="令牌" />
          </div>

          <h2 className="font-decorative text-xl font-bold text-amber-200">
            CỔNG ĐĂNG NHẬP NỘI BỘ
          </h2>
          <p className="font-calligraphy text-amber-400 text-sm mt-0.5">
            JSON Web Token (JWT) · Phân Quyền MVC
          </p>
        </div>

        {/* Login Form Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo Accounts */}
          <div>
            <span className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider block mb-2">
              ⚡ Đăng nhập nhanh kiểm thử (1-Click Login):
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin', '123')}
                className="p-2.5 bg-[#250e12] hover:bg-[#38151b] border border-amber-500/40 rounded-xl transition-all text-xs flex flex-col items-center justify-center group"
              >
                <Crown className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-amber-100">Chủ Quán</span>
                <span className="text-[9px] text-stone-400">admin / 123</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('bep', '123')}
                className="p-2.5 bg-[#250e12] hover:bg-[#38151b] border border-red-500/40 rounded-xl transition-all text-xs flex flex-col items-center justify-center group"
              >
                <ChefHat className="w-4 h-4 text-red-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-red-200">Bếp Trưởng</span>
                <span className="text-[9px] text-stone-400">bep / 123</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('phucvu', '123')}
                className="p-2.5 bg-[#250e12] hover:bg-[#38151b] border border-stone-600 rounded-xl transition-all text-xs flex flex-col items-center justify-center group"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-stone-200">Tiểu Nhị</span>
                <span className="text-[9px] text-stone-400">phucvu / 123</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#3b1519]"></div>
            <span className="flex-shrink mx-3 text-[10px] text-stone-500 uppercase">Hoặc đăng nhập thủ công</span>
            <div className="flex-grow border-t border-[#3b1519]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-amber-200 font-semibold block mb-1">
                Tên đăng nhập:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin, bep, phucvu..."
                  className="w-full pl-9 pr-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-amber-200 font-semibold block mb-1">
                Mật khẩu:
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu (mặc định: 123)"
                  className="w-full pl-9 pr-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 btn-chinese-primary rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Đang xác thực Token JWT...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>XÁC THỰC & ĐĂNG NHẬP</span>
                </>
              )}
            </button>
          </form>

          {/* Educational Note */}
          <div className="p-3 bg-[#130507] rounded-xl border border-[#3b1519] text-[10px] text-stone-400 leading-relaxed">
            <span className="font-bold text-amber-400 block mb-0.5">💡 Cơ Chế Bảo Mật JWT:</span>
            Khi đăng nhập thành công, máy chủ Express sẽ ký một mã Token (JWT) chứa thông tin vai trò (role) và ID người dùng. Mọi yêu cầu quản lý sau đó sẽ gửi Token qua Header <code className="text-amber-300">Authorization: Bearer [token]</code>.
          </div>

        </div>

      </div>
    </div>
  );
};
