import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, isModerator, user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="text-2xl font-bold text-primary">
            Product Feedback
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Products
            </Link>
            {isModerator && (
              <Link to="/moderation" className="text-gray-700 hover:text-primary">
                Moderation
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">Hi, {user?.displayName}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
