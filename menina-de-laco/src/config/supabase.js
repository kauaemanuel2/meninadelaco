// Configuração do Supabase
const SUPABASE_CONFIG = {
  url: process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co',
  key: process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'
};

// Mock das APIs para desenvolvimento
const createMockAPI = () => {
  console.warn('⚠️ Usando dados mockados. Configure o Supabase no .env');
  
 const mockProducts = [
  {
    id: '1',
    name: 'Laço de Seda Premium Rosa',
    price: 29.90,
    original_price: 39.90,
    description: 'Laço premium em seda natural com detalhes em renda. Perfeito para ocasiões especiais.',
    short_description: 'Laço premium em seda natural',
    category: { id: '1', name: 'Premium' },
    images: [
      { id: '1', image_url: '/images/products/laco-rosa.jpg', is_primary: true }
    ],
    attributes: [
      { id: '1', attribute_type: 'color', attribute_value: 'Rosa', additional_price: 0 },
      { id: '2', attribute_type: 'size', attribute_value: 'M', additional_price: 0 },
      { id: '3', attribute_type: 'material', attribute_value: 'Seda natural', additional_price: 0 }
    ],
    featured: true,
    in_stock: true,
    stock_quantity: 15,
    low_stock_threshold: 5,
    sku: 'LACO-001',
    weight_grams: 50,
    dimensions: '15x15cm'
  },
  // Adicione mais produtos com estrutura completa
  {
    id: '2',
    name: 'Laço com Pérolas Branco',
    price: 34.90,
    description: 'Elegante laço branco adornado com pérolas naturais. Sofisticação para sua princesa.',
    short_description: 'Laço com pérolas naturais',
    category: { id: '2', name: 'Luxo' },
    images: [
      { id: '2', image_url: '/images/products/laco-perolas.jpg', is_primary: true }
    ],
    attributes: [
      { id: '4', attribute_type: 'color', attribute_value: 'Branco', additional_price: 0 },
      { id: '5', attribute_type: 'size', attribute_value: 'M', additional_price: 0 }
    ],
    featured: true,
    in_stock: true,
    stock_quantity: 8,
    low_stock_threshold: 3,
    sku: 'LACO-002',
    weight_grams: 60,
    dimensions: '16x16cm'
  },
  {
    id: '3',
    name: 'Kit Laços Coloridos Arco-Íris',
    price: 49.90,
    original_price: 69.90,
    description: 'Kit com 5 laços coloridos para combinar com todas as roupas da semana.',
    short_description: 'Kit com 5 laços coloridos',
    category: { id: '3', name: 'Kits' },
    images: [
      { id: '3', image_url: '/images/products/kit-arco-iris.jpg', is_primary: true }
    ],
    attributes: [
      { id: '6', attribute_type: 'color', attribute_value: 'Multicolor', additional_price: 0 }
    ],
    featured: true,
    in_stock: true,
    stock_quantity: 12,
    low_stock_threshold: 4,
    sku: 'KIT-001',
    weight_grams: 100,
    dimensions: '18x18cm'
  }
];
  const mockCategories = [
    { id: '1', name: 'Premium', slug: 'premium', description: 'Linha premium' },
    { id: '2', name: 'Luxo', slug: 'luxo', description: 'Coleção luxo' },
    { id: '3', name: 'Personalizados', slug: 'personalizados', description: 'Laços personalizados' }
  ];

  return {
    authApi: {
      login: async (email, password) => {
        console.log('Mock login:', email);
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'admin@meninadelaco.com' && password === 'admin123') {
          return {
            user: {
              id: 'admin-1',
              email: email,
              is_admin: true
            }
          };
        }
        throw new Error('Credenciais inválidas');
      },

      logout: async () => {
        console.log('Mock logout');
        await new Promise(resolve => setTimeout(resolve, 500));
      },

      getCurrentUser: async () => {
        // Verificar se há usuário no localStorage
        const userStr = localStorage.getItem('mock_user');
        if (userStr) {
          return JSON.parse(userStr);
        }
        return null;
      },

      getSession: async () => {
        const userStr = localStorage.getItem('mock_user');
        return userStr ? { user: JSON.parse(userStr) } : null;
      }
    },

    productsApi: {
      getProducts: async (filters = {}) => {
  console.log('Mock getProducts:', filters);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = [...mockProducts];
  
  if (filters.featured) {
    filtered = filtered.filter(p => p.featured);
  }
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category?.id === filters.category);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Garantir que todos os produtos tenham features
  return filtered.map(product => ({
    ...product,
    features: product.attributes?.map(attr => attr.attribute_value) || []
  }));
},

      getProductById: async (id) => {
        console.log('Mock getProductById:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const product = mockProducts.find(p => p.id === id);
        if (!product) throw new Error('Produto não encontrado');
        return product;
      },

      createProduct: async (productData) => {
        console.log('Mock createProduct:', productData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newProduct = {
          id: Date.now().toString(),
          ...productData,
          created_at: new Date().toISOString()
        };
        
        mockProducts.push(newProduct);
        return newProduct;
      },

      updateProduct: async (id, productData) => {
        console.log('Mock updateProduct:', id, productData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockProducts.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produto não encontrado');
        
        mockProducts[index] = { ...mockProducts[index], ...productData };
        return mockProducts[index];
      },

      deleteProduct: async (id) => {
        console.log('Mock deleteProduct:', id);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockProducts.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produto não encontrado');
        
        mockProducts.splice(index, 1);
      },

      updateStock: async (productId, quantityChange, movementType, notes = '', userId = null) => {
        console.log('Mock updateStock:', productId, quantityChange);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const product = mockProducts.find(p => p.id === productId);
        if (!product) throw new Error('Produto não encontrado');
        
        const previousQuantity = product.stock_quantity;
        const newQuantity = previousQuantity + quantityChange;
        
        product.stock_quantity = newQuantity;
        product.in_stock = newQuantity > 0;
        
        return { previousQuantity, newQuantity };
      }
    },

    categoriesApi: {
      getCategories: async () => {
        console.log('Mock getCategories');
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCategories;
      },

      getCategoryById: async (id) => {
        console.log('Mock getCategoryById:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const category = mockCategories.find(c => c.id === id);
        if (!category) throw new Error('Categoria não encontrada');
        return category;
      },

      createCategory: async (categoryData) => {
        console.log('Mock createCategory:', categoryData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newCategory = {
          id: Date.now().toString(),
          ...categoryData
        };
        
        mockCategories.push(newCategory);
        return newCategory;
      },

      updateCategory: async (id, categoryData) => {
        console.log('Mock updateCategory:', id, categoryData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockCategories.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Categoria não encontrada');
        
        mockCategories[index] = { ...mockCategories[index], ...categoryData };
        return mockCategories[index];
      },

      deleteCategory: async (id) => {
        console.log('Mock deleteCategory:', id);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockCategories.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Categoria não encontrada');
        
        mockCategories.splice(index, 1);
      }
    },

    carouselApi: {
      getActiveSlides: async () => {
        console.log('Mock getActiveSlides');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return [
          {
            id: '1',
            title: 'Laços Encantadores',
            subtitle: 'Coleção exclusiva para sua princesa',
            image_url: '/images/banner1.jpg',
            button_text: 'Comprar Agora',
            button_link: '/produtos',
            display_order: 1,
            is_active: true
          },
          {
            id: '2',
            title: 'Até 30% OFF',
            subtitle: 'Promoções especiais por tempo limitado',
            image_url: '/images/banner2.jpg',
            button_text: 'Ver Ofertas',
            button_link: '/produtos?categoria=ofertas',
            display_order: 2,
            is_active: true
          }
        ];
      },

      getSlideById: async (id) => {
        console.log('Mock getSlideById:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const slides = await this.getActiveSlides();
        const slide = slides.find(s => s.id === id);
        if (!slide) throw new Error('Slide não encontrado');
        return slide;
      },

      createSlide: async (slideData) => {
        console.log('Mock createSlide:', slideData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newSlide = {
          id: Date.now().toString(),
          ...slideData
        };
        
        // Em uma implementação real, você adicionaria ao array
        return newSlide;
      },

      updateSlide: async (id, slideData) => {
        console.log('Mock updateSlide:', id, slideData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return { id, ...slideData };
      },

      deleteSlide: async (id) => {
        console.log('Mock deleteSlide:', id);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    },

    ordersApi: {
      getOrders: async (filters = {}) => {
        console.log('Mock getOrders:', filters);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockOrders = [
          {
            id: '1',
            order_number: 'PED-001',
            customer_name: 'Maria Silva',
            customer_email: 'maria@email.com',
            status: 'pending',
            total: 89.90,
            created_at: new Date().toISOString(),
            items: [
              { product_name: 'Laço de Seda Premium', quantity: 2, total_price: 59.80 },
              { product_name: 'Kit Laços Coloridos', quantity: 1, total_price: 30.10 }
            ]
          },
          {
            id: '2',
            order_number: 'PED-002',
            customer_name: 'Ana Santos',
            customer_email: 'ana@email.com',
            status: 'delivered',
            total: 149.90,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            items: [
              { product_name: 'Laço Luxo Dourado', quantity: 1, total_price: 149.90 }
            ]
          }
        ];
        
        let filtered = mockOrders;
        
        if (filters.userId) {
          // Filtrar por usuário (simulação)
          filtered = filtered.filter(o => o.customer_email.includes('test'));
        }
        
        if (filters.status && filters.status !== 'all') {
          filtered = filtered.filter(o => o.status === filters.status);
        }
        
        return filtered;
      },

      getOrderById: async (id) => {
        console.log('Mock getOrderById:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const orders = await this.getOrders();
        const order = orders.find(o => o.id === id);
        if (!order) throw new Error('Pedido não encontrado');
        return order;
      },

      createOrder: async (orderData) => {
        console.log('Mock createOrder:', orderData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newOrder = {
          id: Date.now().toString(),
          order_number: `PED-${Date.now().toString().slice(-6)}`,
          ...orderData,
          created_at: new Date().toISOString()
        };
        
        return newOrder;
      },

      updateOrder: async (id, orderData) => {
        console.log('Mock updateOrder:', id, orderData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return { id, ...orderData };
      },

      getOrderStats: async () => {
        console.log('Mock getOrderStats');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const orders = await this.getOrders();
        return orders;
      }
    },

    insightsApi: {
      getSalesByDate: async (startDate, endDate) => {
        console.log('Mock getSalesByDate:', startDate, endDate);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const orders = await ordersApi.getOrders();
        return orders.filter(o => o.status === 'delivered');
      },

      getTopProducts: async (limit = 10) => {
        console.log('Mock getTopProducts:', limit);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return [
          { product_name: 'Laço de Seda Premium', quantity: 45, total_price: 1345.50 },
          { product_name: 'Kit Laços Coloridos', quantity: 32, total_price: 960.00 },
          { product_name: 'Laço Luxo Dourado', quantity: 28, total_price: 1117.20 },
          { product_name: 'Laço Baby Azul', quantity: 25, total_price: 572.50 }
        ].slice(0, limit);
      },

      getStockAlerts: async () => {
        console.log('Mock getStockAlerts');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const products = await productsApi.getProducts();
        return products.filter(p => p.stock_quantity < p.low_stock_threshold);
      }
    }
  };
};

// Verificar se temos credenciais do Supabase
const hasSupabaseCredentials = SUPABASE_CONFIG.url && SUPABASE_CONFIG.key && 
  !SUPABASE_CONFIG.url.includes('your-project') && 
  !SUPABASE_CONFIG.key.includes('your-anon-key');

let api;

if (hasSupabaseCredentials) {
  try {
    // Carregar dinamicamente para evitar erros se não estiver instalado
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
    
    api = {
      // Implementação real do Supabase (simplificada)
      authApi: {
        login: async (email, password) => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          return data;
        },

        logout: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
        },

        getCurrentUser: async () => {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error) throw error;
          
          if (user) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();
            
            if (!userError) {
              return { ...user, ...userData };
            }
          }
          
          return null;
        },

        getSession: async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          return session;
        }
      }
      // ... outras APIs reais podem ser adicionadas aqui
    };
    
    console.log('✅ Supabase configurado corretamente');
    
  } catch (error) {
    console.warn('❌ Erro ao configurar Supabase, usando dados mockados:', error.message);
    api = createMockAPI();
  }
} else {
  console.warn('⚠️ Credenciais do Supabase não configuradas. Usando dados mockados.');
  console.warn('Configure REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY no .env');
  api = createMockAPI();
}

// Exportar APIs
export const { 
  authApi, 
  productsApi, 
  categoriesApi, 
  carouselApi, 
  ordersApi, 
  insightsApi 
} = api;

// Helper para salvar usuário mock no localStorage
export const saveMockUser = (user) => {
  localStorage.setItem('mock_user', JSON.stringify(user));
};

// Helper para remover usuário mock
export const removeMockUser = () => {
  localStorage.removeItem('mock_user');
};