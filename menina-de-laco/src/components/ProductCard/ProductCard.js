import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-image">
          {product.discount && (
            <span className="discount-badge">-{product.discount}%</span>
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
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
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
            {product.originalPrice ? (
              <>
                <span className="current-price">{product.price}</span>
                <span className="original-price">{product.originalPrice}</span>
              </>
            ) : (
              <span className="current-price">{product.price}</span>
            )}
          </div>

          <div className="product-features">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
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