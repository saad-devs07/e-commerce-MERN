import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../ProductCard";
import api from '../../../../api/api.js';
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

function NewArrivals({ selectedCurrency }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/fetchProductsByCategory/newArrivals");
        const data = await response.data;
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchProducts();
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="w-10 h-10 text-black hover:text-[#4a1341] text-3xl flex justify-center items-center z-10 absolute top-[35%] right-2 lg:right-4 cursor-pointer transition-transform duration-300 transform hover:scale-110"
        onClick={onClick}
      >
        <TfiAngleRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="w-10 h-10 text-black hover:text-[#4a1341] text-3xl flex justify-center items-center z-10 absolute top-[35%] left-2 lg:left-4 cursor-pointer 
                   transition-transform duration-300 transform hover:scale-110"
        onClick={onClick}
      >
        <TfiAngleLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="text-3xl text-center font-semibold pt-10 pb-1 uppercase">
        <p className="bg-[#7b246d] text-white">New Arrivals</p>
      </div>
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="px-2 py-10" key={product._id}>
              <Product
                _id={product._id}
                img={
                  product.images.length > 0
                    ? product.images.map(img => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
                    : ['/default_images/image-not-available.png']
                }
                productName={product.name || "Product Name Not Available"}
                price={product.price1 || "Product Price Not Available"}
                tags={Array.isArray(product.tags) && product.tags.length > 0 ? product.tags : null}
                shortDescription={product.shortDescription || null}
                status={product.status || null}
                selectedCurrency={selectedCurrency}
              />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Slider>
    </>
  );
};

export default NewArrivals;
