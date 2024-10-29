import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.avif";
import { MdPerson2 } from "react-icons/md";
//import { TiHeartFullOutline } from "react-icons/ti";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/Profile");
    } else {
      navigate("/Register");
    }
  };

  return (
    <>
      {/* <div className="h-6 text-center text-gray-900 bg-slate-100 text-sm">
        India's trusted brand
      </div> */}
      <div className="h-6 text-center text-gray-900 bg-slate-100 text-sm sticky top-0 z-10">
        India's trusted brand
      </div>

      <header className="h-20 shadow-md bg-white flex items-center justify-between px-8 sticky top-0">
        {/* Mobile View: Hamburger Menu, Search, and Icons */}
        <div className="flex items-center gap-4 lg:hidden">
          <FaBars
            className=" text-gray-900 text-[25px] cursor-pointer"
            onClick={toggleSidebar}
          />
          <FaSearch
            className=" text-gray-900 text-[25px] cursor-pointer"
            onClick={toggleSearch}
          />
        </div>

        {/* Logo centered for mobile view */}
        <div className="logo mx-auto lg:mx-0">
          <Link to="/">
            <img className="h-12 lg:h-20" src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Mobile View: User Icons */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/register">
            <MdPerson2 className=" text-gray-900 text-[25px]" />
          </Link>
          {/* <Link to="/wishlist">
            <TiHeartFullOutline className=" text-gray-900 text-[25px]" />
          </Link> */}
          <Link to="/cart">
            <FaShoppingCart className=" text-gray-900 text-[25px]" />
          </Link>
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4">
            <button
              className=" text-gray-900 mb-4 text-[20px]"
              onClick={toggleSidebar}
            >
              Close
            </button>
            <ul className="flex flex-col gap-4 font-medium text-gray-900">
              <li>
                <Link onClick={toggleSidebar}>Shop by category</Link>
              </li>
              <li>
                <Link onClick={toggleSidebar}>Shop by collection</Link>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="fixed top-0 left-0 w-full h-20 bg-white shadow-md flex items-center justify-center z-50 px-4">
            <input
              type="text"
              placeholder="Search your fav"
              className="w-full bg-transparent  text-gray-900 placeholder-gray-600 outline-none pl-3 py-2"
            />
          </div>
        )}

        {/* PC View: Full Header Layout */}
        <div className="hidden lg:flex justify-between items-center w-full">
          {/* Left Menu */}
          <div className="menu">
            <ul className="flex gap-5 items-center font-medium  text-gray-900">
              <li className="group relative">
                <Link>Shop by category</Link>
                <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg p-3">
                  <li className="p-2">
                    <Link to="/addProduct">addProduct</Link>
                  </li>
                  <li className="p-2">
                    <Link>Option 2</Link>
                  </li>
                  <li className="p-2">
                    <Link>Option 3</Link>
                  </li>
                </ul>
              </li>
              <li className="group relative">
                <Link>Shop by collection</Link>
                <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg p-3">
                  <li className="p-2">
                    <Link>Collection 1</Link>
                  </li>
                  <li className="p-2">
                    <Link>Collection 2</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Remove left logo in PC view */}
          <div className="flex-grow" />

          {/* Search Bar */}
          <div className="flex items-center gap-5 w-64 mx-24 rounded-md">
            <input
              type="text"
              placeholder="Search your fav"
              className="bg-transparent  text-gray-900 text-sm font-bold placeholder-gray-900  pl-3 py-2 w-full outline-none"
            />
            <FaSearch className=" text-gray-900 text-[20px] mr-3" />
          </div>

          {/* Icons */}
          <div className="flex gap-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <MdPerson2 className="text-gray-900 text-[25px]" />
            </div>
            {/* <Link to="/wishlist">
              <TiHeartFullOutline className=" text-gray-900 text-[25px]" />
            </Link> */}
            <Link to="/cart">
              <FaShoppingCart className=" text-gray-900 text-[25px]" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
