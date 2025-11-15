import React, { useState } from 'react';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebook, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPaperPlane
} from 'react-icons/fa';
import './Contact.css';

const Contact = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      info: '(11) 99999-9999',
      description: 'Atendimento rápido e direto',
      link: 'https://wa.me/5511999999999',
      color: '#25D366'
    },
    {
      icon: <FaInstagram />,
      title: 'Instagram',
      info: '@meninadelaco',
      description: 'Siga e envie mensagem',
      link: 'https://instagram.com/meninadelaco',
      color: '#E4405F'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      info: 'contato@meninadelaco.com',
      description: 'Respondemos em até 24h',
      link: 'mailto:contato@meninadelaco.com',
      color: '#EA4335'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Localização',
      info: 'São Paulo - SP',
      description: 'Entregamos para todo Brasil',
      link: '#',
      color: '#4285F4'
    }
  ];

  const businessHours = [
    { day: 'Segunda - Sexta', hours: '9:00 - 18:00' },
    { day: 'Sábado', hours: '9:00 - 13:00' },
    { day: 'Domingo', hours: 'Fechado' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Por favor, digite um email válido.');
      setIsLoading(false);
      return;
    }

    // Simulação de envio
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Usando alert como fallback
      if (showToast) {
        showToast('🎉 Mensagem enviada com sucesso! Entraremos em contato em breve.');
      } else {
        alert('🎉 Mensagem enviada com sucesso! Entraremos em contato em breve.');
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      if (showToast) {
        showToast('❌ Erro ao enviar mensagem. Tente novamente.', 'error');
      } else {
        alert('❌ Erro ao enviar mensagem. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Entre em Contato</h1>
          <p className="page-subtitle">
            Estamos aqui para ajudar! Entre em contato conosco de qualquer maneira que for conveniente para você.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Vamos Conversar!</h2>
            <p className="contact-description">
              Tem alguma dúvida sobre nossos produtos? Precisa de ajuda com seu pedido? 
              Ou quer fazer uma encomenda personalizada? Estamos sempre felizes em ajudar!
            </p>

            {/* Contact Methods */}
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="contact-method"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--method-color': method.color }}
                >
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <div className="method-info">
                    <h4>{method.title}</h4>
                    <p className="method-detail">{method.info}</p>
                    <p className="method-description">{method.description}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="business-hours">
              <h3>
                <FaClock className="hours-icon" />
                Horário de Atendimento
              </h3>
              <div className="hours-list">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="hour-item">
                    <span className="day">{schedule.day}</span>
                    <span className="hours">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="faq-preview">
              <h3>Perguntas Frequentes</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <strong>Qual o prazo de entrega?</strong>
                  <p>De 3 a 7 dias úteis para Grande SP e 5 a 10 dias para outras regiões.</p>
                </div>
                <div className="faq-item">
                  <strong>Vocês fazem laços personalizados?</strong>
                  <p>Sim! Trabalhamos com encomendas personalizadas. Entre em contato!</p>
                </div>
                <div className="faq-item">
                  <strong>Qual o valor do frete?</strong>
                  <p>Frete grátis para compras acima de R$ 99. Consulte valores para outras compras.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Envie sua Mensagem</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone/WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Assunto</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida sobre produtos</option>
                    <option value="pedido">Acompanhamento de pedido</option>
                    <option value="personalizado">Encomenda personalizada</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Conte-nos como podemos ajudar você..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="form-note">
                * Campos obrigatórios. Seus dados estão seguros conosco.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;