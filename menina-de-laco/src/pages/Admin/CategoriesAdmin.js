import React, { useState, useEffect } from 'react';
import { categoriesApi } from '../../config/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaArrowLeft, FaImage } from 'react-icons/fa';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      alert('Erro ao carregar categorias: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await categoriesApi.updateCategory(editingCategory.id, formData);
      } else {
        await categoriesApi.createCategory(formData);
      }
      
      await loadCategories();
      setShowForm(false);
      setEditingCategory(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria: ' + error.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image_url: category.image_url || '',
      display_order: category.display_order || 0,
      is_active: category.is_active
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await categoriesApi.deleteCategory(id);
        await loadCategories();
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        alert('Erro ao excluir categoria: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '',
      display_order: 0,
      is_active: true
    });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="categories-admin">
      <div className="admin-header">
        <h1>Gerenciar Categorias</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingCategory(null);
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Nova Categoria
        </button>
      </div>

      {showForm ? (
        <div className="product-form">
          <div className="form-header">
            <h2>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingCategory(null);
                resetForm();
              }}
            >
              <FaArrowLeft /> Voltar
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome da Categoria *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value)
                    });
                  }}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Ordem de Exibição</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="form-group full-width">
                <label>URL da Imagem</label>
                <div className="image-input-group">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://exemplo.com/imagem.jpg"
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
              
              <div className="form-group full-width">
                <label>Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                />
              </div>
              
              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  />
                  <span>Categoria Ativa</span>
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaSave /> {editingCategory ? 'Atualizar' : 'Salvar'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
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
                <th>Categoria</th>
                <th>Slug</th>
                <th>Produtos</th>
                <th>Ordem</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-image">
                        {category.image_url ? (
                          <img src={category.image_url} alt={category.name} />
                        ) : (
                          <div className="image-placeholder">🏷️</div>
                        )}
                      </div>
                      <div className="product-info">
                        <strong>{category.name}</strong>
                        <small>{category.description?.substring(0, 60)}...</small>
                      </div>
                    </div>
                  </td>
                  <td>{category.slug}</td>
                  <td>-</td>
                  <td>{category.display_order}</td>
                  <td>
                    <span className={`status-badge ${category.is_active ? 'active' : 'inactive'}`}>
                      {category.is_active ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(category)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(category.id)}
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

export default CategoriesAdmin;