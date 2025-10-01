import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Link to="/catalog" className="text-blue-600 hover:text-blue-800">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} (${quantity} шт.) добавлен в корзину!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Изображение товара */}
            <div className="md:w-1/2 p-8">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {/* Информация о товаре */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                <span className="ml-4 text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Выбор количества */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Количество:
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                  <span className="text-gray-500">
                    Итого: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Добавить в корзину
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Купить сейчас
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Характеристики:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Бесплатная доставка</li>
                  <li>• Гарантия 1 год</li>
                  <li>• Возврат в течение 14 дней</li>
                  <li>• Техническая поддержка 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка назад */}
        <div className="mt-6">
          <Link 
            to="/catalog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Назад к каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;