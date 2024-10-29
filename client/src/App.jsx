import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HeroSection from "./components/heroSection";
import OversizeT_shirts from "./categories/OversizeT-shirts";
import ProductPage from "./categories/product";
import CreateProductPage from "./pages/createProduct";
import CartPage from "./pages/cart";
import UserAuthPage from "./pages/signup";
import UserProfile from "./pages/profile";
//import "./styles/app.css";
import OrderSummary from "./pages/order";
import AddressPage from "./pages/addressPage";
import AllProductPage from "./categories/allProduct";

function App() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/allproducts" element={<AllProductPage />} />
        <Route path="/addProduct" element={<CreateProductPage />} />
        <Route path="/" element={<HeroSection />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderSummary />} />
        <Route path="/Oversize T-shirts" element={<OversizeT_shirts />} />

        <Route
          path="/Register"
          element={
            isAuthenticated ? <Navigate to="/Profile" /> : <UserAuthPage />
          }
        />

        <Route
          path="/Profile"
          element={
            isAuthenticated ? <UserProfile /> : <Navigate to="/Register" />
          }
        />

        {/* <Route path="/wishlist" element={<Wishlist />} /> */}
        <Route path="/Product/:id" element={<ProductPage />} />

        <Route path="/address" element={<AddressPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
