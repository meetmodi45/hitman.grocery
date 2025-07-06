import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders/my", {
          withCredentials: true,
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-600 p-4">Loading...</p>;

  return (
    <div className="min-h-screen mt-20 bg-white px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-dull mb-6">
        My Orders
      </h1>

      {/* Desktop View */}
      <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Headings */}
        <div className="grid grid-cols-12 gap-4 bg-gray-50 text-sm text-gray-500 font-semibold border-b border-gray-200 py-3 px-6">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-3">Product(s)</div>
          <div className="col-span-3">Shipping Address</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Payment Info</div>
        </div>

        {/* Orders */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Order ID */}
              <div className="col-span-2 text-sm text-gray-700 font-mono my-auto">
                #{order._id.slice(-6).toUpperCase()}
              </div>

              {/* Product(s) */}
              <div className="col-span-3">
                <div className="space-y-2">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <p className="text-gray-900 font-medium flex items-center justify-center">
                        {item.product.name}
                        {item.quantity > 1 && (
                          <span className="ml-2 text-primary font-semibold">
                            x{item.quantity}
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="col-span-3">
                <p className="font-semibold text-gray-800 mb-1">
                  {order.user.name}
                </p>
                <p className="text-gray-600 text-sm leading-5">
                  {order.shippingAddress}
                </p>
              </div>

              {/* Amount */}
              <div className="col-span-2 flex items-center">
                <p className="font-semibold text-gray-800">
                  ₹{order.totalAmount || "N/A"}
                </p>
              </div>

              {/* Payment Info */}
              <div className="col-span-2">
                <div className="text-sm space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    className={
                      order.isPaid
                        ? "text-primary font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {order.isPaid ? "✅ Paid" : "❌ Pending"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            You haven't placed any orders yet.
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm text-gray-700 font-mono">
                  #{order._id.slice(-6).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₹{order.totalAmount || "N/A"}
                  </p>
                  <p
                    className={
                      order.isPaid
                        ? "text-primary text-xs font-medium"
                        : "text-red-500 text-xs font-medium"
                    }
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Products
                </h3>
                <div className="space-y-1">
                  {order.products.map((item, idx) => (
                    <p key={idx} className="text-gray-900">
                      • {item.product.name}
                      {item.quantity > 1 && (
                        <span className="ml-2 text-primary font-semibold">
                          x{item.quantity}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Shipping
                </h3>
                <p className="font-semibold text-gray-800 text-sm">
                  {order.user.name}
                </p>
                <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
              </div>

              {/* Payment Info */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment:</span>
                  <span className="text-gray-700">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            You haven't placed any orders yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
