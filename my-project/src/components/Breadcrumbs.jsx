import { Link, useLocation, useMatch } from 'react-router-dom';
import { products } from '../data/products';

const Breadcrumbs = () => {
  const location = useLocation();
  
  
  const productMatch = useMatch('/product/:id');
  const id = productMatch?.params.id;
  
  
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category');
  
  
  const currentProduct = id ? products.find(p => p.id === parseInt(id)) : null;

  console.log('=== BREADCRUMBS DEBUG ===');
  console.log('Product match:', productMatch);
  console.log('ID from match:', id);
  console.log('Current product:', currentProduct);

  // Функция для перевода категорий на русский
  const getCategoryName = (category) => {
    const categoryNames = {
      'smartphones': 'Смартфоны',
      'laptops': 'Ноутбуки', 
      'tablets': 'Планшеты',
      'accessories': 'Аксессуары'
    };
    return categoryNames[category] || category;
  };

  
  let currentCategory = null;
  
  if (currentProduct) {
    currentCategory = currentProduct.category;
  } else if (categoryFromUrl) {
    currentCategory = categoryFromUrl;
  }

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm flex-wrap">
          {/* Главная */}
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Главная
            </Link>
          </li>
          
          {/* Каталог */}
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <Link to="/catalog" className="text-blue-600 hover:text-blue-800">
              Каталог
            </Link>
          </li>

          {/* Категория - показываем если есть текущая категория */}
          {currentCategory && (
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link 
                to={`/catalog?category=${currentCategory}`}
                className="text-blue-600 hover:text-blue-800 capitalize"
              >
                {getCategoryName(currentCategory)}
              </Link>
            </li>
          )}

          {/* Название товара - только на странице товара */}
          {currentProduct && (
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-500">
                {currentProduct.name}
              </span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;