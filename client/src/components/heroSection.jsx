import { useState, useEffect } from "react";
import banner2 from "../assets/banner2.webp";
import banner from "../assets/benner.webp";
import category from "../assets/product_images/1.webp";
import Wcategory1 from "../assets/category/1.webp";
import Wcategory2 from "../assets/category/2.webp";
import Wcategory3 from "../assets/category/3.webp";
import Wcategory4 from "../assets/category/4.webp";
import Wcategory7 from "../assets/category/7.webp";
import Wcategory9 from "../assets/category/9.jpg";
import Wcategory6 from "../assets/category/6.webp";
import one from "../assets/1.webp";
import two from "../assets/2.webp";
import three from "../assets/3.webp";
import { Link, useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [currentBanner, setCurrentBanner] = useState(banner);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBanner((prevBanner) =>
          prevBanner === banner ? banner2 : banner
        );
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: 5,
      name: "Shakets",
      image: Wcategory4,
    },
    {
      id: 2,
      name: "POLO",
      image: Wcategory1,
    },
    {
      id: 3,
      name: "Hoodies",
      image: Wcategory2,
    },
    {
      id: 4,
      name: "Jackets",
      image: Wcategory3,
    },
    {
      id: 1,
      name: "Oversize T-shirts",
      image: category,
    },

    {
      id: 5,
      name: "Rider-Jackets",
      image: Wcategory6,
    },
    {
      id: 5,
      name: "Navy-Joggers",
      image: Wcategory7,
    },
    {
      id: 5,
      name: "Black",
      image: Wcategory9,
    },
  ];

  const navigate = useNavigate();
  const hendleShopNow = () => {
    navigate("/allproducts");
  };

  return (
    <section>
      <div className="relative bg-gradient-to-r from-orange-700 via-red-600 to-purple-700 text-white py-6 px-4 sm:py-10 sm:px-6 text-center shadow-2xl border-t-4 border-b-4 border-yellow-500">
        {/* Decorative Lights */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-transparent to-transparent opacity-30 pointer-events-none"></div>
        <div
          className="absolute top-2 left-4 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-400 rounded-full opacity-50 blur-lg sm:blur-xl animate-pulse"
          style={{ zIndex: 10 }}
        ></div>
        <div
          className="absolute top-2 right-4 w-8 h-8 sm:w-14 sm:h-14 bg-yellow-300 rounded-full opacity-40 blur-md sm:blur-lg animate-pulse delay-200"
          style={{ zIndex: 10 }}
        ></div>
        <div
          className="absolute bottom-4 left-6 sm:left-12 w-10 h-10 sm:w-16 sm:h-16 bg-yellow-500 rounded-full opacity-30 blur-md sm:blur-lg animate-pulse delay-300"
          style={{ zIndex: 10 }}
        ></div>

        {/* Crackers */}
        <div
          className="absolute -top-6 sm:-top-10 left-10 sm:left-20 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce blur-xs sm:blur-sm"
          style={{ zIndex: 10 }}
        ></div>
        <div
          className="absolute -top-6 sm:-top-8 right-16 sm:right-28 w-5 h-5 sm:w-8 sm:h-8 bg-red-500 rounded-full animate-bounce blur-xs sm:blur-sm delay-150"
          style={{ zIndex: 10 }}
        ></div>
        <div
          className="absolute top-10 sm:top-14 left-12 sm:left-16 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full animate-bounce blur-xs sm:blur-sm delay-200"
          style={{ zIndex: 10 }}
        ></div>
        <div
          className="absolute top-16 sm:top-20 right-6 sm:right-10 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-600 rounded-full animate-bounce blur-sm sm:blur-md delay-300"
          style={{ zIndex: 10 }}
        ></div>

        {/* Diwali Lamps */}
        <div
          className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 flex flex-col items-center animate-pulse"
          style={{ zIndex: 10 }}
        >
          <div className="w-5 h-5 sm:w-8 sm:h-8 bg-yellow-500 rounded-full blur-xs sm:blur-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 mt-1 rounded-full opacity-60 blur-xs"></div>
        </div>
        <div
          className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex flex-col items-center animate-pulse"
          style={{ zIndex: 10 }}
        >
          <div className="w-5 h-5 sm:w-8 sm:h-8 bg-yellow-500 rounded-full blur-xs sm:blur-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 mt-1 rounded-full opacity-60 blur-xs"></div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-widest mb-4 text-yellow-200">
          ✨ Diwali Celebration ✨
        </h1>
        <p className="text-xl sm:text-3xl md:text-4xl font-semibold text-yellow-100 mb-2">
          Flat 50% Off up to ₹500!
        </p>
        <p className="text-base sm:text-lg md:text-xl font-light text-yellow-100 italic mb-4">
          Illuminate your Diwali with our exclusive offers!
        </p>
        <button
          className="mt-4 sm:mt-6 bg-yellow-500 text-red-800 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
          onClick={hendleShopNow}
        >
          Shop Now
        </button>
      </div>

      {/* Banner Image Section */}
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <img
          src={currentBanner}
          alt="banner"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {/* Category Banner */}
      <div className="category-banner bg-red-500 text-white py-8 text-center">
        <h1 className="text-5xl font-bold uppercase">Pick Your Category</h1>
      </div>

      {/* Categories Grid */}
      <div className="category-grid grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
          <div key={category.id} className="category-item text-center">
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
              <Link to="/Oversize T-shirts">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <p className="mt-4 text-lg font-semibold">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Winter Collection Banner */}
      <div className="category-banner bg-black text-white py-8 text-center mt-10">
        <h1 className="text-4xl font-bold uppercase">winter collection</h1>
      </div>

      {/* Categories List */}
      <div className="category-grid grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-item text-center rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Link to="/allproducts">
              <div className="w-full h-auto mx-auto rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            {/* <p className="mt-3 text-lg font-semibold">{category.name}</p> */}
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 md:space-x-8 bg-white py-8 px-4 md:px-12">
        <span className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-3">
          <img
            src={one}
            alt="Free & Fast Delivery"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg">Free & Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Shipping within 48 hours across India.
            </p>
          </div>
        </span>

        <span className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-3">
          <img
            src={two}
            alt="Return Policy"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg">Return Policy</h3>
            <p className="text-gray-600 text-sm">Returns within 7 days.</p>
          </div>
        </span>

        <span className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-3">
          <img
            src={three}
            alt="Contact Us"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <p className="text-gray-600 text-sm">
              Write us at support@overlaysclothing.com
            </p>
          </div>
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
