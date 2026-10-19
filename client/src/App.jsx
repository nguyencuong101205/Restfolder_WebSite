import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TableProvider } from './context/TableContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QRModal } from './components/QRModal';
import { OrderTracker } from './components/OrderTracker';
import { CallStaffModal } from './components/CallStaffModal';
import { ReservationModal } from './components/ReservationModal';
import { AboutModal } from './components/AboutModal';
import { PrivateDiningModal } from './components/PrivateDiningModal';
import { CustomerMenuPage } from './pages/CustomerMenuPage';
import { KitchenDashboard } from './pages/KitchenDashboard';
import { TableManagerPage } from './pages/TableManagerPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

const MainLayout = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu' | 'kitchen' | 'tables'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  
  // Man Ho modals
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivateDiningModalOpen, setIsPrivateDiningModalOpen] = useState(false);

  const { isStaff, isAdmin } = useAuth();

  const scrollToMenu = () => {
    if (currentView !== 'menu') {
      setCurrentView('menu');
      setTimeout(() => {
        const el = document.getElementById('menu-dish-list');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById('menu-dish-list');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#c5a880]/30 selection:text-[#f5f0ea]">
      
      {/* Top Header - Man Ho Chinese Restaurant (JW Marriott Hanoi) */}
      <Header
        onOpenAuth={(mode = 'login') => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onOpenKitchen={() => setCurrentView('kitchen')}
        onOpenTableManager={() => setCurrentView('tables')}
        onOpenReserve={() => setIsReservationModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenPrivateDining={() => setIsPrivateDiningModalOpen(true)}
        onExploreMenu={scrollToMenu}
        currentView={currentView}
      />

      {/* Main View Switching */}
      <div className="flex-1">
        {currentView === 'menu' && (
          <CustomerMenuPage
            onOpenReserve={() => setIsReservationModalOpen(true)}
            onOpenAbout={() => setIsAboutModalOpen(true)}
            onOpenPrivateDining={() => setIsPrivateDiningModalOpen(true)}
          />
        )}

        {currentView === 'kitchen' && (
          <KitchenDashboard
            onBackToMenu={() => setCurrentView('menu')}
            onOpenTableManager={() => setCurrentView('tables')}
          />
        )}

        {currentView === 'tables' && (
          <TableManagerPage
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}
      </div>

      {/* Footer */}
      {currentView === 'menu' && (
        <Footer
          onOpenAbout={() => setIsAboutModalOpen(true)}
          onExploreMenu={scrollToMenu}
          onOpenPrivateDining={() => setIsPrivateDiningModalOpen(true)}
          onOpenReserve={() => setIsReservationModalOpen(true)}
        />
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QRModal />
      <OrderTracker />
      <CallStaffModal />

      {/* Man Ho Hanoi Modals */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenReserve={() => setIsReservationModalOpen(true)}
      />

      <PrivateDiningModal
        isOpen={isPrivateDiningModalOpen}
        onClose={() => setIsPrivateDiningModalOpen(false)}
        onOpenReserve={() => setIsReservationModalOpen(true)}
      />

      {/* Staff & Customer Auth Modal (Login / Register) */}
      {isAuthModalOpen && (
        <AdminLoginPage
          initialMode={authModalMode}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            if (isStaff) setCurrentView('kitchen');
          }}
          onCancel={() => setIsAuthModalOpen(false)}
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TableProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </TableProvider>
    </AuthProvider>
  );
}
