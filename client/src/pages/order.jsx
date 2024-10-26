import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("You must be logged in to view your orders.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch orders.", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getTrackingSteps = (status) => {
    const steps = [
      { label: "Order Placed", reached: status !== "Pending" },
      {
        label: "Shipped",
        reached:
          status === "Shipped" ||
          status === "Out for Delivery" ||
          status === "Delivered",
      },
      {
        label: "Out for Delivery",
        reached: status === "Out for Delivery" || status === "Delivered",
      },
      { label: "Delivered", reached: status === "Delivered" },
    ];
    return steps;
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orders || orders.length === 0)
    return <p className="text-gray-600">No orders found</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Summary</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 shadow-md rounded-lg border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-500">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 space-y-4">
              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center space-x-4"
                >
                  <Link
                    to={`/product/${item.product._id}`}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.product.productImage}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-300"
                    />
                    <div>
                      <h3 className="text-md font-medium text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-800 font-medium">
                        Total: {item.price * item.quantity}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-gray-800 font-semibold">
                Total Amount: {order.totalAmount}
              </p>
              <p className="text-gray-500">
                Payment Method: {order.paymentMethod}
              </p>
              <p className="text-gray-500">
                Shipping Address: {order.address?.addressLine1},{" "}
                {order.address?.city}, {order.address?.state} -{" "}
                {order.address?.postalCode}
              </p>
            </div>

            {/* Order Tracking Section */}
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Tracking Status
              </h3>
              <div className="flex space-x-4 items-center">
                {getTrackingSteps(order.status).map((step, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className={`text-center ${
                        step.reached ? "text-green-600" : "text-gray-400"
                      } font-semibold`}
                    >
                      {step.label}
                    </div>
                    <div
                      className={`h-2 ${
                        step.reached ? "bg-green-600" : "bg-gray-300"
                      } ${
                        index === 0
                          ? "rounded-l-full"
                          : index === getTrackingSteps(order.status).length - 1
                          ? "rounded-r-full"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
