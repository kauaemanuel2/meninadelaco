import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Newsletter from '../../components/Newsletter/Newsletter';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productsApi } from '../../config/supabase';
import { 
  FaShippingFast, 
  FaShieldAlt, 
  FaAward, 
  FaHeart 
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const products = await productsApi.getProducts({ featured: true });
      
      // Garantir que todos os produtos têm a estrutura correta
      const validatedProducts = products.map(product => ({
        id: product.id || 'unknown',
        name: product.name || 'Produto sem nome',
        price: typeof product.price === 'number' ? product.price : 0,
        original_price: product.original_price || null,
        description: product.description || product.short_description || '',
        short_description: product.short_description || '',
        category: product.category || { id: '1', name: 'Categoria' },
        images: product.images || [],
        attributes: product.attributes || [],
        featured: product.featured || false,
        in_stock: product.in_stock !== undefined ? product.in_stock : true,
        stock_quantity: product.stock_quantity || 0,
        features: product.attributes?.map(attr => attr.attribute_value) || []
      }));
      
      setFeaturedProducts(validatedProducts.slice(0, 4));
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos em destaque');
      
      // Produtos de fallback
      setFeaturedProducts([
        {
          id: '1',
          name: 'Laço de Seda Premium Rosa',
          price: 29.90,
          description: 'Laço premium em seda natural com detalhes em renda.',
          featured: true,
          features: ['Seda natural', 'Fecho de velcro']
        },
        {
          id: '2',
          name: 'Laço com Pérolas Branco',
          price: 34.90,
          description: 'Elegante laço branco adornado com pérolas naturais.',
          featured: true,
          features: ['Pérolas naturais', 'Tecido premium']
        },
        {
          id: '3',
          name: 'Kit Laços Coloridos Arco-Íris',
          price: 49.90,
          original_price: 69.90,
          description: 'Kit com 5 laços coloridos para combinar com todas as roupas.',
          featured: true,
          features: ['5 laços diferentes', 'Cores vibrantes']
        },
        {
          id: '4',
          name: 'Laço Baby Azul Celeste',
          price: 22.90,
          description: 'Laço delicado especialmente desenvolvido para bebês.',
          featured: true,
          features: ['Material hipoalergênico', 'Fecho extra macio']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Frete Grátis',
      description: 'Para compras acima de R$ 99'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Compra Segura',
      description: 'Site 100% protegido'
    },
    {
      icon: <FaAward />,
      title: 'Qualidade Garantida',
      description: 'Produtos selecionados'
    },
    {
      icon: <FaHeart />,
      title: 'Feito com Amor',
      description: 'Cada detalhe importa'
    }
  ];

  return (
    <div className="home">
      {/* Carrossel */}
      <section className="hero-carousel">
        <Carousel />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Produtos em Destaque</h2>
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="products-error">
              <p>{error}</p>
              <button onClick={loadFeaturedProducts} className="btn">
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="section-actions">
                <Link to="/produtos" className="btn btn-large">
                  Ver Todos os Produtos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre a Menina de Laço</h2>
              <p>
                Há anos criando laços especiais que transformam momentos comuns 
                em momentos mágicos. Cada peça é feita com carinho, atenção aos 
                detalhes e muito amor.
              </p>
              <p>
                Utilizamos apenas materiais de primeira qualidade e cada laço 
                é único, feito para deixar sua princesa ainda mais encantadora.
              </p>
              <Link to="/sobre" className="btn">
                Nossa História
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Clientes Satisfeitas</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Laços Vendidos</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Avaliação Média</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Home;