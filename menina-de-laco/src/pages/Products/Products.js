import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'todos');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace('R$', '').replace(',', '.')) - 
                 parseFloat(b.price.replace('R$', '').replace(',', '.'));
        case 'price-high':
          return parseFloat(b.price.replace('R$', '').replace(',', '.')) - 
                 parseFloat(a.price.replace('R$', '').replace(',', '.'));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId !== 'todos' ? { categoria: categoryId } : {});
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Nossos Produtos</h1>
          <p className="page-subtitle">
            Descubra nossa coleção exclusiva de laços e acessórios
          </p>
        </div>

        {/* Controls */}
        <div className="products-controls">
          {/* Search */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Sort */}
          <div className="sort-control">
            <label htmlFor="sort">Ordenar por:</label>
            <select 
              id="sort" 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="name">Nome</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
            </select>
          </div>

          {/* Filter Toggle for Mobile */}
          <button className="filter-toggle" onClick={toggleFilter}>
            <FaFilter />
            Filtros
          </button>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${isFilterOpen ? 'filters-open' : ''}`}>
            <div className="filters-header">
              <h3>Filtros</h3>
              <button className="close-filters" onClick={toggleFilter}>
                <FaTimes />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4 className="filter-title">Categorias</h4>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-title">Preço</h4>
              <div className="price-filters">
                <button className="price-filter active">Todos os preços</button>
                <button className="price-filter">Até R$ 25</button>
                <button className="price-filter">R$ 25 - R$ 50</button>
                <button className="price-filter">Acima de R$ 50</button>
              </div>
            </div>

            {/* Features */}
            <div className="filter-group">
              <h4 className="filter-title">Características</h4>
              <div className="feature-filters">
                <label className="feature-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Frete Grátis
                </label>
                <label className="feature-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Em Oferta
                </label>
                <label className="feature-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Mais Vendidos
                </label>
                <label className="feature-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Personalizável
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            {/* Results Info */}
            <div className="results-info">
              <p>
                Mostrando <strong>{filteredProducts.length}</strong> 
                {filteredProducts.length === 1 ? ' produto' : ' produtos'}
                {selectedCategory !== 'todos' && ` em ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🎀</div>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou termos de busca</p>
                <button 
                  className="btn"
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSearchTerm('');
                  }}
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;