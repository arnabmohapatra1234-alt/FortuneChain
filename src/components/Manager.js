import React, { useState, useEffect } from "react";
import "./Manager.css";

const Manager = ({ state }) => {
  const [account, setAccount] = useState("");
  const [cbalance, setCbalance] = useState("—");
  const [lwinner, setLwinner] = useState("No winner yet");

  useEffect(() => {
    const loadAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      web3.givenProvider.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    };

    state.web3 && loadAccount();
  }, [state]);

  const contractBalance = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });

      setCbalance(balance + " ETH");
    } catch {
      setCbalance("Only manager can view balance");
    }
  };

  const pickWinner = async () => {
    const { contract } = state;
    try {
      await contract.methods.pickWinner().send({ from: account });
      const winnerAddress = await contract.methods.winner().call();
      setLwinner(winnerAddress);
    } catch (e) {
      if (e.message.includes("You are not the manager")) {
        setLwinner("You are not the manager");
      } else if (e.message.includes("Players are less than 3")) {
        setLwinner("At least 3 players required");
      } else {
        setLwinner("Transaction failed");
      }
    }
  };

  return (
    <div className="manager-wrapper">
      <div className="manager-card">
        <h2 className="manager-title">Manager Dashboard</h2>

        <div className="info-box">
          <div className="label">Connected Account</div>
          <div className="value">{account}</div>
        </div>

        <div className="info-box">
          <div className="label">Winner</div>
          <div className="value">{lwinner}</div>
          <button className="manager-btn danger" onClick={pickWinner}>
            Pick Winner
          </button>
        </div>

        <div className="info-box">
          <div className="label">Contract Balance</div>
          <div className="value">{cbalance}</div>
          <button className="manager-btn" onClick={contractBalance}>
            Get Balance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manager;
