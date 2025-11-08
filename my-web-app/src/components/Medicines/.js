import React from "react";
import { sanjeevaniImg } from "../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Medicines.css";
import MedicineCard from "./MedicineCardComponent";
import NavbarWithDropdown from "./NavbarWithDropdown";

function Medicines({ handleAddToCart }) {
  const [sortOption, setSortOption] = React.useState("relevance");

  const products = [
    {
      id: 1,
      name: "Paracetamol",
      image: sanjeevaniImg,
      price: 719.1,
      mrp: 799,
      discount: "10% off",
      description: "For fever and mild pain relief",
      category: "Fever",
    },
    {
      id: 2,
      name: "Amoxicillin",
      image: sanjeevaniImg,
      price: 879.1,
      mrp: 999,
      discount: "12% off",
      description: "Antibiotic for bacterial infections",
      category: "Antibiotics",
    },
{
      id: 3,
      name: "Ibuprofen",
      image: sanjeevaniImg,
      price: 990.0,
      mrp: 1100,
      discount: "10% off",
      description: "Painkiller and anti-inflammatory",
      category: "Pain Relief",
    },
    {
      id: 4,
      name: "Cetirizine",
      image: sanjeevaniImg,
      price: 1619.1,
      mrp: 1799,
      discount: "10% off",
      description: "For allergies and hay fever",
      category: "Allergy",
    }
  ];

  const images = [sanjeevaniImg, sanjeevaniImg, sanjeevaniImg];

  const getSortedProducts = () => {
    if (sortOption === "price-low-to-high") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOption === "price-high-to-low") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const sortedProducts = getSortedProducts();

  return (
    <div>
      <NavbarWithDropdown />
      {/* Banner/Slider */}
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="product-display">
        <div className="product-sort-container">
          <span className="sort-label">Sort By:</span>
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <MedicineCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Medicines;
