import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag, 
  FaArrowLeft,
  FaCreditCard,
  FaTruck
} from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartItemsCount 
  } = useCart();

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();
  const shipping = cartTotal > 99 ? 0 : 15;
  const finalTotal = cartTotal + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
      removeFromCart(productId);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Que tal explorar nossos produtos incríveis?</p>
            <Link to="/produtos" className="btn btn-large">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Meu Carrinho</h1>
          <p className="page-subtitle">
            Revise seus itens e finalize seu pedido
          </p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-header">
              <h2>Itens no Carrinho ({cartItemsCount})</h2>
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                <FaTrash />
                Limpar Carrinho
              </button>
            </div>

            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  <div className="item-image">
                    <div className="image-placeholder">🎀</div>
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    
                    {item.selectedSize && (
                      <p className="item-variant">
                        <strong>Tamanho:</strong> {item.selectedSize}
                      </p>
                    )}
                    
                    {item.selectedColor && (
                      <p className="item-variant">
                        <strong>Cor:</strong> {item.selectedColor}
                      </p>
                    )}

                    <p className="item-price">{item.price}</p>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="item-total">
                    R$ {(parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity).toFixed(2).replace('.', ',')}
                  </div>

                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remover item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="continue-shopping">
              <Link to="/produtos" className="continue-btn">
                <FaArrowLeft />
                Continuar Comprando
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Resumo do Pedido</h3>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cartItemsCount} itens)</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="summary-row">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="free-shipping">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="shipping-note">
                    <FaTruck />
                    Faltam R$ {(99 - cartTotal).toFixed(2).replace('.', ',')} para frete grátis!
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button className="checkout-btn">
                <FaCreditCard />
                Finalizar Compra
              </button>

              <div className="payment-methods">
                <p>Formas de pagamento aceitas:</p>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>📱</span>
                  <span>🧾</span>
                  <span>💰</span>
                </div>
              </div>

              <div className="security-features">
                <div className="security-item">
                  <FaTruck />
                  <span>Entrega rápida e segura</span>
                </div>
                <div className="security-item">
                  <FaCreditCard />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="promo-code">
              <h4>Cupom de Desconto</h4>
              <div className="promo-input-group">
                <input 
                  type="text" 
                  placeholder="Digite seu cupom"
                  className="promo-input"
                />
                <button className="promo-btn">Aplicar</button>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="recommended-products">
              <h4>Quem viu isso também gostou</h4>
              <div className="recommended-list">
                <div className="recommended-item">
                  <div className="rec-image">🎀</div>
                  <div className="rec-info">
                    <p className="rec-name">Laço de Seda Premium</p>
                    <p className="rec-price">R$ 29,90</p>
                  </div>
                </div>
                <div className="recommended-item">
                  <div className="rec-image">🎀</div>
                  <div className="rec-info">
                    <p className="rec-name">Kit Laços Coloridos</p>
                    <p className="rec-price">R$ 49,90</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;