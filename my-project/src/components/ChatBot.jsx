import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Привет! Чем могу помочь?', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Добавляем сообщение пользователя
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Имитируем ответ бота
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return 'Привет! Рад вас видеть. Как могу помочь с выбором товаров?';
    } else if (lowerMessage.includes('доставка') || lowerMessage.includes('доставку')) {
      return 'Доставка осуществляется в течение 2-3 рабочих дней. Бесплатная доставка при заказе от 100$.';
    } else if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость')) {
      return 'Все цены указаны на страницах товаров. Есть вопросы по конкретному товару?';
    } else if (lowerMessage.includes('гарантия') || lowerMessage.includes('возврат')) {
      return 'Гарантия на всю технику - 1 год. Возврат в течение 14 дней.';
    } else if (lowerMessage.includes('смартфон') || lowerMessage.includes('телефон')) {
      return 'У нас есть iPhone, Samsung и другие смартфоны. Посмотрите в категории "smartphones"!';
    } else if (lowerMessage.includes('ноутбук') || lowerMessage.includes('laptop')) {
      return 'В категории "laptops" вы найдете MacBook, Dell, Surface и другие ноутбуки.';
    } else {
      return 'Извините, я еще учусь. Могу помочь с информацией о доставке, ценах, гарантии или конкретных товарах!';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Кнопка чата */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition z-50 flex items-center justify-center"
      >
        💬
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          {/* Заголовок */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Чат-помощник</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите сообщение..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ввод
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;