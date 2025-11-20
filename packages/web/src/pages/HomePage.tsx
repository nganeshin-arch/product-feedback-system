import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useSearchProducts } from '../hooks/useProducts';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const productsQuery = useProducts();
  const searchQuery2 = useSearchProducts(searchQuery);

  const products = searchQuery.length >= 2 ? searchQuery2.data : productsQuery.data?.data;
  const isLoading = searchQuery.length >= 2 ? searchQuery2.isLoading : productsQuery.isLoading;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {isLoading && <p className="text-gray-600">Loading products...</p>}

      {products && products.length === 0 && (
        <p className="text-gray-600">No products found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{product.category}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{product.averageRating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({product.totalReviews})</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
