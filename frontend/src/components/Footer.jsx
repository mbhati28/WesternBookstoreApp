import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
     <footer>
          <div className="footer-container">
            <div className="newsletter">
              <label htmlFor="newsletter-input">Newsletter</label>
              <input type="email" id="newsletter-input" placeholder="your@email.com"/>
              <button type="submit">Subscribe</button>
            </div>
            <div className="contact-info">
              <a href="tel:519-494-6645">Call Us: 123-456-7890</a>
              <a href="mailto:mbhati28@uwo.ca">Email Us</a>
            </div>
            <div className="social-media">
              <a href="https://www.facebook.com/">Facebook</a>
              <a href="https://www.instagram.com/">Instagram</a>
              <a href="https://www.tiktok.com/">TikTok</a>
              <a href="https://twitter.com/home?lang=en">X</a>
            </div>
            <div className="additional-info">
              <a href="#">Contact Us</a>
              <a href="#">Book Search</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="currency-selector">
              <label htmlFor="currency">Currency:</label>
              <select id="currency">
                <option value="CAD">Canada (CAD $)</option>
              </select>
            </div>
          </div>
        </footer>

  );
};

export default Footer;
