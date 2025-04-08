import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { backend_url } from '../App';
import { ShopContext } from '../Context/ShopContext';
import "./CSS/ShopCategory.css";
const fallbackImage = 'https://via.placeholder.com/270x270?text=No+Image';
const categories = [
  { name: "All", path: "/shop" },
  { name: "men", path: "/mens" },
  { name: "women", path: "/womens" },
  { name: "kid", path: "/kids" }
];
const ShopCategory = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useContext(ShopContext);
  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    if (props.category && props.category !== "all") {
      products = products.filter(item => props.category === item.category);
    }
    
    products = products.filter(product =>
      product.new_price >= priceRange.min && product.new_price <= priceRange.max
    );

    switch (sortBy) {
      case "Price: Low to High":
        products.sort((a, b) => a.new_price - b.new_price);
        break;
      case "Price: High to Low":
        products.sort((a, b) => b.new_price - a.new_price);
        break;
      case "Rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredProducts(products);
  }, [allProducts, props.category, selectedSizes, priceRange, sortBy]);

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("Featured");
  };
  return (
    <div className="shop-category-container">
      <div className="wrapper">
        <div className="content">
          <aside className="sidebar">
            <div className="filter-header">
              <h2 className="filter-title">Filters</h2>
              <button className="clear-filters" onClick={clearFilters}>Clear All</button>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Categories</h3>
              <div className="category-list">
              {categories.map(cat => (
  <Link
    key={cat.name}
    to={cat.path}
    className={`category-button ${
      (cat.name.toLowerCase() === props.category?.toLowerCase()) ||
      (cat.name === "All" && props.category === "all")
        ? "active"
        : ""
    }`}
  >
    {cat.name}
  </Link>
))}
              </div>
            </div>
            <div className="filter-section">
              <h3 className="filter-section-title">Price Range</h3>
              <div className="price-range">
                <input
                  type="number"
                  className="price-input"
                  value={priceRange.min}
                  onChange={e => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  min="0"
                />
                <span>to</span>
                <input
                  type="number"
                  className="price-input"
                  value={priceRange.max}
                  onChange={e => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  min={priceRange.min}
                />
              </div>
              <div className="price-slider">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.min}
                  onChange={e => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={e => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="slider"
                />
              </div>
            </div>
          </aside>
          <main className="products-section">
            <div className="products-header">
              <div>
                <h1 className="products-title">{props.category || "All Products"}</h1>
                <p className="products-count">{filteredProducts.length} products found</p>
              </div>
              <div className="sort-section">
                <span>Sort by:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((item, i) => (
                <Link to={`/product/${item.id}`} key={i} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={backend_url + item.image}
                      alt={item.name}
                      onError={(e) => {
                        if (e.target.src !== fallbackImage) {
                          e.target.src = fallbackImage;
                        }
                      }}
                      className="product-image"
                      style={{
                        transition: 'transform 0.3s ease',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
<div className="product-info p-4 bg-white rounded-b-xl shadow-sm">
  <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
    <span className="product-category capitalize">{item.category}</span>
    {item.rating && (
      <div className="product-rating flex items-center gap-1 text-yellow-500 font-medium">
        <span className="star text-sm">★</span>
        <span>{item.rating}</span>
      </div>
    )}
  </div>
  <h3 className="product-name text-base font-semibold text-gray-800 line-clamp-1">
    {item.name}
  </h3>
  <div className="product-prices flex items-center gap-2 mt-1 mb-3">
    <p className="product-price text-lg font-bold text-black">
      ${item.new_price}
    </p>
    {item.old_price && (
      <p className="product-old-price text-sm text-gray-400 line-through">
        ${item.old_price}
      </p>
    )}
  </div>
  <button
    className="add-to-cart w-full py-2 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
    onClick={() => addToCart(item)}
  >
    Add to Cart
  </button>
</div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
