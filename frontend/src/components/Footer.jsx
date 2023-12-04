import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
  <div className="footer-container">
    <div className="newsletter">
      <label for="newsletter-input">Newsletter</label>
      <input type="email" id="newsletter-input" placeholder="your@email.com"/>
      <button type="submit">→</button>
    </div>
    <div className="contact-info">
      <a href="tel:519-494-6645">519-494-6645</a>
      <a href="mailto:books@brownanddickson.com">books [at] brownanddickson [dot] com</a>
    </div>
    <div className="social-media">
     
      <a href="mailto:">Email</a>
      <a href="your-facebook-url">Facebook</a>
      <a href="your-instagram-url">Instagram</a>
      <a href="your-tiktok-url">TikTok</a>
      <a href="your-twitter-url">Twitter</a>
    </div>
    <div className="additional-info">
      <a href="#">Contact</a>
      <a href="#">Search</a>
      <a href="#">Terms</a>
      <a href="#">Do not sell my personal information</a>
    </div>
    <div className="currency-selector">
      <label for="currency">Currency:</label>
      <select id="currency">
        <option value="CAD">Canada (CAD $)</option>
      </select>
    </div>
  </div>
</footer>

  );
};

export default Footer;
