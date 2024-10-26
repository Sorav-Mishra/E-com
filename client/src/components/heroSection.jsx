import { useState, useEffect } from "react";
import banner2 from "../assets/banner2.webp";
import banner from "../assets/benner.webp";
import category from "../assets/OrangePacketPhoto_8.webp";
import { Link } from "react-router-dom";
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
      id: 1,
      name: "Oversize T-shirts",
      image: category,
    },
  ];

  return (
    <section>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={currentBanner}
          alt="banner"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div>
        <div className="category-banner bg-red-500 text-white py-8 text-center">
          <h1 className="text-4xl font-bold uppercase">Pick Your Category</h1>
        </div>

        <div className="category-grid grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <div key={category.id} className="category-item text-center">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
                <Link to="/Oversize T-shirts">
                  {" "}
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
      </div>
    </section>
  );
};

export default HeroSection;
