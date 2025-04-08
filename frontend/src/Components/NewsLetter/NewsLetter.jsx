import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <motion.section
      className="newsletter-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="newsletter-container">
        <motion.h2
          className="newsletter-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join Our VIP List
        </motion.h2>

        <motion.p
          className="newsletter-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Subscribe to receive exclusive offers, early access to new collections, and curated content.
        </motion.p>

        <motion.form
          className="newsletter-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.input
            type="email"
            className="newsletter-input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150 }}
          />

          <motion.button
            type="submit"
            className="newsletter-button"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Subscribe
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="newsletter-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              Thank you for subscribing! Welcome to our VIP list.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="newsletter-privacy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          By subscribing, you agree to our Privacy Policy and consent to receive our newsletters.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default NewsLetter;
