import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { saveMockUser, removeMockUser } from './config/supabase';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';

// Componente simples para mostrar notificações
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`toast ${type}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: 10000,
        background: type === 'success' ? '#ff69b4' : '#ff4757',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
      }}
    >
      {message}
    </div>
  );
};

function App() {
  const [toast, setToast] = React.useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <CartProvider showToast={showToast}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/carrinho" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={hideToast} 
            />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;