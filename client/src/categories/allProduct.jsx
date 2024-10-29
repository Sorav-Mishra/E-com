import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProductPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/getAllProducts`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:px-8">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold">All Products</h1>
        <button className="text-sm lg:text-base bg-gray-100 px-2 py-1 rounded-lg">
          Sort by
        </button>
      </header>

      {/* Grid adjustments for larger screens */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="block"
          >
            <div className="relative border rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Discount Tag */}
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-md">
                  Save {product.discount}%
                </span>
              )}

              {/* Product Image */}
              <img
                src={product.productImage}
                alt={product.name}
                className="w-full h-auto lg:h-auto xl:h-auto object-cover rounded-md mb-2"
              />

              {/* Product Details */}
              <h2 className="text-sm lg:text-base font-medium text-gray-800">
                {product.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm lg:text-base text-gray-700 font-semibold">
                  ₹{product.discountedPrice}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductPage;
