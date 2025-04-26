import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("💬")} If there's anything related to tech we can discuss, then
          contact me.
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          <a
            href="https://github.com/JITESH-KUMAR05"
            target="_blank"
            rel="noreferrer"
          >
            Follow me on GitHub
          </a>
        </p>
      </div>
    </Fade>
  );
}
