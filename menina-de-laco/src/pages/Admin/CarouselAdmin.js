import React, { useState, useEffect } from 'react';
import { carouselApi } from '../../config/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaArrowLeft, FaCalendar, FaImage } from 'react-icons/fa';
import { format } from 'date-fns';

const CarouselAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    button_text: '',
    button_link: '',
    display_order: 0,
    is_active: true,
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setLoading(true);
      const data = await carouselApi.getActiveSlides();
      setSlides(data);
    } catch (error) {
      console.error('Erro ao carregar slides:', error);
      alert('Erro ao carregar slides: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const slideData = {
        ...formData,
        display_order: parseInt(formData.display_order) || 0
      };
      
      if (editingSlide) {
        await carouselApi.updateSlide(editingSlide.id, slideData);
      } else {
        await carouselApi.createSlide(slideData);
      }
      
      await loadSlides();
      setShowForm(false);
      setEditingSlide(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar slide:', error);
      alert('Erro ao salvar slide: ' + error.message);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      image_url: slide.image_url || '',
      button_text: slide.button_text || '',
      button_link: slide.button_link || '',
      display_order: slide.display_order || 0,
      is_active: slide.is_active,
      start_date: slide.start_date ? format(new Date(slide.start_date), 'yyyy-MM-dd') : '',
      end_date: slide.end_date ? format(new Date(slide.end_date), 'yyyy-MM-dd') : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este slide?')) {
      try {
        await carouselApi.deleteSlide(id);
        await loadSlides();
      } catch (error) {
        console.error('Erro ao excluir slide:', error);
        alert('Erro ao excluir slide: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      button_text: '',
      button_link: '',
      display_order: 0,
      is_active: true,
      start_date: '',
      end_date: ''
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="carousel-admin">
      <div className="admin-header">
        <h1>Gerenciar Carrossel</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingSlide(null);
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Novo Slide
        </button>
      </div>

      {showForm ? (
        <div className="product-form">
          <div className="form-header">
            <h2>{editingSlide ? 'Editar Slide' : 'Novo Slide'}</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingSlide(null);
                resetForm();
              }}
            >
              <FaArrowLeft /> Voltar
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Título principal do slide"
                />
              </div>
              
              <div className="form-group">
                <label>Ordem de Exibição</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: e.target.value})}
                  min="0"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Subtítulo</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  placeholder="Texto secundário do slide"
                />
              </div>
              
              <div className="form-group">
                <label>Texto do Botão</label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({...formData, button_text: e.target.value})}
                  placeholder="Ex: Comprar Agora"
                />
              </div>
              
              <div className="form-group">
                <label>Link do Botão</label>
                <input
                  type="text"
                  value={formData.button_link}
                  onChange={(e) => setFormData({...formData, button_link: e.target.value})}
                  placeholder="/produtos ou URL completa"
                />
              </div>
              
              <div className="form-group full-width">
                <label>URL da Imagem *</label>
                <div className="image-input-group">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://exemplo.com/banner.jpg"
                    required
                  />
                  <button type="button" className="btn btn-secondary">
                    <FaImage /> Upload
                  </button>
                </div>
                {formData.image_url && (
                  <div className="image-preview">
                    <img src={formData.image_url} alt="Preview" />
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label>
                  <FaCalendar /> Data de Início
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>
                  <FaCalendar /> Data de Término
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
              
              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  />
                  <span>Slide Ativo</span>
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaSave /> {editingSlide ? 'Atualizar' : 'Salvar'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingSlide(null);
                  resetForm();
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Slide</th>
                <th>Título</th>
                <th>Ordem</th>
                <th>Período</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {slides.map(slide => (
                <tr key={slide.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-image">
                        {slide.image_url ? (
                          <img src={slide.image_url} alt={slide.title} />
                        ) : (
                          <div className="image-placeholder">🖼️</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <strong>{slide.title}</strong>
                      <small>{slide.subtitle?.substring(0, 40)}...</small>
                    </div>
                  </td>
                  <td>{slide.display_order}</td>
                  <td>
                    {slide.start_date ? format(new Date(slide.start_date), 'dd/MM/yyyy') : '-'} 
                    <br/>
                    {slide.end_date ? format(new Date(slide.end_date), 'dd/MM/yyyy') : '-'}
                  </td>
                  <td>
                    <span className={`status-badge ${slide.is_active ? 'active' : 'inactive'}`}>
                      {slide.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(slide)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(slide.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarouselAdmin;