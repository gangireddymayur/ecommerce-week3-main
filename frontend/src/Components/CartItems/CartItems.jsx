import React, { useContext, useState } from "react";
import { Trash2, X, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard, Loader2, Award, Shield, CheckCircle, Truck, Package, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";
import "./cart.css";

const CartItems = () => {
  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount, addToCart, decreaseCartItem } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Order placed successfully!');
      setIsCheckingOut(false);
      // Clear cart after successful checkout
      Object.keys(cartItems).forEach(id => {
        if (cartItems[id] > 0) {
          removeFromCart(id);
        }
      });
    } catch (error) {
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const clearCart = () => {
    Object.keys(cartItems).forEach(id => {
      if (cartItems[id] > 0) {
        removeFromCart(id);
      }
    });
    setDiscount(0);
    setPromoCode('');
    toast.success('Cart cleared');
  };

  const getDiscountedTotal = () => {
    const totalAmount = getTotalCartAmount();
    return totalAmount - (totalAmount * discount);
  };

  const subtotal = getTotalCartAmount();
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const renderUnifiedCheckout = () => {
    return (
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="unified-checkout-form1"
        onSubmit={handleCheckoutSubmit}
      >
        <div className="checkout-header1">
          <h2 className="checkout-main-title1">Complete Your Purchase</h2>
          <div className="checkout-steps1">
            <div className="checkout-step-indicator1 active">
              <div className="step-number1">1</div>
              <span>Information</span>
            </div>
            <div className="step-connector1"></div>
            <div className="checkout-step-indicator1 active">
              <div className="step-number1">2</div>
              <span>Payment</span>
            </div>
            <div className="step-connector1"></div>
            <div className="checkout-step-indicator1">
              <div className="step-number1">3</div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        <div className="checkout-columns1">
          <div className="checkout-column1">
            <div className="checkout-section1 premium-section1">
              <div className="section-header1">
                <CheckCircle className="section-icon1" size={20} />
                <h3 className="checkout-section-title1">Contact Information</h3>
              </div>
              <div className="checkout-form-group1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={checkoutForm.email}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
              </div>
              <div className="checkout-form-row1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={checkoutForm.firstName}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={checkoutForm.lastName}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
              </div>
            </div>
            
            <div className="checkout-section1 premium-section1">
              <div className="section-header1">
                <Package className="section-icon1" size={20} />
                <h3 className="checkout-section-title1">Shipping Address</h3>
              </div>
              <div className="checkout-form-group1">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={checkoutForm.address}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
              </div>
              <div className="checkout-form-row1">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={checkoutForm.city}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={checkoutForm.zipCode}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
              </div>
              <div className="checkout-form-group1">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={checkoutForm.country}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  required
                />
              </div>
              <div className="shipping-options1">
                <h4 className="shipping-title1">Shipping Method</h4>
                <div className="shipping-option1">
                  <input type="radio" id="standard" name="shipping" value="standard" defaultChecked />
                  <label htmlFor="standard">
                    <div className="shipping-option-details1">
                      <span className="shipping-option-name1">Standard Delivery</span>
                      <span className="shipping-option-time1">3-5 Business Days</span>
                    </div>
                    <span className="shipping-option-price1">Free</span>
                  </label>
                </div>
                <div className="shipping-option1">
                  <input type="radio" id="express" name="shipping" value="express" />
                  <label htmlFor="express">
                    <div className="shipping-option-details1">
                      <span className="shipping-option-name1">Express Delivery</span>
                      <span className="shipping-option-time1">1-2 Business Days</span>
                    </div>
                    <span className="shipping-option-price1">$15.00</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="checkout-column1">
            <div className="checkout-section1 premium-section1">
              <div className="section-header1">
                <CreditCard className="section-icon1" size={20} />
                <h3 className="checkout-section-title1">Payment Information</h3>
              </div>
              <div className="checkout-form-group1">
                <div className="card-input-wrapper1">
                  <CreditCard className="card-input-icon1" size={20} />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={checkoutForm.cardNumber}
                    onChange={handleInputChange}
                    className="checkout-input1 premium-input1"
                    maxLength="16"
                    required
                  />
                </div>
              </div>
              <div className="checkout-form-row1">
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={checkoutForm.cardExpiry}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  maxLength="5"
                  required
                />
                <input
                  type="text"
                  name="cardCvc"
                  placeholder="CVC"
                  value={checkoutForm.cardCvc}
                  onChange={handleInputChange}
                  className="checkout-input1 premium-input1"
                  maxLength="3"
                  required
                />
              </div>

              <div className="card-types1">
                <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="card-logo1" />
                <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="card-logo1" />
                <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="card-logo1" />
                <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="card-logo1" />
              </div>
              
              <div className="order-review1">
                <h4 className="order-review-title1">Order Review</h4>
                {products.map(product => {
                  if (cartItems[product.id] > 0) {
                    return (
                      <div key={product.id} className="review-item1">
                        <img src={backend_url + product.image} alt={product.name} className="review-item-image1" />
                        <div className="review-item-details1">
                          <span className="review-item-name1">{product.name}</span>
                          <span className="review-item-quantity1">Qty: {cartItems[product.id]}</span>
                        </div>
                        <span className="review-item-price1">{currency}{(product.new_price * cartItems[product.id]).toFixed(2)}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                <div className="review-totals1">
                  <div className="review-total-row1">
                    <span>Subtotal</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="review-total-row1 discount-row1">
                      <span>Discount (10%)</span>
                      <span>-{currency}{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="review-total-row1">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="review-total-row1">
                    <span>Tax (8%)</span>
                    <span>{currency}{tax.toFixed(2)}</span>
                  </div>
                  <div className="review-total-row1 grand-total1">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="checkout-actions1 premium-actions1">
              <motion.button 
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCheckingOut(false)}
                className="checkout-back-btn1 premium-back-btn1"
              >
                <ArrowLeft size={16} />
                Back to Cart
              </motion.button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 15px rgba(139, 92, 246, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="checkout-submit-btn1 premium-submit-btn1"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin1" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Complete Purchase {currency}{total.toFixed(2)}
                  </>
                )}
              </motion.button>
            </div>
            
            <div className="premium-security1">
              <div className="security-item1">
                <Shield size={18} className="security-icon1" />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="security-item1">
                <Truck size={18} className="security-icon1" />
                <span>Fast & Reliable Shipping</span>
              </div>
              <div className="security-item1">
                <Award size={18} className="security-icon1" />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </motion.form>
    );
  };

  const cartItemCount = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="container1">
      <Toaster position="top-right" 
        toastOptions={{
          style: {
            background: '#1A1F2C',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="wrapper1">
        <nav className="breadcrumb1">
          {isCheckingOut ? (
            <button 
              onClick={() => setIsCheckingOut(false)}
              className="flex1 items-center1 gap-21 hover-text-indigo-6001 transition-colors1"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </button>
          ) : (
            <a href="/" className="flex1 items-center1 gap-21 hover-text-indigo-6001 transition-colors1">
              <ArrowLeft size={16} />
              Continue Shopping
            </a>
          )}
        </nav>

        <div className="flex1 items-center1 gap-41 mb-81">
          <ShoppingBag className="w-81 h-81 text-indigo-6001" />
          <h1 className="page-title1">
            {isCheckingOut ? 'Complete Your Purchase' : `Your Luxury Cart (${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'})`}
          </h1>
        </div>

        <div className="grid-container1">
          <AnimatePresence mode="wait">
            {!isCheckingOut ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="cart-section1"
                key="cart"
              >
                <div className="cart-header1">
                  <div>Product</div>
                  <div style={{ textAlign: 'right' }}>Price</div>
                  <div style={{ textAlign: 'center' }}>Quantity</div>
                  <div style={{ textAlign: 'right' }}>Total</div>
                </div>

                <AnimatePresence>
                  {products.map(product => {
                    if (cartItems[product.id] > 0) {
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="cart-item1"
                          whileHover={{ backgroundColor: '#f9fafb' }}
                        >
                          <div className="product-info1">
                            <motion.img 
                              whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                              src={backend_url + product.image}
                              alt={product.name}
                              className="product-image1"
                            />
                            <div className="product-details1">
                              <h3>{product.name}</h3>
                              <p>Category: {product.category}</p>
                            </div>
                          </div>
                          <div className="price1">{currency}{product.new_price.toFixed(2)}</div>
                          <div className="quantity-controls1">
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => decreaseCartItem(product.id)}
                              className="quantity-btn1"
                            >
                              <Minus size={16} />
                            </motion.button>
                            <input
                              type="text"
                              value={cartItems[product.id]}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                if (newQuantity > 0) {
                                  // Update cart quantity
                                  for (let i = 0; i < newQuantity - cartItems[product.id]; i++) {
                                    addToCart(product.id);
                                  }
                                  for (let i = 0; i < cartItems[product.id] - newQuantity; i++) {
                                    decreaseCartItem(product.id);
                                  }
                                }
                              }}
                              className="quantity-input1"
                            />
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCart(product.id)}
                              className="quantity-btn1"
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                          <div className="total1">
                            <span>{currency}{(product.new_price * cartItems[product.id]).toFixed(2)}</span>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(product.id)}
                              className="delete-btn1"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </AnimatePresence>

                {cartItemCount === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="empty-cart1"
                  >
                    <ShoppingBag size={48} className="text-gray-3001" />
                    <p>Your luxury cart is empty</p>
                    <a href="/" className="continue-shopping1">Explore Our Collection</a>
                  </motion.div>
                )}

                {cartItemCount > 0 && (
                  <>
                    <div className="coupon-section1">
                      <div className="coupon-form1">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="coupon-input1"
                        />
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }}
                          onClick={handlePromoCode}
                          className="coupon-btn1"
                        >
                          Apply
                        </motion.button>
                      </div>
                      <p className="coupon-hint1">Try code: "WELCOME10" for 10% off</p>
                    </div>

                    <div className="cart-actions1">
                      <motion.button 
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearCart}
                        className="clear-cart1"
                      >
                        <X size={18} />
                        Clear Cart
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="checkout-section1 unified-checkout1"
                key="checkout"
              >
                {renderUnifiedCheckout()}
              </motion.div>
            )}
          </AnimatePresence>

          {!isCheckingOut && (
            <div className="order-summary1">
              <h2 className="summary-title1">Order Summary</h2>
              
              <div className="summary-row1">
                <span className="summary-label1">Subtotal</span>
                <span className="summary-value1">{currency}{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row1 discount-row1">
                  <span className="summary-label1">Discount (10%)</span>
                  <span className="summary-value1 text-green-6001">-{currency}{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row1">
                <span className="summary-label1">Shipping</span>
                <span className="summary-shipping1">Free</span>
              </div>
              <div className="summary-row1">
                <span className="summary-label1">Tax (8%)</span>
                <span className="summary-value1">{currency}{tax.toFixed(2)}</span>
              </div>
              <div className="summary-total1">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 15px rgba(139, 92, 246, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="checkout-btn1"
                onClick={handleCheckout}
                disabled={cartItemCount === 0}
              >
                Proceed to Checkout
              </motion.button>

              <div className="payment-methods1">
                <motion.img whileHover={{ scale: 1.1, filter: 'grayscale(0)' }} src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="payment-logo1" />
                <motion.img whileHover={{ scale: 1.1, filter: 'grayscale(0)' }} src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="payment-logo1" />
                <motion.img whileHover={{ scale: 1.1, filter: 'grayscale(0)' }} src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo1" />
                <motion.img whileHover={{ scale: 1.1, filter: 'grayscale(0)' }} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="payment-logo1" />
              </div>

              <div className="premium-security1">
                <div className="security-item1">
                  <Shield size={18} className="security-icon1" />
                  <span>Secure Payment</span>
                </div>
                <div className="security-item1">
                  <Award size={18} className="security-icon1" />
                  <span>Quality Guarantee</span>
                </div>
              </div>

              <div className="help-section1">
                <h3 className="help-title1">Need Help?</h3>
                <p className="help-text1">
                  If you have any questions about your order, please contact our dedicated customer support team:
                </p>
                <a href="mailto:support@timelesscuration.com" className="help-email1">
                  support@timelesscuration.com
                </a>
                <p className="help-phone1">+1 (555) 123-4567</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;