import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaShippingFast
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🎀</span>
              <div className="logo-text">
                <span className="logo-main">Menina de Laço</span>
                <span className="logo-sub">Laços & Acessórios</span>
              </div>
            </div>
            <p className="footer-description">
              Criando laços especiais que transformam momentos comuns em momentos 
              mágicos. Cada peça é feita com amor e atenção aos detalhes.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/carrinho">Carrinho</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categorias</h3>
            <ul className="footer-links">
              <li><Link to="/produtos?categoria=premium">Linha Premium</Link></li>
              <li><Link to="/produtos?categoria=luxo">Coleção Luxo</Link></li>
              <li><Link to="/produtos?categoria=kits">Kits Especiais</Link></li>
              <li><Link to="/produtos?categoria=baby">Linha Baby</Link></li>
              <li><Link to="/produtos?categoria=personalizados">Personalizados</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contato</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>contato@meninadelaco.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>São Paulo - SP</span>
              </div>
              <div className="contact-item">
                <FaShippingFast className="contact-icon" />
                <span>Entregamos para todo Brasil</span>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Formas de Pagamento</h4>
              <div className="payment-icons">
                <span>💳</span>
                <span>📱</span>
                <span>🧾</span>
                <span>💰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Menina de Laço. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>
              <Link to="/termos-de-uso">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;