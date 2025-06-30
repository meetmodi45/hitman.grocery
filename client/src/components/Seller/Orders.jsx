import React from "react";
import { dummyOrders } from "../../assets/assets";

const Orders = () => {
  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="text-2xl font-semibold mb-6 text-primary-dull">
          All Orders
        </h2>

        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="table-auto w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium truncate">Order ID</th>
                <th className="px-4 py-3 font-medium truncate">User ID</th>
                <th className="px-4 py-3 font-medium truncate w-1/2">Items</th>
                <th className="px-4 py-3 font-medium truncate">Amount</th>
                <th className="px-4 py-3 font-medium truncate">Payment</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700 bg-white">
              {dummyOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 truncate">
                    {order._id.slice(-6).toUpperCase()}
                  </td>

                  {/* User ID */}
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 truncate">
                    {order.userId.slice(-6).toUpperCase()}
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-4">
                      {order.items.map(({ product, quantity, _id }) => (
                        <div
                          key={_id}
                          className="flex items-center gap-2 bg-gray-50 p-2 rounded shadow-sm"
                        >
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded"
                          />
                          <div>
                            <p className="text-sm font-medium">
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
                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹{order.amount}
                  </td>

                  {/* Payment Type only */}
                  <td className="px-4 py-3">
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
