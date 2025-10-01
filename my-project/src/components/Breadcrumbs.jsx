import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Главная
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <li key={name} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-500 capitalize">
                    {name.replace('-', ' ')}
                  </span>
                ) : (
                  <Link to={routeTo} className="text-blue-600 hover:text-blue-800 capitalize">
                    {name.replace('-', ' ')}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;