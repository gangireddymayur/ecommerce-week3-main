import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import "./Footer.css";
import visa from "../Assets/Visa.png";
import mastercard from "../Assets/mastercard.png";
import paypal from "../Assets/paypal.png";
import applepay from "../Assets/applepay.png";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h2>Timeless Curation</h2>
            <p>Discover timeless elegance with our expertly curated collection of luxury essentials.</p>
            <div className="social-icons">
              <a href="https://instagram.com" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://facebook.com" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://twitter.com" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/shop/fashion">Fashion</Link></li>
              <li><Link to="/shop/beauty">Beauty</Link></li>
              <li><Link to="/shop/accessories">Accessories</Link></li>
              <li><Link to="/shop/wellness">Wellness</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@timelesscuration.com">support@timelesscuration.com</a></li>
              <li>Phone: +91 (555) 123-4567</li>
              <li>123 Heritage Street, Suite 10,<br />Banjara Hills, Hyderabad, Telangana 500034</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Timeless Curation. All rights reserved.</p>
          <div className="payment-icons">
  <img src={visa} alt="Visa" />
  <img src={mastercard} alt="Mastercard" />
  <img src={paypal} alt="PayPal" />
  <img src={applepay} alt="Apple Pay" />
</div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
