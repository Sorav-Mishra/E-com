// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartAndAddresses = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           navigate("/Register");
//           return;
//         }

//         const [cartResponse, addressResponse] = await Promise.all([
//           axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),
//           axios.get(`${import.meta.env.VITE_API_BASE_URL}/address/get`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),
//         ]);

//         setCartItems(cartResponse.data.cart.products || []);
//         setAddresses(addressResponse.data.addresses || []);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data. Please try again.", error);
//         setLoading(false);
//       }
//     };

//     fetchCartAndAddresses();
//   }, [navigate]);

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const handleCreateOrder = async () => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/orders/create`,
//         {
//           addressId: selectedAddressId,
//           paymentMethod,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Order placed successfully!");
//       setCartItems([]);
//       navigate(`/orders`);
//     } catch (error) {
//       console.error(
//         "Error creating order:",
//         error.response ? error.response.data : error
//       );
//       alert("Failed to create order.");
//     }
//   };

//   const removeFromCart = async (productId) => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/cart/remove`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { productId }, // Pass productId in the request body
//         }
//       );
//       if (response.status === 200) {
//         setCartItems(
//           cartItems.filter((item) => item.product._id !== productId)
//         );
//       } else {
//         console.error("Unexpected response:", response);
//         alert("Failed to remove item.");
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       alert("Failed to remove item.");
//     }
//   };

//   const updateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/cart/update`,
//         { productId, quantity: newQuantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.status === 200) {
//         setCartItems(
//           cartItems.map((item) =>
//             item.product._id === productId
//               ? { ...item, quantity: newQuantity }
//               : item
//           )
//         );
//       } else {
//         console.error("Unexpected response:", response);
//         alert("Failed to update quantity.");
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       alert("Failed to update quantity.");
//     }
//   };
//   const handleAddressChange = (e) => {
//     const selectedValue = e.target.value;
//     if (selectedValue === "new") {
//       navigate("/address");
//     } else {
//       setSelectedAddressId(selectedValue);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!cartItems || cartItems.length === 0) {
//     return <p>Your cart is empty</p>;
//   }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndAddresses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/Register");
          return;
        }
        const [cartResponse, addressResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/address/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCartItems(cartResponse.data.cart.products || []);
        setAddresses(addressResponse.data.addresses || []);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };
    fetchCartAndAddresses();
  }, [navigate]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCreateOrder = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/create`,
        { addressId: selectedAddressId, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { order } = orderResponse.data;
      if (paymentMethod === "cod") {
        alert("Order placed successfully!");
        setCartItems([]);
        navigate(`/orders`);
      } else {
        const razorpayOptions = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          name: "Overlays Clothing",
          description: "Order Payment",
          order_id: order.razorpayOrderId,
          handler: async (response) => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/orders/verify`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              alert("Payment successful!");
              setCartItems([]);
              navigate(`/orders`);
            } catch (error) {
              alert("Payment verification failed.", error);
            }
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "1234567890",
          },
          theme: { color: "#3399cc" },
        };
        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.on("payment.failed", (response) =>
          alert(`Payment failed: ${response.error.description}`)
        );
        razorpay.open();
      }
    } catch (error) {
      alert("Failed to create order.", error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/cart/remove`,
        { headers: { Authorization: `Bearer ${token}` }, data: { productId } }
      );
      if (response.status === 200)
        setCartItems(
          cartItems.filter((item) => item.product._id !== productId)
        );
    } catch (error) {
      alert("Failed to remove item.", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/cart/update`,
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200)
        setCartItems(
          cartItems.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
    } catch (error) {
      alert("Failed to update quantity.", error);
    }
  };

  const handleAddressChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "new") navigate("/address");
    else setSelectedAddressId(selectedValue);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cartItems || cartItems.length === 0) return <p>Your cart is empty</p>;
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.product?._id || Math.random()}
            className="p-4 border border-gray-200 rounded-md shadow-md bg-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Link to={`/product/${item.product?._id}`}>
                <img
                  src={item.product?.productImage}
                  alt={item.product?.name}
                  className="w-40 h-64 object-cover md:w-24 md:h-24 mb-4 md:mb-0"
                />
              </Link>
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-bold">{item.product?.name}</h2>
                <p className="text-gray-900">Price: {item.price?.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product?._id, item.quantity - 1)
                    }
                    className="text-gray-700 px-2"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product?._id, item.quantity + 1)
                    }
                    className="text-gray-700 px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product?._id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <div className="mt-4">
          <label>Select Address:</label>
          <select
            onChange={handleAddressChange}
            className="border p-2 w-full rounded-md"
            value={selectedAddressId}
          >
            <option value="">Select</option>
            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.fullName} - {address.addressLine1}, {address.city},{" "}
                {address.state} - {address.postalCode}
              </option>
            ))}
            <option value="new">Add New Address</option>
          </select>
        </div>

        <h2 className="text-xl font-bold mt-4 mb-2">Payment Method</h2>
        <select
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 w-full rounded-md"
          value={paymentMethod}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>

      <div className="sticky bottom-0 bg-white p-4 shadow-md mt-8">
        <h2 className="text-xl font-semibold">
          Total: {getTotalPrice().toFixed(2)}
        </h2>
        <button
          onClick={handleCreateOrder}
          className="bg-black text-white py-3 px-6 rounded-md mt-4 w-full hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
