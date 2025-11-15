import { useState, useEffect } from 'react';
import { products } from '../data/products';

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulação de carregamento de API
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Em um caso real, aqui viria uma chamada API
        await new Promise(resolve => setTimeout(resolve, 500));
        setAllProducts(products);
      } catch (err) {
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (category === 'todos') return allProducts;
    return allProducts.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return allProducts.filter(product => product.featured);
  };

  const searchProducts = (query) => {
    if (!query) return allProducts;
    
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    products: allProducts,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts
  };
};