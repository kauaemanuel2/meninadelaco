import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaAward, 
  FaUsers, 
  FaRocket,
  FaCheckCircle,
  FaInstagram,
  FaFacebook,
  FaWhatsapp
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: 'Amor em Cada Detalhe',
      description: 'Cada laço é feito com carinho e atenção aos mínimos detalhes.'
    },
    {
      icon: <FaAward />,
      title: 'Qualidade Garantida',
      description: 'Utilizamos apenas materiais de primeira linha e acabamento impecável.'
    },
    {
      icon: <FaUsers />,
      title: 'Foco no Cliente',
      description: 'Sua satisfação é nossa maior recompensa. Atendimento personalizado.'
    },
    {
      icon: <FaRocket />,
      title: 'Inovação Constante',
      description: 'Sempre criando novos designs e acompanhando as tendências.'
    }
  ];

  const team = [
    {
      name: 'Ana Silva',
      role: 'Fundadora & Artesã',
      description: 'Mãe da Clara, começou fazendo laços para sua filha e hoje compartilha esse amor com todas as princesas.',
      image: '👩‍🎨'
    },
    {
      name: 'Maria Santos',
      role: 'Designer Criativa',
      description: 'Responsável pelos designs exclusivos e pelas combinações de cores que encantam nossas clientes.',
      image: '👗'
    },
    {
      name: 'Carla Oliveira',
      role: 'Atendimento',
      description: 'Sempre pronta para ajudar e garantir a melhor experiência de compra para você.',
      image: '💁‍♀️'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Fundação da Menina de Laço' },
    { year: '2019', event: 'Primeiras 100 vendas online' },
    { year: '2020', event: 'Expansão para todo Brasil' },
    { year: '2021', event: 'Lançamento linha premium' },
    { year: '2022', event: '+1000 clientes satisfeitas' },
    { year: '2023', event: 'Coleção exclusiva festas' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">Nossa História</h1>
            <p className="about-subtitle">
              Transformando momentos comuns em momentos mágicos através de laços especiais
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Do Sonho à Realidade</h2>
              <p>
                Tudo começou em 2018, quando Ana, nossa fundadora, começou a criar laços 
                personalizados para sua filha Clara. O amor e cuidado em cada peça chamaram 
                a atenção de outras mães, e o que era um hobby logo se transformou em um 
                negócio cheio de propósito.
              </p>
              <p>
                A Menina de Laço nasceu do desejo de ver cada criança se sentir especial 
                e única. Acreditamos que os pequenos detalhes fazem a diferença e que 
                cada laço carrega não apenas beleza, mas também histórias e memórias.
              </p>
              <p>
                Hoje, somos uma equipe de mulheres apaixonadas por criar acessórios que 
                encantam e duram. Cada pedido é tratado com carinho especial, mantendo 
                viva a essência artesanal que nos tornou referência no mercado.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">🎀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nossos Valores</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Nossa Equipe</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  {member.image}
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Nossa Jornada</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <div className="timeline-dot"></div>
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Nossa Missão</h2>
              <p>
                Criar laços que encantem não apenas pela beleza, mas pela qualidade, 
                durabilidade e significado. Queremos que cada peça seja especial e 
                faça parte de momentos únicos na vida das crianças.
              </p>
              <div className="mission-features">
                <div className="feature">
                  <FaCheckCircle className="feature-check" />
                  <span>Qualidade premium garantida</span>
                </div>
                <div className="feature">
                  <FaCheckCircle className="feature-check" />
                  <span>Atendimento personalizado</span>
                </div>
                <div className="feature">
                  <FaCheckCircle className="feature-check" />
                  <span>Entrega rápida e segura</span>
                </div>
                <div className="feature">
                  <FaCheckCircle className="feature-check" />
                  <span>Produtos exclusivos e únicos</span>
                </div>
              </div>
            </div>
            <div className="mission-stats">
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Laços Vendidos</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Clientes Satisfeitas</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Avaliação Média</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Index de Recomendação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Pronta para Encontrar o Laço Perfeito?</h2>
            <p>Explore nossa coleção e descubra peças únicas feitas com amor</p>
            <div className="cta-actions">
              <Link to="/produtos" className="btn btn-large">
                Ver Produtos
              </Link>
              <Link to="/contato" className="btn btn-secondary btn-large">
                Fale Conosco
              </Link>
            </div>
            <div className="social-proof">
              <p>Siga nossas redes sociais:</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;