import React, { useEffect, useState } from "react";
import "./Players.css";

const Players = ({ state, address }) => {
  const [account, setAccount] = useState("Not connected");
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const { web3 } = state;

      if (!web3) return;

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      if (web3.givenProvider) {
        web3.givenProvider.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
      }
    };

    loadAccount();
  }, [state]);

  useEffect(() => {
    const loadPlayers = async () => {
      const { contract } = state;

      if (!contract) return;

      const players = await contract.methods.allPlayers().call();
      setRegisteredPlayers(players);
    };

    loadPlayers();
  }, [state]);

  const buyTicket = async () => {
    const { web3, contract } = state;

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: address,
        value: web3.utils.toWei("1", "ether"),
      });

      alert("🎉 Ticket purchased successfully!");

      const players = await contract.methods.allPlayers().call();
      setRegisteredPlayers(players);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div className="players-wrapper">
      <div className="players-card">
        <h2 className="players-title">Player Dashboard</h2>

        <div className="players-box">
          <div className="players-label">Connected Account</div>
          <div className="players-value">{account}</div>
        </div>

        <div className="players-box">
          <div className="players-label">Lottery Contract Address</div>
          <div className="players-value">{address}</div>
        </div>

        <div className="players-box">
          <button
            className="manager-btn"
            onClick={buyTicket}
          >
            Buy Ticket (1 ETH)
          </button>
        </div>

        <div className="players-box">
          <div className="players-label">Registered Players</div>

          <div className="players-list">
            {registeredPlayers.length > 0 ? (
              registeredPlayers.map((player) => (
                <p key={player}>{player}</p>
              ))
            ) : (
              <p>No players registered yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;