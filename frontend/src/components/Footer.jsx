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
              <a href="tel:519-494-6645">Call Us: 519-494-6645</a>
              <a href="mailto:books@brownanddickson.com">Email Us</a>
            </div>
            <div className="social-media">
              <a href="your-facebook-url">Facebook</a>
              <a href="your-instagram-url">Instagram</a>
              <a href="your-tiktok-url">TikTok</a>
              <a href="your-twitter-url">Twitter</a>
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
                {/* More currency options can be added here */}
              </select>
            </div>
          </div>
        </footer>

  );
};

export default Footer;
