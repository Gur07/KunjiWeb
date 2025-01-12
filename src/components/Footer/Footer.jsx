import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        {/* Copyright Section */}
        <p className="text-gray-500 text-sm">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
        
        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 sm:mt-0">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          {/* Twitter/X */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          {/* GitHub */}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
