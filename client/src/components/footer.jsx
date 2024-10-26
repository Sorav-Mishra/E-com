import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-14">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        <div className="text-left">
          <h3 className="text-pretty font-bold">ABOUT US</h3>
          <p className="text-gray-600 mt-2 text-sm">Overlays Clothing</p>
          <p className="text-gray-600 mt-2 text-sm">Explore to CHANGE.</p>
        </div>

        <div className="text-left">
          <h3 className="text-pretty font-bold">FOOTER - POLICIES</h3>
          <ul className="text-gray-600 text-sm  mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-black">
                Return Your Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Return, Refund, and Cancellation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Fraud Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="text-pretty font-bold">NEWSLETTER</h3>
          <p className="text-gray-600 font-sm  mt-2">
            You can be the first one to know about our new releases, latest
            offers and more.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your E-mail"
              className="bg-white border border-gray-300 py-2 px-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:text-gray-900"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md">
              &rarr;
            </button>
          </form>
        </div>

        <div className="text-left">
          <h3 className="text-pretty font-bold">FOLLOW US</h3>
          <p className="text-gray-600 font-sm font-bold mt-2">Stay in touch!</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-black">
              <FaFacebookF className="text-[20px]" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaTwitter className="text-[20px]" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaInstagram className="text-[20px]" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaYoutube className="text-[20px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
