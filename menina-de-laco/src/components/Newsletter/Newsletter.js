import React, { useState } from 'react';
import { FaPaperPlane, FaGift } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, digite seu email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Por favor, digite um email válido');
      return;
    }

    setIsLoading(true);

    // Simulação de cadastro
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('🎉 Cadastrado com sucesso! Você ganhou 10% de desconto na primeira compra.');
      setEmail('');
    } catch (error) {
      toast.error('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <FaGift className="newsletter-icon" />
            <h2 className="newsletter-title">Junte-se à nossa lista</h2>
            <p className="newsletter-description">
              Cadastre-se e receba <strong>10% OFF</strong> na primeira compra, 
              além de novidades exclusivas e promoções especiais!
            </p>
          </div>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="newsletter-input"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="newsletter-btn"
              >
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <FaPaperPlane />
                    Cadastrar
                  </>
                )}
              </button>
            </div>
            <p className="newsletter-note">
              📧 Não se preocupe, não enviamos spam. Você pode cancelar a qualquer momento.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;