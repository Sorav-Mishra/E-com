import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    discount: "",
    productImage: null,
    thumbnails: [],
    video: null,
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProductData({
      ...productData,
      [name]: files,
    });

    if (name === "productImage" && files[0]) {
      setPreviewImages([URL.createObjectURL(files[0])]);
    }

    if (name === "thumbnails" && files.length > 0) {
      const thumbnailsArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(thumbnailsArray);
    }

    if (name === "video" && files[0]) {
      setPreviewVideo(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !productData.name ||
      !productData.originalPrice ||
      !productData.discountedPrice ||
      !productData.discount ||
      !productData.productImage
    ) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("originalPrice", productData.originalPrice);
    formData.append("discountedPrice", productData.discountedPrice);
    formData.append("discount", productData.discount);
    formData.append("productImage", productData.productImage[0]);

    if (productData.thumbnails) {
      for (let i = 0; i < productData.thumbnails.length; i++) {
        formData.append("thumbnails", productData.thumbnails[i]);
      }
    }

    if (productData.video) {
      formData.append("video", productData.video[0]);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success: reset form, set message, redirect
      setSuccessMessage("Product added successfully!");
      setProductData({
        name: "",
        originalPrice: "",
        discountedPrice: "",
        discount: "",
        productImage: null,
        thumbnails: [],
        video: null,
      });
      setPreviewImages([]);
      setPreviewVideo(null);
      setIsLoading(false);

      setTimeout(() => {
        navigate("/Oversize T-shirts");
      }, 1500);
    } catch (error) {
      console.error(
        "Error uploading product:",
        error.response ? error.response.data : error.message
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 bg-white shadow-md rounded-lg mt-8 mb-8">
      <h1 className="text-lg font-semibold mb-3">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={productData.originalPrice}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discounted Price
          </label>
          <input
            type="number"
            name="discountedPrice"
            value={productData.discountedPrice}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            required
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="loader"></div>
            </div>
          )}
        </div>

        {previewImages.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Image Preview</h3>
            <div className="grid grid-cols-2 gap-2">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-full h-24 object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnails (Optional)
          </label>
          <input
            type="file"
            name="thumbnails"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Video (Optional)
          </label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-1 p-1.5 w-full border rounded-md text-sm"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="loader"></div>
            </div>
          )}
        </div>

        {previewVideo && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Video Preview</h3>
            <video src={previewVideo} controls className="w-full h-24" />
          </div>
        )}

        <button
          type="submit"
          className={`px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 text-sm transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Add Product"}
        </button>

        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
