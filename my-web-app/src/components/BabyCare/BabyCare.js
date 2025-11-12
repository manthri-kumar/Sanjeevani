import React, { useState, useMemo } from "react";
import "./BabyCare.css";
import { sanjeevaniImg, offerimg } from "../../assets"; // ✅ add your logo and banner images

function BabyCare() {
  const [cart, setCart] = useState([]);
  const [currentSort, setCurrentSort] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products = [
  { id: 1, name: "Himalaya Baby Lotion 200ml", price: "₹175", mrp: "₹199", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07838/himalaya-baby-lotion-200ml-2-1669650558.jpg" },
  { id: 2, name: "Sebamed Baby Cream Extra Soft 200ml", price: "₹575", mrp: "₹650", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07222/sebamed-baby-cream-extra-soft-200ml-1-1669650624.jpg" },
  { id: 3, name: "Johnson's Baby Soap 100g (Pack of 3)", price: "₹155", mrp: "₹180", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07203/johnsons-baby-soap-100g-pack-of-3-1-1669650623.jpg" },
  { id: 4, name: "Pampers Active Baby Diapers Large 64s", price: "₹999", mrp: "₹1199", discount: "17% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07213/pampers-active-baby-diapers-large-64s-2-1669650579.jpg" },
  { id: 5, name: "Mother Sparsh Natural Baby Wash 200ml", price: "₹240", mrp: "₹280", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91269/mother-sparsh-plant-powered-natural-baby-wash-200ml-2-1681386360.jpg" },
  { id: 6, name: "Sebamed Baby Shampoo 150ml", price: "₹400", mrp: "₹450", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07218/sebamed-baby-shampoo-150ml-1-1669650625.jpg" },
  { id: 7, name: "Mee Mee Nourishing Baby Oil 500ml", price: "₹360", mrp: "₹410", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07212/mee-mee-nourishing-baby-oil-500ml-1-1669650581.jpg" },
  { id: 8, name: "Johnson's Baby Powder 200g", price: "₹165", mrp: "₹190", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07207/johnsons-baby-powder-200g-1-1669650620.jpg" },
  { id: 9, name: "Cetaphil Baby Daily Lotion 400ml", price: "₹825", mrp: "₹920", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07224/cetaphil-baby-daily-lotion-400ml-2-1669650622.jpg" },
  { id: 10, name: "Himalaya Gentle Baby Shampoo 400ml", price: "₹255", mrp: "₹299", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07834/himalaya-gentle-baby-shampoo-400ml-1-1669650560.jpg" },
  { id: 11, name: "Sebamed Diaper Rash Cream 100ml", price: "₹530", mrp: "₹600", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07220/sebamed-diaper-rash-cream-100ml-1-1669650626.jpg" },
  { id: 12, name: "Pigeon Baby Wipes 80s", price: "₹165", mrp: "₹190", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07210/pigeon-baby-wipes-80s-1-1669650578.jpg" },
  { id: 13, name: "Mother Sparsh 99% Pure Water Wipes 72s", price: "₹220", mrp: "₹250", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91260/mother-sparsh-99-pure-water-baby-wipes-72s-2-1681386348.jpg" },
  { id: 14, name: "Himalaya Diaper Rash Cream 50g", price: "₹135", mrp: "₹150", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07219/himalaya-diaper-rash-cream-50g-1-1669650621.jpg" },
  { id: 15, name: "Pampers Premium Care Pants XL 56s", price: "₹1299", mrp: "₹1599", discount: "19% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07215/pampers-premium-care-pants-xl-56s-1-1669650580.jpg" },
  { id: 16, name: "Chicco Baby Moments Body Lotion 500ml", price: "₹525", mrp: "₹600", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07217/chicco-baby-lotion-500ml-1-1669650575.jpg" },
  { id: 17, name: "Huggies Wonder Pants L 76s", price: "₹1020", mrp: "₹1199", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07214/huggies-wonder-pants-l-76s-1-1669650582.jpg" },
  { id: 18, name: "Sebamed Baby Wash 400ml", price: "₹580", mrp: "₹650", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07225/sebamed-baby-wash-400ml-1-1669650627.jpg" },
  { id: 19, name: "Mee Mee Powder Puff with Box", price: "₹135", mrp: "₹150", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07211/mee-mee-powder-puff-with-box-1-1669650577.jpg" },
  { id: 20, name: "Johnson's Baby Oil 500ml", price: "₹375", mrp: "₹420", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07205/johnsons-baby-oil-500ml-1-1669650576.jpg" },
  { id: 21, name: "Pampers Newborn Diapers 72s", price: "₹899", mrp: "₹1050", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07216/pampers-newborn-diapers-72s-1-1669650583.jpg" },
  { id: 22, name: "Mother Sparsh Baby Lotion 400ml", price: "₹430", mrp: "₹480", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91275/mother-sparsh-plant-powered-baby-lotion-400ml-2-1681386365.jpg" },
  { id: 23, name: "Cetaphil Baby Shampoo 200ml", price: "₹550", mrp: "₹620", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07221/cetaphil-baby-shampoo-200ml-1-1669650628.jpg" },
  { id: 24, name: "Chicco Baby Soap 100g (Pack of 4)", price: "₹320", mrp: "₹360", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07227/chicco-baby-soap-4x100g-1-1669650629.jpg" },
  { id: 25, name: "Himalaya Baby Cream 100ml", price: "₹145", mrp: "₹165", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07223/himalaya-baby-cream-100ml-1-1669650630.jpg" },
  { id: 26, name: "Sebamed Baby Powder 200g", price: "₹450", mrp: "₹500", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07226/sebamed-baby-powder-200g-1-1669650631.jpg" },
  { id: 27, name: "Johnson's Baby No Tears Shampoo 500ml", price: "₹390", mrp: "₹450", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07204/johnsons-baby-shampoo-500ml-1-1669650632.jpg" },
  { id: 28, name: "Mee Mee Gentle Baby Wash 500ml", price: "₹310", mrp: "₹350", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07209/mee-mee-gentle-baby-wash-500ml-1-1669650633.jpg" },
  { id: 29, name: "Huggies Dry Pants XL 56s", price: "₹950", mrp: "₹1099", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07228/huggies-dry-pants-xl-56s-1-1669650634.jpg" },
  { id: 30, name: "Mother Sparsh Laundry Detergent 1L", price: "₹490", mrp: "₹550", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91280/mother-sparsh-laundry-detergent-1l-2-1681386366.jpg" },
  { id: 31, name: "Himalaya Gentle Baby Wipes 72s", price: "₹160", mrp: "₹190", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07839/himalaya-gentle-baby-wipes-72s-1-1669650635.jpg" },
  { id: 32, name: "Johnson's Baby Milk Lotion 200ml", price: "₹230", mrp: "₹260", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07206/johnsons-baby-milk-lotion-200ml-1-1669650636.jpg" },
  { id: 33, name: "Chicco Baby Toothpaste 50g", price: "₹180", mrp: "₹210", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07229/chicco-baby-toothpaste-50g-1-1669650637.jpg" },
  { id: 34, name: "Huggies Nature Care Pants L 56s", price: "₹990", mrp: "₹1150", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07230/huggies-nature-care-pants-l-56s-1-1669650638.jpg" },
  { id: 35, name: "Mother Sparsh Plant Powered Shampoo 200ml", price: "₹310", mrp: "₹350", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91285/mother-sparsh-plant-powered-baby-shampoo-200ml-2-1681386367.jpg" },
  { id: 36, name: "Sebamed Baby Cleansing Bar 150g", price: "₹290", mrp: "₹330", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07231/sebamed-baby-cleansing-bar-150g-1-1669650639.jpg" },
  { id: 37, name: "Pampers Baby Wipes 72s", price: "₹210", mrp: "₹240", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07232/pampers-baby-wipes-72s-1-1669650640.jpg" },
  { id: 38, name: "Cetaphil Baby Massage Oil 200ml", price: "₹520", mrp: "₹580", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07233/cetaphil-baby-massage-oil-200ml-1-1669650641.jpg" },
];


  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    alert(`${item.name} added to cart!`);
  };

  const handleSortChange = (value) => {
    setCurrentSort(value);
    setIsDropdownOpen(false);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (currentSort) {
      case "price-low-to-high": sorted.sort((a, b) => a.price - b.price); break;
      case "price-high-to-low": sorted.sort((a, b) => b.price - a.price); break;
      case "better-discount": sorted.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)); break;
      default: break;
    }
    return sorted;
  }, [currentSort]);

  return (
    <div className="baby-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>
        <nav className="nav-links">
          <a href="#">DOCTORS</a>
          <a href="#">HOSPITALS</a>
          <a href="#">MEDICINES</a>
          <a href="#">PROFILE</a>
        </nav>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button><i className="fas fa-magnifying-glass"></i></button>
        </div>
        <div className="cart">
          <button>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="sticky-banner-wrapper">
        <img src={offerimg} alt="Baby Care Offers" className="full-banner-image" />
      </div>

      {/* Sort Dropdown */}
      <div className="sort-dropdown-wrapper">
        <div
          className={`sort-header-dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Sort By:{" "}
          {currentSort === "relevance"
            ? "Relevance"
            : currentSort === "price-low-to-high"
            ? "Price: Low to High"
            : currentSort === "price-high-to-low"
            ? "Price: High to Low"
            : "Better Discount"}
          <i
            className={`fa-solid ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          ></i>
        </div>

        {isDropdownOpen && (
          <div className="sort-options-dropdown">
            {["relevance", "price-low-to-high", "price-high-to-low", "better-discount"].map((option) => (
              <label key={option} className="radio-option-dropdown">
                <input
                  type="radio"
                  name="sort"
                  value={option}
                  checked={currentSort === option}
                  onChange={(e) => handleSortChange(e.target.value)}
                />
                <span>
                  {option.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid (your original styling) */}
      <h1 className="baby-header-title">Baby Care Essentials ({sortedProducts.length} Items)</h1>
      <div className="baby-grid">
        {sortedProducts.map((item, index) => (
          <div key={index} className="baby-card">
            <img src={item.image} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <div className="price-section">
              <span className="current-price">₹{item.price}</span>
              <span className="mrp"><del>₹{item.mrp}</del></span>
              <span className="discount">{item.discount}</span>
            </div>
            <button className="add-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Sanjeevani</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Doctor Consultation</a></li>
              <li><a href="#">Health Programs</a></li>
              <li><a href="#">Medicines Online</a></li>
            </ul>
          </div>
          <div className="footer-section footer-brand">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BabyCare;
