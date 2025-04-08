import React from "react";
import { motion } from "framer-motion";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sophia Parker",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Fashion Enthusiast",
    text: "Timeless Curation's attention to detail and quality is exceptional. Every piece I've purchased has become a staple in my wardrobe."
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Loyal Customer",
    text: "I've been shopping here for over a year, and I'm consistently impressed by their curation. The quality is unmatched!"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Lifestyle Blogger",
    text: "As someone who values aesthetics and quality, I can't recommend Timeless Curation enough. Their products elevate everyday living."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const starVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, type: "spring", stiffness: 200 }
  })
};

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
      <motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <div style={{ textAlign: "center", marginBottom: "3rem" }}>
    <h2 className="fw-bold" style={{ fontSize: "1.5rem" }}>What Our Customers Say</h2>
    <p className="text-muted" style={{ fontSize: "0.9rem" }}>
      Read about experiences from our valued customers
    </p>
  </div>
</motion.div>


        <motion.div
          className="testimonial-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="testimonial-header">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="testimonial-img"
                />
                <div>
                  <h5>{testimonial.name}</h5>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, idx) => (
                  <motion.span
                    key={idx}
                    className="star"
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={starVariants}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
