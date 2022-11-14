import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-basic">
      <div className="social">
        <a
          href="https://twitter.com/YATRIdesign"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://www.instagram.com/yatrimotorcycles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/YATRImotorcycles"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCobm2KxuXOFnM-fGLgSDn5A"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="home">Home</a>
        </li>
        <li className="list-inline-item">
          <a href="../about">About</a>
        </li>
        <li className="list-inline-item">
          <a href="../legal">Legal</a>
        </li>
        {/* <li className="list-inline-item">
          <a href="../faqs">FAQs</a>
        </li> */}
      </ul>
      <p className="copyright pr-2">Yatri Design Studios © 2022</p>
    </footer>
  );
};

export default Footer;
