import React, { useState, useEffect } from 'react';
import { ordersApi } from '../../config/supabase';
import { FaEye, FaTruck, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filter !== 'all') {
        filters.status = filter;
      }
      const data = await ordersApi.getOrders(filters);
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      alert('Erro ao carregar pedidos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersApi.updateOrder(orderId, { status: newStatus });
      await loadOrders();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status: ' + error.message);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(searchLower) ||
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.customer_email.toLowerCase().includes(searchLower) ||
      order.customer_phone?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'paid': return '#28a745';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#007bff';
      case 'delivered': return '#6f42c1';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'shipped': return <FaTruck />;
      case 'delivered': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      default: return null;
    }
  };

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'paid', label: 'Pagos' },
    { value: 'processing', label: 'Processando' },
    { value: 'shipped', label: 'Enviados' },
    { value: 'delivered', label: 'Entregues' },
    { value: 'cancelled', label: 'Cancelados' }
  ];

  const getTotalRevenue = () => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + parseFloat(order.total), 0);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-admin">
      <div className="admin-header">
        <div>
          <h1>Pedidos</h1>
          <p className="revenue">Receita Total: R$ {getTotalRevenue().toFixed(2)}</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por número, nome, email ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="status-filters">
          {statusOptions.map(option => (
            <button
              key={option.value}
              className={`status-filter ${filter === option.value ? 'active' : ''}`}
              onClick={() => setFilter(option.value)}
              style={filter === option.value ? { backgroundColor: getStatusColor(option.value) } : {}}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Nº Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>
                  <strong>{order.order_number}</strong>
                </td>
                <td>
                  <div className="customer-info">
                    <strong>{order.customer_name}</strong>
                    <small>{order.customer_email}</small>
                    <small>{order.customer_phone}</small>
                  </div>
                </td>
                <td>
                  {format(new Date(order.created_at), 'dd/MM/yyyy')}
                  <br/>
                  <small>{format(new Date(order.created_at), 'HH:mm')}</small>
                </td>
                <td>
                  <div className="items-count">
                    {order.items?.length || 0} itens
                  </div>
                </td>
                <td>
                  <strong>R$ {order.total}</strong>
                </td>
                <td>
                  <div className="status-cell">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="status-select"
                      style={{ borderColor: getStatusColor(order.status) }}
                    >
                      <option value="pending">Pendente</option>
                      <option value="paid">Pago</option>
                      <option value="processing">Processando</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregue</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                    <span className="status-icon">
                      {getStatusIcon(order.status)}
                    </span>
                  </div>
                </td>
                <td>
                  <button className="action-btn view-btn">
                    <FaEye /> Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-results">
          <p>Nenhum pedido encontrado</p>
        </div>
      )}
    </div>
  );
};

export default OrdersAdmin;