import React from "react";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="bg-green-50 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-600">
      <div className="flex flex-col md:flex-row justify-between gap-12 py-10 border-b border-gray-300">
        {/* Logo & Description */}
        <div className="md:max-w-md">
          <img
            src="hitman.grocery.logo.png"
            alt="Hitman Grocery Logo"
            className="w-28 md:w-32 object-contain"
          />
          <p className="mt-6 text-sm leading-relaxed text-gray-500 max-w-sm">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full md:w-2/3">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-800 mb-3 text-base">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-400">
        © 2025 Hitman.Grocery All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
