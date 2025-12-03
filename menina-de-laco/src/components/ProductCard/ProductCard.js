import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="product-card">
        <div className="product-error">
          <p>Produto não disponível</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Garantir que temos valores padrão
  const productFeatures = product.features || [];
  const discount = product.discount || product.original_price 
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-image">
          {discount && (
            <span className="discount-badge">-{discount}%</span>
          )}
          {product.featured && (
            <span className="featured-badge">Destaque</span>
          )}
          <div className="product-actions">
            <button className="action-btn wishlist-btn">
              <FaHeart />
            </button>
          </div>
          <div className="image-placeholder">
            🎀
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name || 'Nome do Produto'}</h3>
          <p className="product-description">
            {product.description || product.short_description || 'Descrição do produto não disponível'}
          </p>
          
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < 4 ? 'star filled' : 'star'} 
              />
            ))}
            <span className="rating-count">(42)</span>
          </div>

          <div className="product-price">
            {product.original_price ? (
              <>
                <span className="current-price">
                  R$ {typeof product.price === 'number' ? product.price.toFixed(2).replace('.', ',') : '0,00'}
                </span>
                <span className="original-price">
                  R$ {typeof product.original_price === 'number' ? product.original_price.toFixed(2).replace('.', ',') : '0,00'}
                </span>
              </>
            ) : (
              <span className="current-price">
                R$ {typeof product.price === 'number' ? product.price.toFixed(2).replace('.', ',') : '0,00'}
              </span>
            )}
          </div>

          {productFeatures.length > 0 && (
            <div className="product-features">
              {productFeatures.slice(0, 2).map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        <FaShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;