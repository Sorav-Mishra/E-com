import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/getProductById/${id}`
        );
        const productData = response.data.productDetail;
        setProduct(productData);
        setSelectedMedia({
          type: "image",
          src: productData.productImage,
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token || token === "undefined" || token === "") {
        navigate("/Register");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        localStorage.removeItem("accessToken");
        navigate("/Register");
        return;
      }

      if (!product || !product._id) {
        throw new Error("Product ID is missing.");
      }

      // Proceed with adding to cart
      const response = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        {
          productId: product._id,
          quantity: 1,
          productImage: selectedMedia.src,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/cart");
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };
  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="container max-w-screen-lg mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <div className="mb-4">
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt={product.name}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              <video
                controls
                className="w-full h-auto object-cover rounded-md"
                src={selectedMedia.src}
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {product.thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                onClick={() =>
                  setSelectedMedia({ type: "image", src: thumbnail })
                }
                className={`w-20 h-20 object-cover cursor-pointer ${
                  selectedMedia.src === thumbnail
                    ? "border-2 border-blue-500"
                    : ""
                } rounded-md`}
              />
            ))}
            {/* Video thumbnail */}
            {product.video && (
              <div
                onClick={() =>
                  setSelectedMedia({ type: "video", src: product.video })
                }
                className={`w-20 h-20 bg-gray-200 flex items-center justify-center cursor-pointer ${
                  selectedMedia.src === product.video
                    ? "border-2 border-blue-500"
                    : ""
                } rounded-md`}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A.75.75 0 0010.5 9.75v4.5a.75.75 0 001.055.668l3.197-2.133a.75.75 0 000-1.333z"
                  />
                  <rect width="20" height="20" fill="transparent" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3 lg:pl-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Pricing */}
          <div className="flex items-center mb-4">
            <p className="text-gray-500 line-through mr-2">
              MRP: {product.originalPrice.toFixed(2)}
            </p>
            <p className="text-3xl font-semibold text-red-500">
              Price: {product.discountedPrice.toFixed(2)}
            </p>
          </div>
          <p className="text-green-500 mb-4">Save {product.discount}%</p>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {Array.from({ length: 4 }).map((_, index) => (
                <StarIcon key={index} className="w-6 h-6" />
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-yellow-500"
              >
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop
                      offset="50%"
                      stopColor="transparent"
                      stopOpacity="1"
                    />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half)"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>
            <span className="ml-2 text-gray-600">(4.5/5)</span>
          </div>

          {/* Size selection */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600">
              Select Size:
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
              Buy Now
            </button>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
