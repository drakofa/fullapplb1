import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            topLINK
          </Link>

          {/* Навигация */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                {/* <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Главная
                </Link> */}
              </li>
              <li>
                <Link to="/catalog" className="text-gray-700 hover:text-blue-600 font-medium">
                  Каталог
                </Link>
              </li>
              {/* <li>
                <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
                  Корзина
                </Link>
              </li> */}
            </ul>
          </nav>

          {/* Корзина */}
          <Link 
            to="/cart" 
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <span>Корзина</span>
            <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {getTotalItems()}
            </span>
          </Link>
        </div>

        {/* Мобильная навигация */}
        <nav className="md:hidden mt-4">
          <ul className="flex justify-around">
            {/* <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Главная
              </Link>
            </li> */}
            <li>
              <Link to="/catalog" className="text-gray-700 hover:text-blue-600 font-medium">
                Каталог
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;