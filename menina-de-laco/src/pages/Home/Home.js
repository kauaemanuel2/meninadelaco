import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import Newsletter from '../../components/Newsletter/Newsletter';
import { 
  FaShippingFast, 
  FaShieldAlt, 
  FaAward, 
  FaHeart 
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const featuredProducts = products.filter(product => product.featured);
  const bestSellers = products.slice(0, 4);

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
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Laços Encantadores para 
                <span className="highlight"> Sua Princesa</span>
              </h1>
              <p className="hero-description">
                Descubra nossa coleção exclusiva de laços infantis feitos com amor, 
                qualidade e atenção aos detalhes. Cada peça é única e especial!
              </p>
              <div className="hero-actions">
                <Link to="/produtos" className="btn btn-large">
                  Ver Coleção
                </Link>
                <Link to="/sobre" className="btn btn-secondary btn-large">
                  Conheça Nossa História
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-elements">
                <div className="floating-element element-1">🎀</div>
                <div className="floating-element element-2">✨</div>
                <div className="floating-element element-3">💖</div>
              </div>
            </div>
          </div>
        </div>
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
        </div>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <div className="container">
          <h2 className="section-title">Mais Vendidos</h2>
          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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