import React, {useContext} from "react";
import "./Footer.scss";
import {motion} from "framer-motion";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="footer-div"
    >
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("🤖")} Let's connect and explore the fascinating world of AI/ML together!
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Built with {emoji("❤️")} using React • Designed & Developed by Jitesh Kumar
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          <a
            href="https://github.com/JITESH-KUMAR05"
            target="_blank"
            rel="noreferrer"
          >
            View Source Code on GitHub
          </a>
        </p>
      </motion.div>
  );
}
