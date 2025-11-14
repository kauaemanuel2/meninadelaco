export const products = [
  {
    id: 1,
    name: 'Laço de Seda Premium Rosa',
    price: 'R$ 29,90',
    originalPrice: 'R$ 39,90',
    category: 'premium',
    image: '/images/products/laco-rosa-premium.jpg',
    images: [
      '/images/products/laco-rosa-premium-1.jpg',
      '/images/products/laco-rosa-premium-2.jpg',
      '/images/products/laco-rosa-premium-3.jpg'
    ],
    description: 'Laço premium em seda natural com detalhes em renda. Perfeito para ocasiões especiais.',
    features: ['Seda 100% natural', 'Fecho de velcro', 'Lavável', 'Não desbota'],
    sizes: ['0-1 ano', '1-3 anos', '3-6 anos', '6-10 anos'],
    colors: ['Rosa', 'Branco', 'Vermelho'],
    inStock: true,
    featured: true,
    discount: 25
  },
  {
    id: 2,
    name: 'Laço com Pérolas Branco',
    price: 'R$ 34,90',
    category: 'luxo',
    image: '/images/products/laco-perolas-branco.jpg',
    images: [
      '/images/products/laco-perolas-branco-1.jpg',
      '/images/products/laco-perolas-branco-2.jpg'
    ],
    description: 'Elegante laço branco adornado com pérolas naturais. Sofisticação para sua princesa.',
    features: ['Pérolas naturais', 'Tecido premium', 'Fecho seguro', 'Embalagem presenteável'],
    sizes: ['1-3 anos', '3-6 anos', '6-10 anos'],
    colors: ['Branco', 'Marfim'],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Kit Laços Coloridos Arco-Íris',
    price: 'R$ 49,90',
    originalPrice: 'R$ 69,90',
    category: 'kits',
    image: '/images/products/kit-arco-iris.jpg',
    images: [
      '/images/products/kit-arco-iris-1.jpg',
      '/images/products/kit-arco-iris-2.jpg'
    ],
    description: 'Kit com 5 laços coloridos para combinar com todas as roupas da semana.',
    features: ['5 laços diferentes', 'Cores vibrantes', 'Material resistente', 'Perfeito para dia a dia'],
    sizes: ['Único'],
    colors: ['Multicolor'],
    inStock: true,
    featured: true,
    discount: 28
  },
  {
    id: 4,
    name: 'Laço Baby Azul Celeste',
    price: 'R$ 22,90',
    category: 'baby',
    image: '/images/products/laco-baby-azul.jpg',
    images: [
      '/images/products/laco-baby-azul-1.jpg'
    ],
    description: 'Laço delicado especialmente desenvolvido para bebês. Conforto e beleza.',
    features: ['Material hipoalergênico', 'Fecho extra macio', 'Peso leve', 'Seguro para bebês'],
    sizes: ['0-6 meses', '6-12 meses', '1-2 anos'],
    colors: ['Azul', 'Rosa', 'Branco'],
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: 'Laço Luxo Dourado',
    price: 'R$ 39,90',
    category: 'luxo',
    image: '/images/products/laco-luxo-dourado.jpg',
    images: [
      '/images/products/laco-luxo-dourado-1.jpg',
      '/images/products/laco-luxo-dourado-2.jpg'
    ],
    description: 'Laço exclusivo com detalhes em dourado. Para momentos especiais e festas.',
    features: ['Fios dourados', 'Tecido importado', 'Acabamento perfeito', 'Edição limitada'],
    sizes: ['2-4 anos', '4-6 anos', '6-8 anos'],
    colors: ['Dourado', 'Rose gold'],
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'Kit Festa Infantil',
    price: 'R$ 59,90',
    originalPrice: 'R$ 79,90',
    category: 'kits',
    image: '/images/products/kit-festa.jpg',
    images: [
      '/images/products/kit-festa-1.jpg',
      '/images/products/kit-festa-2.jpg'
    ],
    description: 'Kit completo para festas: laço, bracelete e hair clip combinando.',
    features: ['3 peças combinando', 'Embalagem presente', 'Qualidade premium', 'Perfeito para festas'],
    sizes: ['Único'],
    colors: ['Rosa', 'Azul', 'Lilás'],
    inStock: true,
    featured: false,
    discount: 25
  },
  {
    id: 7,
    name: 'Laço Personalizado Nome',
    price: 'R$ 44,90',
    category: 'personalizados',
    image: '/images/products/laco-personalizado.jpg',
    images: [
      '/images/products/laco-personalizado-1.jpg'
    ],
    description: 'Laço com nome personalizado. Escolha as cores e adicione o nome da sua princesa!',
    features: ['Nome personalizado', 'Escolha de cores', 'Entrega especial', 'Único e exclusivo'],
    sizes: ['Todos os tamanhos'],
    colors: ['Todas as cores'],
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: 'Laço Vintage Floral',
    price: 'R$ 27,90',
    category: 'vintage',
    image: '/images/products/laco-vintage.jpg',
    images: [
      '/images/products/laco-vintage-1.jpg'
    ],
    description: 'Laço com estampa floral vintage. Charmoso e romântico.',
    features: ['Estampa exclusiva', 'Style vintage', 'Confortável', 'Versátil'],
    sizes: ['1-3 anos', '3-6 anos', '6-10 anos'],
    colors: ['Floral rosa', 'Floral azul'],
    inStock: true,
    featured: false
  }
];

export const categories = [
  { id: 'todos', name: 'Todos os Produtos', count: products.length },
  { id: 'premium', name: 'Linha Premium', count: products.filter(p => p.category === 'premium').length },
  { id: 'luxo', name: 'Coleção Luxo', count: products.filter(p => p.category === 'luxo').length },
  { id: 'kits', name: 'Kits Especiais', count: products.filter(p => p.category === 'kits').length },
  { id: 'baby', name: 'Linha Baby', count: products.filter(p => p.category === 'baby').length },
  { id: 'personalizados', name: 'Personalizados', count: products.filter(p => p.category === 'personalizados').length },
  { id: 'vintage', name: 'Style Vintage', count: products.filter(p => p.category === 'vintage').length }
];