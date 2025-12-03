import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Laços Encantadores',
      subtitle: 'Coleção exclusiva para sua princesa',
      image: '/images/banner1.jpg',
      buttonText: 'Comprar Agora',
      buttonLink: '/produtos',
      color: 'var(--primary-pink)'
    },
    {
      id: 2,
      title: 'Até 30% OFF',
      subtitle: 'Promoções especiais por tempo limitado',
      image: '/images/banner2.jpg',
      buttonText: 'Ver Ofertas',
      buttonLink: '/produtos?categoria=ofertas',
      color: 'var(--dark-pink)'
    },
    {
      id: 3,
      title: 'Personalizados',
      subtitle: 'Crie laços únicos com o nome da sua princesa',
      image: '/images/banner3.jpg',
      buttonText: 'Personalizar',
      buttonLink: '/produtos?categoria=personalizados',
      color: 'var(--secondary-pink)'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%), url(${slide.image})`,
              backgroundColor: slide.color
            }}
          >
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              {slide.buttonText && slide.buttonLink && (
                <Link to={slide.buttonLink} className="slide-button">
                  {slide.buttonText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        className="carousel-btn carousel-prev" 
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        &lt;
      </button>
      <button 
        className="carousel-btn carousel-next" 
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        &gt;
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="carousel-progress">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            transition: isPlaying ? 'width 5s linear' : 'none'
          }} 
        />
      </div>
    </div>
  );
};

export default Carousel;