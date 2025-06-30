import React, { useState } from "react";
import AddItems from "../components/Seller/AddItems";
import ManageStock from "../components/Seller/ManageStock";
import Orders from "../components/Seller/Orders";

const Seller = () => {
  const [activeTab, setActiveTab] = useState("add");

  const menuItems = [
    {
      id: "add",
      name: "Add Items",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
    {
      id: "stock",
      name: "Manage Stock",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
          />
        </svg>
      ),
    },
    {
      id: "orders",
      name: "Orders",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16V8a2 2 0 0 0-1-1.73L13 3.07a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"
          />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.27 6.96L12 12.01l8.73-5.05M12 22V12"
          />
        </svg>
      ),
    },
  ];

  const componentsMap = {
    add: <AddItems />,
    stock: <ManageStock />,
    orders: <Orders />,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 bg-white">
        <img
          className="w-40 mb-6"
          src="/hitman.grocery.logo.png"
          alt="Hitman Grocery Logo"
        />
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary-dull font-semibold border-r-4 border-primary"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-auto flex flex-col">
        {/* Header inside content */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome to Admin Dashboard
          </h1>
          <button className="px-4 py-1.5 bg-primary hover:bg-primary-dull text-white rounded-full text-sm font-medium transition">
            Logout
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">{componentsMap[activeTab] || <AddItems />}</div>
      </div>
    </div>
  );
};

export default Seller;
