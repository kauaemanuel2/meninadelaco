import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productsApi } from '../../config/supabase';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaShare, 
  FaTruck,
  FaShieldAlt, 
  FaUndo,
  FaPlus,
  FaMinus,
  FaTag,
  FaPalette,
  FaRuler,
  FaWeight,
  FaBox,
  FaCheckCircle
} from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = ({ showToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
  try {
    setLoading(true);
    const data = await productsApi.getProductById(id);
    
    // Garantir que o produto tem estrutura correta
    const validatedProduct = {
      ...data,
      id: data.id || id,
      name: data.name || 'Produto',
      price: typeof data.price === 'number' ? data.price : 0,
      original_price: data.original_price || null,
      description: data.description || '',
      category: data.category || { id: '1', name: 'Categoria' },
      images: data.images || [],
      attributes: data.attributes || [],
      features: data.attributes?.map(attr => attr.attribute_value) || [],
      in_stock: data.in_stock !== undefined ? data.in_stock : true,
      stock_quantity: data.stock_quantity || 0
    };
    
    setProduct(validatedProduct);
      
      // Carregar produtos relacionados
      if (data.category_id) {
        const related = await productsApi.getProducts({ 
          category: data.category_id 
        });
        setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));
      }
      
      // Selecionar opções padrão
      if (data.attributes) {
        const sizes = data.attributes.filter(a => a.attribute_type === 'size');
        const colors = data.attributes.filter(a => a.attribute_type === 'color');
        
        if (sizes.length > 0) {
          setSelectedSize(sizes[0].attribute_value);
        }
        if (colors.length > 0) {
          setSelectedColor(colors[0].attribute_value);
        }
      }
      
    } catch (err) {
    console.error('Erro ao carregar produto:', err);
    setError('Produto não encontrado');
  } finally {
    setLoading(false);
  }
};

  const handleAddToCart = () => {
    if (!product) return;
    
    // Verificar se precisa selecionar opções
    const sizes = product.attributes?.filter(a => a.attribute_type === 'size') || [];
    const colors = product.attributes?.filter(a => a.attribute_type === 'color') || [];
    
    if (sizes.length > 0 && !selectedSize) {
      showToast('Por favor, selecione um tamanho', 'error');
      return;
    }
    
    if (colors.length > 0 && !selectedColor) {
      showToast('Por favor, selecione uma cor', 'error');
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };

    addToCart(productToAdd);
    showToast('Produto adicionado ao carrinho!');
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

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <div className="not-found-content">
            <h1>Produto Não Encontrado</h1>
            <p>{error || 'O produto que você está procurando não existe.'}</p>
            <Link to="/produtos" className="btn">
              Voltar para Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extrair atributos organizados
  const sizes = product.attributes?.filter(a => a.attribute_type === 'size') || [];
  const colors = product.attributes?.filter(a => a.attribute_type === 'color') || [];
  const materials = product.attributes?.filter(a => a.attribute_type === 'material') || [];

  const mainImage = product.images?.[selectedImage]?.image_url || '';
  const discountPercent = product.original_price 
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/produtos">Produtos</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link to={`/produtos?categoria=${product.category.id}`}>
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              {mainImage ? (
                <img src={mainImage} alt={product.name} />
              ) : (
                <div className="image-placeholder">🎀</div>
              )}
              {discountPercent && (
                <span className="discount-badge">-{discountPercent}%</span>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.image_url} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div>
                <h1 className="product-title">{product.name}</h1>
                <div className="product-meta">
                  {product.category && (
                    <Link 
                      to={`/produtos?categoria=${product.category.id}`}
                      className="category-tag"
                    >
                      <FaTag /> {product.category.name}
                    </Link>
                  )}
                  <div className="product-sku">
                    <FaBox /> SKU: {product.sku || 'N/A'}
                  </div>
                </div>
              </div>
              <div className="product-actions">
                <button className="action-btn" title="Adicionar aos favoritos">
                  <FaHeart />
                </button>
                <button className="action-btn" title="Compartilhar">
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
              {product.original_price ? (
                <>
                  <span className="current-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  <span className="original-price">R$ {product.original_price.toFixed(2).replace('.', ',')}</span>
                  {discountPercent && (
                    <span className="discount-percent">-{discountPercent}%</span>
                  )}
                </>
              ) : (
                <span className="current-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Product Specifications */}
            <div className="product-specs">
              {product.weight_grams && (
                <div className="spec">
                  <FaWeight className="spec-icon" />
                  <div>
                    <span className="spec-label">Peso</span>
                    <span className="spec-value">{product.weight_grams}g</span>
                  </div>
                </div>
              )}
              
              {product.dimensions && (
                <div className="spec">
                  <FaRuler className="spec-icon" />
                  <div>
                    <span className="spec-label">Dimensões</span>
                    <span className="spec-value">{product.dimensions}</span>
                  </div>
                </div>
              )}
              
              <div className="spec">
                <FaCheckCircle className="spec-icon" />
                <div>
                  <span className="spec-label">Disponibilidade</span>
                  <span className={`spec-value ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.in_stock ? 'Em Estoque' : 'Esgotado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {sizes.length > 0 && (
                <div className="option-group">
                  <label className="option-label">
                    <FaRuler /> Tamanho:
                  </label>
                  <div className="size-options">
                    {sizes.map(size => (
                      <button
                        key={size.id}
                        className={`size-option ${selectedSize === size.attribute_value ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size.attribute_value)}
                      >
                        {size.attribute_value}
                        {size.additional_price > 0 && (
                          <small>+ R$ {size.additional_price.toFixed(2)}</small>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div className="option-group">
                  <label className="option-label">
                    <FaPalette /> Cor:
                  </label>
                  <div className="color-options">
                    {colors.map(color => (
                      <button
                        key={color.id}
                        className={`color-option ${selectedColor === color.attribute_value ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color.attribute_value)}
                        title={color.attribute_value}
                      >
                        <span 
                          className="color-sample"
                          style={{ backgroundColor: color.attribute_value.toLowerCase() }}
                        />
                        <span className="color-name">{color.attribute_value}</span>
                        {color.additional_price > 0 && (
                          <small>+ R$ {color.additional_price.toFixed(2)}</small>
                        )}
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
                    <FaMinus />
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={increaseQuantity}
                    disabled={!product.in_stock || (product.stock_quantity && quantity >= product.stock_quantity)}
                  >
                    <FaPlus />
                  </button>
                </div>
                {product.stock_quantity && (
                  <div className="stock-info">
                    {product.stock_quantity} unidades disponíveis
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions-main">
              <button 
                className="btn btn-add-to-cart" 
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                <FaShoppingCart />
                {product.in_stock ? 'Adicionar ao Carrinho' : 'Esgotado'}
              </button>
              <button 
                className="btn btn-buy-now" 
                onClick={handleBuyNow}
                disabled={!product.in_stock}
              >
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
            <button className="tab">Envio & Devolução</button>
          </div>

          <div className="tab-content">
            <div className="tab-panel active">
              <h3>Detalhes do Produto</h3>
              <p>{product.description}</p>
              
              <h4>Características Principais:</h4>
              <ul className="features-list">
                {product.attributes?.map((attr, index) => (
                  <li key={index}>
                    <strong>{attr.attribute_type}:</strong> {attr.attribute_value}
                    {attr.additional_price > 0 && (
                      <span className="additional-price">
                        (+ R$ {attr.additional_price.toFixed(2)})
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <h4>Materiais:</h4>
              <p>
                {materials.map(m => m.attribute_value).join(', ') || 
                  'Tecido premium de alta qualidade, não desbota e é hipoalergênico.'}
              </p>

              <h4>Cuidados:</h4>
              <ul className="care-list">
                <li>Lavar à mão com água fria</li>
                <li>Não usar alvejante ou produtos químicos fortes</li>
                <li>Secar à sombra</li>
                <li>Passar em temperatura baixa se necessário</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">Produtos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;