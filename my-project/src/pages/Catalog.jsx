import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'; // Добавлен useLocation
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // 6 товаров на странице
  const { addToCart } = useCart();
  const location = useLocation(); // Добавлена эта строка
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Фильтрация по категориям
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Пагинация-----------------------------------------------------------------------------------------------------------------------------//
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  // плавная прокрутка страницы верх, при переходе на нее 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  }, [location.pathname]);

   const handleAddToCart = (product) => {
    addToCart(product);
    //alert(`${product.name} добавлен в корзину!`);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5; // Максимальное количество видимых кнопок страниц

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Корректируем startPage, если мы в конце
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Кнопка "Назад"
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ←
      </button>
    );

    // Первая страница и многоточие если нужно
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    // Кнопки страниц
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded-md transition ${
            currentPage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Последняя страница и многоточие если нужно
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          {totalPages}
        </button>
      );
    }

    // Кнопка "Вперед"
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        →
      </button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
        
        {/* Информация о товарах */}
        <div className="mb-4 text-gray-600">
          Показано {currentProducts.length} из {filteredProducts.length} товаров
          {selectedCategory !== 'all' && ` в категории "${selectedCategory}"`}
        </div>
        
        {/* Фильтры по категориям */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'Все товары' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка товаров */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
                  {/* Контейнер для изображения с фиксированной высотой */}
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-auto">
                      <Link 
                        to={`/product/${product.id}`}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
                      >
                        Подробнее
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {renderPaginationButtons()}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Товары не найдены</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Показать все товары
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;