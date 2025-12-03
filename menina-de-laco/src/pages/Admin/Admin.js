import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { authApi, productsApi, categoriesApi, carouselApi, ordersApi, insightsApi } from '../../config/supabase';
import { 
  FaHome, 
  FaBox, 
  FaTags, 
  FaImages, 
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaArrowLeft,
  FaSave,
  FaUpload
} from 'react-icons/fa';
import './Admin.css';

// Componentes das páginas do admin
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authApi.login(email, password);
      const user = await authApi.getCurrentUser();
      
      if (user.is_admin) {
        onLogin(user);
      } else {
        setError('Acesso restrito a administradores');
        await authApi.logout();
      }
    } catch (err) {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>🎀 Menina de Laço</h1>
          <p>Painel Administrativo</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@meninadelaco.com"
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>© 2024 Menina de Laço - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🎀 Admin</h2>
          <p>Menina de Laço</p>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item">
            <FaHome /> Dashboard
          </Link>
          <Link to="/admin/produtos" className="nav-item">
            <FaBox /> Produtos
          </Link>
          <Link to="/admin/categorias" className="nav-item">
            <FaTags /> Categorias
          </Link>
          <Link to="/admin/carrossel" className="nav-item">
            <FaImages /> Carrossel
          </Link>
          <Link to="/admin/pedidos" className="nav-item">
            <FaShoppingCart /> Pedidos
          </Link>
          <Link to="/admin/relatorios" className="nav-item">
            <FaChartBar /> Relatórios
          </Link>
          <Link to="/admin/usuarios" className="nav-item">
            <FaUsers /> Usuários
          </Link>
          <Link to="/admin/configuracoes" className="nav-item">
            <FaCog /> Configurações
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Carregar produtos
      const products = await productsApi.getProducts();
      
      // Carregar pedidos
      const orders = await ordersApi.getOrders();
      
      // Carregar produtos com estoque baixo
      const stockAlerts = await insightsApi.getStockAlerts();
      
      // Calcular receita total
      const revenue = orders
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => sum + parseFloat(order.total), 0);
      
      // Produtos mais vendidos
      const topProductsData = await insightsApi.getTopProducts(5);
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        lowStock: stockAlerts.length
      });
      
      setRecentOrders(orders.slice(0, 5));
      setTopProducts(topProductsData);
      
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Produtos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Pedidos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>R$ {stats.totalRevenue.toFixed(2)}</h3>
            <p>Receita Total</p>
          </div>
        </div>
        
        <div className="stat-card alert">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.lowStock}</h3>
            <p>Produtos com Estoque Baixo</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="dashboard-section">
        <h2>Pedidos Recentes</h2>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Nº Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.order_number}</td>
                  <td>{order.customer_name}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>R$ {order.total}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view-btn">
                      <FaEye /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="dashboard-section">
        <h2>Produtos Mais Vendidos</h2>
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Receita</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {item.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    original_price: '',
    cost_price: '',
    sku: '',
    category_id: '',
    featured: false,
    in_stock: true,
    stock_quantity: 0,
    low_stock_threshold: 10,
    weight_grams: '',
    dimensions: '',
    slug: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getProducts(),
        categoriesApi.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        await productsApi.updateProduct(editingProduct.id, formData);
      } else {
        await productsApi.createProduct(formData);
      }
      
      await loadData();
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto: ' + error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      short_description: product.short_description || '',
      price: product.price,
      original_price: product.original_price || '',
      cost_price: product.cost_price || '',
      sku: product.sku || '',
      category_id: product.category_id,
      featured: product.featured,
      in_stock: product.in_stock,
      stock_quantity: product.stock_quantity,
      low_stock_threshold: product.low_stock_threshold || 10,
      weight_grams: product.weight_grams || '',
      dimensions: product.dimensions || '',
      slug: product.slug
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productsApi.deleteProduct(id);
        await loadData();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      short_description: '',
      price: '',
      original_price: '',
      cost_price: '',
      sku: '',
      category_id: '',
      featured: false,
      in_stock: true,
      stock_quantity: 0,
      low_stock_threshold: 10,
      weight_grams: '',
      dimensions: '',
      slug: ''
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
    <div className="products-admin">
      <div className="admin-header">
        <h1>Gerenciar Produtos</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Novo Produto
        </button>
      </div>

      {showForm ? (
        <div className="product-form">
          <div className="form-header">
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
                resetForm();
              }}
            >
              <FaArrowLeft /> Voltar
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome do Produto *</label>
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
                <label>Preço *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Preço Original</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Custo</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Estoque</label>
                <input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({...formData, stock_quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="form-group">
                <label>Limite de Estoque Baixo</label>
                <input
                  type="number"
                  value={formData.low_stock_threshold}
                  onChange={(e) => setFormData({...formData, low_stock_threshold: parseInt(e.target.value) || 10})}
                />
              </div>
              
              <div className="form-group full-width">
                <label>Descrição Curta</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  maxLength="200"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Descrição Completa *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span>Produto em Destaque</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({...formData, in_stock: e.target.checked})}
                  />
                  <span>Disponível em Estoque</span>
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaSave /> {editingProduct ? 'Atualizar' : 'Salvar'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
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
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-image">
                        {product.images?.[0] ? (
                          <img src={product.images[0].image_url} alt={product.name} />
                        ) : (
                          <div className="image-placeholder">🎀</div>
                        )}
                      </div>
                      <div className="product-info">
                        <strong>{product.name}</strong>
                        <small>{product.short_description}</small>
                      </div>
                    </div>
                  </td>
                  <td>{product.category?.name || '-'}</td>
                  <td>R$ {product.price}</td>
                  <td>
                    <span className={`stock-badge ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                      {product.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(product.id)}
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

// Componentes similares para Categorias, Carrossel, Pedidos, etc...
// (Vou mostrar apenas o padrão, os outros seguem a mesma estrutura)

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await authApi.getSession();
      if (session) {
        const currentUser = await authApi.getCurrentUser();
        if (currentUser?.is_admin) {
          setUser(currentUser);
        } else {
          navigate('/admin/login');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    }
  };

  const handleLogin = async (email, password) => {
  // Para desenvolvimento, aceita qualquer credencial
  if (email && password) {
    const mockUser = {
      id: 'admin-1',
      email: email,
      name: 'Administrador',
      is_admin: true
    };
    saveMockUser(mockUser);
    onLogin(mockUser);
  } else {
    setError('Credenciais inválidas');
  }
};

 // E no handleLogout:
const handleLogout = () => {
  removeMockUser();
  onLogout();
};

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produtos" element={<ProductsAdmin />} />
        <Route path="/categorias" element={<CategoriesAdmin />} />
        <Route path="/carrossel" element={<CarouselAdmin />} />
        <Route path="/pedidos" element={<OrdersAdmin />} />
        <Route path="/relatorios" element={<ReportsAdmin />} />
        <Route path="/usuarios" element={<UsersAdmin />} />
        <Route path="/configuracoes" element={<SettingsAdmin />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;