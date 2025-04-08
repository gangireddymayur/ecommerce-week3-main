import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { backend_url } from '../../App';
import { ShopContext } from '../../Context/ShopContext'; // Import context
import './NewCollections.css';

const fallbackImage = 'https://via.placeholder.com/270x270?text=No+Image';

const NewCollections = ({ data }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addToCart } = useContext(ShopContext); // Get addToCart from context

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id); // Use context function
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="new-collections">
      <h1>Trending Products</h1>
      <p style={{ marginTop: "-10px", color: "#555" }}>Our bestsellers loved by customers</p>
      <hr />
      <div className="collections">
        {data.map(product => (
          <div
            className="collection-card"
            key={product.id}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link to={`/product/${product.id}`} className="card-link">
              <div className="card-img-container">
                <img
                  src={backend_url + product.image}
                  alt={product.name}
                  onError={(e) => {
                    if (e.target.src !== fallbackImage) {
                      e.target.src = fallbackImage;
                    }
                  }}
                  style={{
                    transform: hoveredProduct === product.id ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.3s ease",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div className="card-info">
                <div className="card-tags">
                  <span className="category">{product.category}</span>
                  <span className="rating">
                    <Star size={14} fill="gold" stroke="gold" /> {product.rating}
                  </span>
                </div>
                <h3>{product.name}</h3>
                <p className="price">${parseFloat(product.new_price).toFixed(2)}</p>
                <button onClick={(e) => handleAddToCart(e, product)}>
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/shop">
        <button className="view-all">View All Products</button>
      </Link>
    </div>
  );
};

export default NewCollections;
