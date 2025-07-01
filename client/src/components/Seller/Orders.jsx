import React from "react";
import { dummyOrders } from "../../assets/assets";

const Orders = () => {
  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary-dull">
          All Orders
        </h2>

        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-900 bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-3 font-medium">Order ID</th>
                <th className="px-2 sm:px-4 py-3 font-medium hidden sm:table-cell">
                  User ID
                </th>
                <th className="px-2 sm:px-4 py-3 font-medium hidden md:table-cell">
                  Items
                </th>
                <th className="px-2 sm:px-4 py-3 font-medium">Amount</th>
                <th className="px-2 sm:px-4 py-3 font-medium">Payment</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 bg-white">
              {dummyOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="px-2 sm:px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                    {order._id.slice(-6).toUpperCase()}
                  </td>

                  {/* User ID */}
                  <td className="px-2 sm:px-4 py-3 font-mono text-xs text-gray-500 hidden sm:table-cell whitespace-nowrap">
                    {order.userId.slice(-6).toUpperCase()}
                  </td>

                  {/* Items */}
                  <td className="px-2 sm:px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map(({ product, quantity, _id }) => (
                        <div
                          key={_id}
                          className="flex items-center gap-2 bg-gray-50 p-2 rounded shadow-sm min-w-[120px]"
                        >
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-9 h-9 object-contain rounded"
                          />
                          <div>
                            <p className="text-xs font-medium truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-2 sm:px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                    ₹{order.amount}
                  </td>

                  {/* Payment */}
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                      {order.paymentType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
