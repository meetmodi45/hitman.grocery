import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders/all");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch seller orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-600 p-4">Loading...</p>;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-xl sm:text-2xl font-bold text-primary-dull mb-6">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-gray-500 text-center mt-20">No orders yet.</div>
      ) : (
        <>
          {/* ✅ Desktop / Tablet View */}
          <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Products</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-mono text-gray-700">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-medium text-gray-800">
                        {order.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user?.email}
                      </p>
                    </td>
                    <td className="px-4 py-2">
                      {order.products.map((item, i) => (
                        <div key={i} className="mb-1">
                          {item.product?.name}{" "}
                          <span className="text-primary font-semibold">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 font-semibold text-gray-900">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm font-medium text-gray-700">
                        {order.paymentMethod}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2 flex justify-between text-sm font-mono text-gray-700">
                  <span>#{order._id.slice(-6).toUpperCase()}</span>
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="mb-2">
                  <p className="font-semibold text-gray-800">
                    {order.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{order.user?.email}</p>
                </div>

                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Products
                  </p>
                  {order.products.map((item, i) => (
                    <p key={i} className="text-gray-900 text-sm">
                      • {item.product?.name}{" "}
                      <span className="text-primary font-semibold">
                        x{item.quantity}
                      </span>
                    </p>
                  ))}
                </div>

                <div className="flex justify-between mt-3">
                  <p className="font-semibold text-gray-800 text-sm">
                    ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SellerOrders;
