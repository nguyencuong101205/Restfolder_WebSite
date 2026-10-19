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
import { CustomerMenuPage } from './pages/CustomerMenuPage';
import { KitchenDashboard } from './pages/KitchenDashboard';
import { TableManagerPage } from './pages/TableManagerPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

const MainLayout = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu' | 'kitchen' | 'tables'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isStaff, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-red-900 selection:text-amber-200">
      
      {/* Top Header */}
      <Header
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenKitchen={() => setCurrentView('kitchen')}
        onOpenTableManager={() => setCurrentView('tables')}
        currentView={currentView}
      />

      {/* Main View Switching */}
      <div className="flex-1">
        {currentView === 'menu' && (
          <CustomerMenuPage />
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
      {currentView === 'menu' && <Footer />}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QRModal />
      <OrderTracker />
      <CallStaffModal />

      {/* Staff Login Modal */}
      {isAuthModalOpen && (
        <AdminLoginPage
          onSuccess={() => {
            setIsAuthModalOpen(false);
            setCurrentView('kitchen');
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
