import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice";
import { PiShoppingCartLight, PiHeartStraightLight } from "react-icons/pi";
import { TfiSearch } from "react-icons/tfi";

function ProductCard(props) {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => String(_id).toLowerCase().split(" ").join("");
  const rootId = idString(_id);
  const navigate = useNavigate();
  const productItem = props;

  const images = Array.isArray(props.img) ? props.img : [props.img];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleProductDetails = () => {
    navigate(`/product/${props._id}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleMouseEnter = () => {
    const nextImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextImageIndex);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  return (
    <div
      className={`w-full relative group transition-all duration-300 ease-in-out ${isHovered ? "hover:shadow-xl hover:scale-105 z-[50] relative" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div
        className="relative w-full h-[350px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[450px] overflow-hidden cursor-pointer"
        onClick={handleProductDetails}
      >
        {images.map((image, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
            src={image}
            alt={props.productName}
          />
        ))}

        {/* Add to Cart button on hover */}
        {isHovered && (
          <button
            className="absolute bottom-0 w-full left-[50%] uppercase transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-gray-100 xs:text-xs sm:text-xs md:text-sm font-semibold hover:bg-[#7b246d] hover:text-white transition-colors duration-300"
            onClick={() => dispatch(addToCart(productItem))}
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className={`mt-1 p-1 px-2 bg-white transition-all duration-300 ${isHovered ? "h-auto" : "h-[100px]"}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="xs:text-md sm:text-md md:text-lg lg:text-lg xl:text-lg font-[550] uppercase text-gray-900">
              {props.productName}
            </h2>

            <p className={`font-sans xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm uppercase ${props.status === 'Available' ? 'text-green-500' : 'text-red-600'}`}>
              {props.status}
            </p>

            <p className="text-gray-700 font-[550] xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
              <span className="text-xs">PKR</span> Rs.{props.price ? props.price.toLocaleString() : "Price not available"}
            </p>
          </div>

          <button
            className="hidden md:block lg:block xl:block uppercase border-2 border-gray-900 text-gray-900 xs:text-sm sm:text-sm md:text-sm font-semibold py-2 px-4 rounded-sm bg-transparent hover:bg-[#7b246d] hover:border-[#7b246d] hover:text-white transition-colors duration-300"
            onClick={handleProductDetails}
          >
            Shop Now
          </button>
        </div>

        {/* Description Appears on hover */}
        {isHovered && (
          <p className="w-full text-sm text-center text-gray-700 bg-white mt-1 overflow-hidden max-h-[4rem] transition-max-height duration-300 ease-in-out">
            {props.description || "This is a short description of the product."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;