import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  FaShoppingBag, 
  FaUser, 
  FaSearch, 
  FaBars, 
  FaTimes,
  FaHeart
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const location = useLocation();

  const cartItemsCount = getCartItemsCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <span>✨ Frete Grátis para compras acima de R$ 99,00</span>
            <div className="header-top-links">
              <a href="#contact">Acompanhe seu pedido</a>
              <span>|</span>
              <a href="#contact">(11) 99999-9999</a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <button 
              className="menu-toggle"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/" className="logo" onClick={closeMenu}>
              <span className="logo-icon">🎀</span>
              <div className="logo-text">
                <span className="logo-main">Menina de Laço</span>
                <span className="logo-sub">Laços & Acessórios</span>
              </div>
            </Link>

            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-links">
                <li>
                  <Link 
                    to="/" 
                    className={isActiveLink('/') ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/produtos" 
                    className={isActiveLink('/produtos') ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sobre" 
                    className={isActiveLink('/sobre') ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contato" 
                    className={isActiveLink('/contato') ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <button 
                className="action-btn search-btn"
                onClick={toggleSearch}
              >
                <FaSearch />
              </button>

              <Link to="/favoritos" className="action-btn">
                <FaHeart />
              </Link>

              <Link to="/conta" className="action-btn">
                <FaUser />
              </Link>

              <Link to="/carrinho" className="action-btn cart-btn">
                <FaShoppingBag />
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </Link>
            </div>

            {isSearchOpen && (
              <div className="search-overlay">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="O que você está procurando?"
                    className="search-input"
                  />
                  <button className="search-submit">
                    <FaSearch />
                  </button>
                  <button 
                    className="search-close"
                    onClick={toggleSearch}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;