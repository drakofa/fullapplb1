import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">topLINK</h3>
            <p className="text-gray-400">
              Лучшие технологии по доступным ценам. Мы заботимся о наших клиентах.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Главная</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition">Каталог</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white transition">Корзина</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Смартфоны</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Ноутбуки</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Планшеты</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Аксессуары</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +7 (666) 666-66-61</li>
              <li>✉️ info@techstore.ru</li>
              <li>📍 Москва, ул. Примерная, 123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>© 2024 OOO тмыв денег. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;