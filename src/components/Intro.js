import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <div className="intro-card fade-in">

        {/* Ludo Dice Icon */}
        <div className="web3-icon">💎</div>

        {/* Title */}
        <h1 className="intro-title">FortuneChain</h1>

        {/* Subtitle */}
        <p className="intro-subtitle">
          A secure and transparent blockchain-based lottery platform
        </p>

        {/* Buttons */}
        <div className="btn-group">
          <Link to="/manager">
            <button className="btn-primary role-btn">
              ⚙️ Admin
            </button>
          </Link>

          <Link to="/players">
            <button className="btn-danger role-btn">
              🎟️ Buy Ticket
            </button>
          </Link>
        </div>

        {/* Wallet note */}
        <p className="wallet-note">
          Powered by Ethereum Smart Contracts
        </p>

      </div>
    </div>
  );
};

export default Intro;
