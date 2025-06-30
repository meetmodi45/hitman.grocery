import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { products } = useAppContext();
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [count, setCount] = useState(1);

  // Find product by ID when component mounts or productId changes
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Use 'image' instead of 'images'
        setThumbnail(foundProduct.image[0]); // Now matches your data structure
      } else {
        navigate("/404");
      }
    }
  }, [productId, products, navigate]);

  const handleAddToCart = () => {
    toast.success(`${count} ${product.name} added to cart`);
    // Add your cart logic here
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl w-full px-6 mx-auto mb-8 pt-20">
      {/* Breadcrumbs */}
      <p className="py-4">
        <span
          className="cursor-pointer hover:text-primary-dull"
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        /
        <span
          className="cursor-pointer hover:text-primary-dull"
          onClick={() => navigate("/products")}
        >
          {" "}
          Products
        </span>{" "}
        /
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() =>
            navigate(`/products/${product.category.toLowerCase()}`)
          }
        >
          {" "}
          {product.category}
        </span>{" "}
        /<span className="text-primary"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Image Gallery */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className={`border max-w-24 rounded overflow-hidden cursor-pointer transition-all ${
                  thumbnail === img
                    ? " ring-2 ring-green-200"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-300 rounded-lg overflow-hidden max-w-[500px]">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) =>
                i < product.rating ? (
                  <img src={assets.star_icon} alt="star" key={i} />
                ) : (
                  <img src={assets.star_dull_icon} alt="star" key={i} />
                )
              )}
            <p className="text-base ml-2">({product.rating})</p>
          </div>

          {/* Pricing */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: ₹{product.price}
            </p>
            <p className="text-2xl font-medium">MRP: ₹{product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-base font-medium">Quantity:</p>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">
                {count}
              </span>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button className="w-full py-3.5 cursor-pointer font-medium bg-primary hover:bg-primary-dull transition text-white">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
