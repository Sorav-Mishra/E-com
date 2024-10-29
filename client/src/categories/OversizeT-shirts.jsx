import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OversizeT_shirts = () => {
  const [products, setProducts] = useState([]);

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
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-8">Oversize T-shirts</h1>

      <div className="flex flex-col md:flex-row">
        {/* Filters: Show full width on mobile, smaller width on larger screens */}
        <aside className="w-full md:w-[20%] p-4">
          <h3 className="font-bold text-lg mb-4">Filters</h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Price</h4>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Product Type</h4>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Size</h4>
          </div>
        </aside>

        <section className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/Product/${product._id}`}
                key={product._id}
                className="flex flex-col group w-full transition-all duration-300 "
              >
                {/* Product Image */}
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-full object-cover h-auto transform transition-transform duration-300 hover:scale-110"
                />
                SAVE {product.discount + "%"}
                {/* Product Details */}
                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-700">
                  <span className="line-through text-gray-400">
                    MRP {product.originalPrice}
                  </span>{" "}
                  <span className="font-bold">
                    Rs {product.discountedPrice}
                  </span>
                </p>
                <span className="text-orange-500 text-sm font-semibold">
                  SAVE {product.discount + "%"}
                </span>
                {/* Size Options */}
                <div className="flex mt-4 space-x-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default OversizeT_shirts;
