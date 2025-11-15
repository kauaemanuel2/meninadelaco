import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <div className="not-found-content">
            <h1>Produto Não Encontrado</h1>
            <p>O produto que você está procurando não existe.</p>
            <Link to="/produtos" className="btn">
              Voltar para Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if ((product.sizes && product.sizes.length > 0 && !selectedSize) || 
        (product.colors && product.colors.length > 0 && !selectedColor)) {
      alert('Por favor, selecione todas as opções necessárias.');
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };

    addToCart(productToAdd);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/carrinho');
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/produtos">Produtos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <div className="image-placeholder">
                🎀
                {product.discount && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
            </div>
            <div className="image-thumbnails">
              {product.images?.map((_, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="thumbnail-placeholder">🎀</div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-actions">
                <button className="action-btn">
                  <FaHeart />
                </button>
                <button className="action-btn">
                  <FaShare />
                </button>
              </div>
            </div>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? 'star filled' : 'star'} />
                ))}
              </div>
              <span className="rating-text">4.8 (42 avaliações)</span>
            </div>

            <div className="product-price">
              {product.originalPrice ? (
                <>
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                  <span className="discount-percent">-{product.discount}%</span>
                </>
              ) : (
                <span className="current-price">{product.price}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Product Options */}
            <div className="product-options">
              {product.sizes && product.sizes.length > 0 && (
                <div className="option-group">
                  <label className="option-label">Tamanho:</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="option-group">
                  <label className="option-label">Cor:</label>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`color-option ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="option-group">
                <label className="option-label">Quantidade:</label>
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions-main">
              <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart />
                Adicionar ao Carrinho
              </button>
              <button className="btn btn-buy-now" onClick={handleBuyNow}>
                Comprar Agora
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features-list">
              <div className="feature-item">
                <FaTruck className="feature-icon" />
                <div>
                  <strong>Frete Grátis</strong>
                  <p>Para compras acima de R$ 99</p>
                </div>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feature-icon" />
                <div>
                  <strong>Compra Segura</strong>
                  <p>Seus dados protegidos</p>
                </div>
              </div>
              <div className="feature-item">
                <FaUndo className="feature-icon" />
                <div>
                  <strong>Troca Grátis</strong>
                  <p>Até 7 dias após a compra</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tabs">
            <button className="tab active">Descrição</button>
            <button className="tab">Características</button>
            <button className="tab">Avaliações</button>
          </div>

          <div className="tab-content">
            <div className="tab-panel active">
              <h3>Detalhes do Produto</h3>
              <p>{product.description}</p>
              
              <h4>Características Principais:</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h4>Cuidados:</h4>
              <p>Lavar à mão com água fria. Não usar alvejante. Secar à sombra.</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">Produtos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;